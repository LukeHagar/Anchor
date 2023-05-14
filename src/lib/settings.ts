import { localStorageStore } from '@skeletonlabs/skeleton';
import type { Writable } from 'svelte/store';

export const idnSession: Writable<IdnSession> = localStorageStore('tenantData', {
	tenant: 'https://whatever.com'
});
