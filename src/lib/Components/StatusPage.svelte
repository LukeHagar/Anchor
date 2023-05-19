<script lang="ts">
	import { onDestroy, onMount } from 'svelte';

	let summaryResp: Promise<any>;

	const getStatus = async () => {
		console.debug('Getting Status Summary');
		summaryResp = (await fetch('https://status.sailpoint.com/api/v2/summary.json')).json();
		console.debug(await summaryResp);
	};

	let interval: any;

	onMount(async () => {
		getStatus();
		interval = setInterval(() => getStatus(), 30000);
	});

	onDestroy(() => clearInterval(interval));
</script>

<h1 class="text-center">Status Page</h1>

{#await summaryResp}
	<div class="flex flex-row gap-2 justify-center">
		<div class="placeholder-circle w-16" />
		<p>Checking</p>
	</div>
{:then summary}
	<div class="flex flex-row align-center gap-2 justify-center">
		{#if summary?.status?.indicator == 'none'}
			<a
				href="https://status.sailpoint.com"
				class="text-green-500 text-center hover:underline"
				rel="noreferrer"
				target="_blank"
			>
				{summary?.status?.description}
			</a>
		{:else if summary?.status?.indicator == 'minor'}
			<a
				href="https://status.sailpoint.com"
				class="text-yellow-500 text-center hover:underline"
				rel="noreferrer"
				target="_blank"
			>
				{summary?.status?.description}
			</a>
		{:else if summary?.status?.indicator == 'major'}
			<a
				href="https://status.sailpoint.com"
				class="text-red-500 text-center hover:underline"
				rel="noreferrer"
				target="_blank"
			>
				{summary?.status?.description}
			</a>
		{/if}
	</div>
{/await}
