<script lang="ts">
	import CurrentUser from '$lib/Components/CurrentUser.svelte';
	import HostingData from '$lib/Components/HostingData.svelte';
	import Resources from '$lib/Components/Resources.svelte';
	import Support from '$lib/Components/Support.svelte';
	import StatusPage from '$lib/Components/StatusPage.svelte';
	import TenantData from '$lib/Components/TenantData.svelte';
	import TenantLinks from '$lib/Components/TenantLinks.svelte';
	import { idnSession, hostingData, tenantData } from '$lib/settings';
	import Search from '$lib/Components/Search.svelte';
</script>

<div class="flex flex-col h-full">
	<Search />
	<div class="flex flex-row h-full gap-4 p-2 grow">
		<div class=" flex flex-col gap-4 grow">
			<TenantData {tenantData} />
		</div>

		<div class=" flex flex-col gap-4 grow">
			<CurrentUser {tenantData} />
			<HostingData {hostingData} />
		</div>
		<div class=" flex flex-col gap-4 grow">
			<StatusPage />
			<Support />
		</div>
	</div>
</div>
