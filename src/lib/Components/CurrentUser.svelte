<script lang="ts">
	import type { Writable } from 'svelte/store';

	export let tenantData: Writable<TenantData>;
</script>

<div class="p-2 card variant-soft-surface min-w-[150px]">
	<p class="underline text-center pb-2">Current User</p>
	<div class="flex flex-row justify-between">
		<p class="text-sm">Account:</p>
		<p class="text-sm">{$tenantData.uid}</p>
	</div>

	<div class="flex flex-col justify-between">
		<p class="text-sm pb-2">Roles:</p>
		{#each $tenantData.role as role}
			<p class="text-xs">{role}</p>
		{/each}
	</div>
</div>
