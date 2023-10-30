import type { PageLoad } from './$types';

export const load = (async ({ fetch }) => {
	const V3Spec = (
		await fetch(
			`https://raw.githubusercontent.com/sailpoint-oss/api-specs/main/dereferenced/deref-sailpoint-api.v3.json`
		)
	).json();
	const BetaSpec = (
		await fetch(
			`https://raw.githubusercontent.com/sailpoint-oss/api-specs/main/dereferenced/deref-sailpoint-api.beta.json`
		)
	).json();
	return { V3Spec, BetaSpec };
}) satisfies PageLoad;
