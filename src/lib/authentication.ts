import axios from 'axios';
import { idnSession } from './settings';
import { get } from 'svelte/store';

export async function getActiveTabURL() {
	const tabs = await chrome.tabs.query({
		active: true,
		currentWindow: true
	});

	if (tabs.length === 0) {
		console.debug('No Tabs returned, Returning');
		return null;
	}

	const activeTab = tabs[0];

	if (!activeTab || !activeTab.url) {
		console.debug('No ActiveTab, Returning');
		return null;
	}

	return new URL(activeTab.url);
}

export async function checkAuth() {
	console.debug('Getting Session - ' + new Date().toLocaleTimeString());

	let session;
	let tabUrl;

	try {
		tabUrl = await getActiveTabURL();
		if (!tabUrl) {
			throw new Error('No Active Tab');
		}
		session = await axios.get(tabUrl.origin + '/ui/session');
		console.debug('Current page is a valid IDN Tenant');
	} catch (error) {
		const tenant = get(idnSession).tenant;
		if (tenant) {
			tabUrl = new URL(tenant);
			session = await axios.get(tenant + '/ui/session');
			console.debug('Using cached session');
		} else {
			console.debug('No Session, and Current Tab is not an IDN Tenant');
			return;
		}
	}

	console.debug('Setting timeout for ' + session.data.refreshIn + ' milliseconds');
	setTimeout(() => checkAuth(), session.data.refreshIn);

	const sessionData = {
		...session.data,
		expiration: new Date(Date.now() + session.data.refreshIn)
	};

	try {
		const hostingData = await axios.get(`${session.data.baseUrl}/beta/tenant-data/hosting-data`, {
			method: 'GET',
			headers: {
				Authorization: `Bearer ${session.data.accessToken}`
			}
		});

		sessionData.tenant = tabUrl.origin;
		sessionData.org = hostingData.data.org;
		sessionData.pod = hostingData.data.pod;
		sessionData.layer = hostingData.data.layer;
		sessionData.region = hostingData.data.region;

		idnSession.set(sessionData);
	} catch (error) {
		console.error('Error fetching hosting data:', error);
	}
}
