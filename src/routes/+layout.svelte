<script lang="ts">
	// The ordering of these imports is critical to your app working properly
	import '$lib/theme-sailpoint.css';
	// If you have source.organizeImports set to true in VSCode, then it will auto change this ordering
	import '@skeletonlabs/skeleton/styles/skeleton.css';
	// Most of your app wide CSS should be put in this file
	import '../app.postcss';

	import { AppBar, AppShell, storeHighlightJs } from '@skeletonlabs/skeleton';

	import { checkAuth } from '$lib/authentication';
	import { idnSession } from '$lib/settings';
	import dayjs from 'dayjs';
	import hljs from 'highlight.js';
	import 'highlight.js/styles/github-dark.css';
	import { onMount } from 'svelte';

	storeHighlightJs.set(hljs);

	onMount(async () => checkAuth());

	let now = dayjs();
	let minutesUntil = dayjs($idnSession?.expiration).diff(now, 'minutes');
	let secondsUntil = dayjs($idnSession?.expiration).diff(now, 'seconds') - minutesUntil * 60;

	setInterval(function () {
		now = dayjs();
		minutesUntil = dayjs($idnSession?.expiration).diff(now, 'minutes');
		secondsUntil = dayjs($idnSession?.expiration).diff(now, 'seconds') - minutesUntil * 60;
	}, 1000);
</script>

<AppShell>
	<svelte:fragment slot="header">
		<AppBar>
			<svelte:fragment slot="lead">
				<div class="flex flex-row gap-4">
					<a class="btn btn-sm variant-filled" href="/">Tenant</a>
					<a class="btn btn-sm variant-filled" href="/session">Session</a>
				</div>
			</svelte:fragment>
			<svelte:fragment slot="trail">
				<div class="p-1 top-0 right-0 flex flex-row gap-2">
					{#if minutesUntil < 0 || secondsUntil < 0}
						<p class="text-xs text-white my-auto">
							Strong Auth: <span class="text-red-500">Expired</span>
						</p>
						<p class="text-xs text-white my-auto">
							Session Timer: <span class="text-red-500">Expired</span>
						</p>
					{:else}
						<p class="text-xs text-white my-auto">
							Strong Auth: {#if $idnSession.strongAuth === true}
								<span class="text-green-500">True</span>
							{:else}
								<span class="text-red-500">True</span>
							{/if}
						</p>
						<p class="text-xs text-white my-auto">
							Session Timer: {minutesUntil}:{#if secondsUntil < 10}
								{`0${secondsUntil}`}
							{:else}
								{secondsUntil}
							{/if}
						</p>
					{/if}
				</div>
			</svelte:fragment>
		</AppBar>
	</svelte:fragment>

	<!-- Router Slot -->
	<slot />
	<!-- ---- / ---- -->
</AppShell>
