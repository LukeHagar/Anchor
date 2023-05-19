<script lang="ts">
	import type { Writable } from 'svelte/store';

	export let hostingData: Writable<HostingData>;
</script>

<h1 class="text-center pb-2">Hosting Data</h1>
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
