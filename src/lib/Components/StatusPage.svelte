<script lang="ts">
	import { onMount } from 'svelte';

	let resp: Promise<Status>;

	const getStatus = async () => {
		console.debug('Getting Status Page Details');
		resp = await (await fetch('https://status.sailpoint.com/api/v2/status.json')).json();
		console.debug(resp);
	};

	onMount(async () => {
		getStatus();
		setInterval(() => getStatus(), 10000);
	});
</script>

<div class="p-2 card variant-soft-surface min-w-[183.53px]">
	<h1 class="text-center pb-2">Status Page</h1>
	<div class="flex flex-row gap-2 justify-center">
		{#await resp}
			<div class="placeholder-circle w-16" />
			<p>Checking</p>
		{:then status}
			{#if status?.status?.description == 'All Systems Operational'}
				<p class="text-green-500 text-center">All Systems Operational</p>
			{:else}
				<div>
					<p class="text-red-500 text-center">Ongoing Issues</p>
					<a href="https://status.sailpoint.com" rel="noreferrer" target="_blank">
						Click for details
					</a>
				</div>
			{/if}
		{/await}
	</div>
</div>
