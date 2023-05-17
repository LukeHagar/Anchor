<script lang="ts">
	import type { Writable } from 'svelte/store';

	export let hostingData: Writable<HostingData>;
</script>

<div class="p-2 card variant-soft-surface min-w-[150px]">
	<p class="underline text-center pb-2">Hosting Data</p>
	<div class="flex flex-row justify-between">
		<p class="text-sm">Org:</p>
		<p class="text-sm">{$hostingData.org}</p>
	</div>
	<div class="flex flex-row justify-between">
		<p class="text-sm">Pod:</p>
		<p class="text-sm">{$hostingData.pod}</p>
	</div>
	<div class="flex flex-row justify-between">
		<p class="text-sm">Layer:</p>
		<p class="text-sm">{$hostingData.layer}</p>
	</div>
	<div class="flex flex-row justify-between">
		<p class="text-sm">Region:</p>
		<p class="text-sm">{$hostingData.region}</p>
	</div>
</div>
