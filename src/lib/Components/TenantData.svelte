<script lang="ts">
	import type { Writable } from 'svelte/store';

	export let tenantData: Writable<TenantData>;
</script>

<div class="p-2 card variant-soft-surface min-w-[150px]">
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
	<div class="flex flex-col justify-between">
		<p class="text-sm pb-2">Enabled Features:</p>
		{#each $tenantData.feature as feature}
			<p class="text-xs">{feature}</p>
		{/each}
	</div>
</div>
