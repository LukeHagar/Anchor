import {
	hostingData,
	idnSession,
	noHostingData,
	noSession,
	noTenantData,
	tenantData
} from './settings';
import { get } from 'svelte/store';

// Gets currently active tab from Chrome via Extension API
export async function getActiveTabURL() {
	const tabs = await chrome.tabs.query({
		active: true,
		currentWindow: true
	});

	if (tabs.length < 1) {
		throw new Error('No tabs returned');
	}

	const activeTab = tabs[0];

	if (!activeTab || !activeTab.url) {
		throw new Error('No active tab');
	}

	return new URL(activeTab.url);
}

// retrieve the hosting data for the tenant from the API
export async function getHostingData(session: IdnSession) {
	console.debug('Retrieving Hosting Data');
	const resp = await fetch(`${session.baseUrl}/beta/tenant-data/hosting-data`, {
		method: 'GET',
		headers: {
			Authorization: `Bearer ${session.accessToken}`
		}
	});

	if (resp.status === 401) return noHostingData;

	const hostingData = (await resp.json()) satisfies HostingData;
	console.debug(hostingData);

	return hostingData;
}

// retrieve the tenant data for the tenant from the API
export async function getTenantData(session: IdnSession) {
	console.debug('Retrieving Tenant Data');
	const resp = await fetch(`${session.baseUrl}/cc/api/user/get`, {
		method: 'GET',
		headers: {
			Authorization: `Bearer ${session.accessToken}`
		}
	});

	if (resp.status === 401) return noTenantData;

	const tenantData = (await resp.json()) satisfies TenantData;
	console.debug(tenantData);

	return tenantData;
}

// Check for a current session
export async function checkSession() {
	console.debug('Checking Session - ' + new Date().toLocaleTimeString());

	let session;

	if (window.chrome && chrome.runtime && chrome.runtime.id) {
		let tabUrl;

		try {
			tabUrl = await getActiveTabURL();
			session = await (await fetch(tabUrl.origin + '/ui/session')).json();
			console.debug('Current page is a valid IDN Tenant');
		} catch (error) {
			const tenant = get(idnSession).tenant;
			if (tenant) {
				const sessionResp = await fetch(tenant + '/ui/session').catch((err: Error) =>
					console.debug(err)
				);
				if (!sessionResp) return;
				session = await sessionResp.json().catch((err: Error) => console.debug(err));
				console.debug('Using cached session');
			} else {
				console.debug('No Session, and Current Tab is not an IDN Tenant');
				session = noSession;
			}
		}
		console.debug('Checking Session again in ' + session.refreshIn + ' milliseconds');
		setTimeout(() => checkSession(), session.refreshIn);
	} else {
		console.debug('Using Dev Session');
		const tenant = import.meta.env.VITE_TENANT;

		const accessTokenResp = await fetch(
			`https://${tenant}.api.identitynow.com/oauth/token?grant_type=client_credentials&client_id=${
				import.meta.env.VITE_CLIENT_ID
			}&client_secret=${import.meta.env.VITE_CLIENT_SECRET}`,
			{ method: 'POST' }
		);

		const accessTokenData = await accessTokenResp.json();
		console.debug(accessTokenData);

		session = {
			authType: 'OAuth2.0',
			baseUrl: `https://${tenant}.api.identitynow.com`,
			logoutUrl: `https://${tenant}.identitynow.com/logout`,
			accessToken: accessTokenData.access_token,
			refreshIn: accessTokenData.expires_in,
			pollUrl: `https://${tenant}.identitynow.com/ui/session`,
			strongAuth: accessTokenData.strong_auth,
			strongAuthUrl: `https://${tenant}.identitynow.com/api/user/strongAuthn`,
			csrfToken: ''
		};
		console.debug('Checking Session again in ' + session.refreshIn + ' milliseconds');
		setTimeout(() => checkSession(), session.refreshIn);
	}

	console.debug('Session Data');
	console.debug(session);

	hostingData.set(await getHostingData(session));
	tenantData.set(await getTenantData(session));
	idnSession.set({
		...session,
		expiration: new Date(Date.now() + session.refreshIn),
		tenant: new URL(session.pollUrl).origin
	});
}
