<script lang="ts">
	import type { Writable } from 'svelte/store';

	export let tenantData: Writable<TenantData>;
</script>

<h1 class="text-center pb-2">Tenant Features</h1>
<div class="flex flex-col justify-between">
	{#each $tenantData.feature as feature}
		<p class="text-xs">{feature}</p>
	{/each}
</div>
