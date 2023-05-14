// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
// and what to do when importing types
declare namespace App {
	// interface Locals {}
	// interface PageData {}
	// interface Error {}
	// interface Platform {}
}

declare type IdnSession = {
	tenant?: string;
	authType?: string;
	baseUrl?: string;
	logoutUrl?: string;
	accessToken?: string;
	refreshIn?: number | string;
	pollUrl?: string;
	strongAuth?: boolean | string;
	strongAuthUrl?: string;
	csrfToken?: string;
	expiration?: date;
	org?: string;
	region?: string;
	pod?: string;
	layer?: string;
};
