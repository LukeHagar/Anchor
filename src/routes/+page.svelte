<script lang="ts">
	import CurrentUser from '$lib/Components/CurrentUser.svelte';
	import HostingData from '$lib/Components/HostingData.svelte';
	import Resources from '$lib/Components/Resources.svelte';
	import StatusPage from '$lib/Components/StatusPage.svelte';
	import Support from '$lib/Components/Support.svelte';
	import TenantData from '$lib/Components/TenantData.svelte';
	import TenantLinks from '$lib/Components/TenantLinks.svelte';
	import { hostingData, tenantData } from '$lib/settings';
</script>

<div class="flex flex-col gap-2 p-2 h-full">
	<div class="flex flex-row gap-2">
		<div class="flex flex-col gap-2 grow">
			<div class="p-2 card variant-soft-surface">
				<TenantData {tenantData} />
			</div>
		</div>
		<div class="flex flex-col gap-2 grow">
			<div class="p-2 card variant-soft-surface grow">
				<HostingData {hostingData} />
			</div>
			<div class="p-2 card variant-soft-surface grow">
				<CurrentUser {tenantData} />
			</div>
		</div>
		<div class="grow flex flex-col gap-2">
			<div class="p-4 card variant-soft-surface grow">
				<StatusPage />
			</div>
			<div class="p-2 card variant-soft-surface grow">
				<Support />
			</div>
		</div>
	</div>
	<div class="flex flex-row gap-2 grow">
		<div class="p-2 card variant-soft-surface grow">
			<TenantLinks />
		</div>
		<div class="p-2 card variant-soft-surface grow">
			<Resources />
		</div>
	</div>
</div>
