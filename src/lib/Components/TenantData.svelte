<script lang="ts">
	import type { Writable } from 'svelte/store';

	export let tenantData: Writable<TenantData>;
</script>

<h1 class="text-center pb-2">Tenant Data</h1>
<div class="flex flex-row flex-wrap justify-between">
	<p class="text-sm">Name:</p>
	<p class="text-sm px-1">{$tenantData.org.name}</p>
</div>
<div class="flex flex-row justify-between">
	<p class="text-sm">Tenant:</p>
	<p class="text-sm">{$tenantData.org.scriptName}</p>
</div>
<div class="flex flex-row justify-between">
	<p class="text-sm">Tenant Type:</p>
	<p class="text-sm">{$tenantData.org.orgType}</p>
</div>
