<script lang="ts">
	import { idnSession } from '$lib/settings';
	const tenantLinks: { label: string; slug: string }[] = [
		{ label: '🔑 Grant Tenant Access', slug: '/ui/a/admin/global/grant-tenant-access' },
		{
			label: '🏠 Dashboard',
			slug: '/ui/admin#admin:dashboard:overview'
		},
		{ label: '🙂 Identity Profiles', slug: '/ui/admin#admin:identities:profiles' },
		{ label: '📋 Identity List', slug: '/ui/a/admin/identities/all-identities' },
		{ label: '🎭 Access Profiles', slug: '/ui/a/admin/access/access-profiles/landing' },
		{ label: '📦 Roles', slug: '/ui/a/admin/access/roles/landing-page' },
		{ label: '🔗  Sources', slug: '/ui/a/admin/connections/sources-list/configured-sources' },
		{
			label: '💻 Virtual Appliances',
			slug: '/ui/a/admin/connections/virtual-appliances/clusters-list'
		}
	];
</script>

<h1 class="text-center">Tenant Links</h1>
<ul class="flex flex-col">
	{#each tenantLinks as link}
		<li class="listbox-item">
			<a
				class="hover:underline text-center hover:text-tertiary-600"
				target="_blank"
				rel="noreferrer"
				href={$idnSession.tenant || 'https://placeholder.com' + link.slug}
			>
				{link.label}
			</a>
		</li>
	{/each}
</ul>
