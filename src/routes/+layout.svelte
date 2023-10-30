<script lang="ts">
	// The ordering of these imports is critical to your app working properly
	import '$lib/theme-sailpoint.css';

	// Most of your app wide CSS should be put in this file
	import '../app.postcss';

	import { page } from '$app/stores';
	import { checkSession } from '$lib/authentication';
	import { idnSession } from '$lib/settings';
	import { arrow, autoUpdate, computePosition, flip, offset, shift } from '@floating-ui/dom';
	import {
		AppBar,
		AppShell,
		TabAnchor,
		TabGroup,
		storeHighlightJs,
		storePopup
	} from '@skeletonlabs/skeleton';
	import dayjs from 'dayjs';
	import hljs from 'highlight.js';
	import 'highlight.js/styles/github-dark.css';
	import { onMount } from 'svelte';
	import SpotlightSearch from '$lib/Components/Spotlight/SpotlightSearch.svelte';

	storePopup.set({ computePosition, autoUpdate, offset, shift, flip, arrow });
	storeHighlightJs.set(hljs);

	onMount(async () => checkSession());

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
		<AppBar padding="">
			<TabGroup
				justify="justify-center"
				active="variant-filled-primary"
				hover="hover:variant-soft-primary"
				flex=""
				rounded=""
				border=""
				class="bg-surface-100-800-token w-full"
				slot="lead"
			>
				<TabAnchor href="/" selected={$page.url.pathname === '/'}>Dashboard</TabAnchor>
				<TabAnchor href="/api-client" selected={$page.url.pathname === '/api-client'}>
					API Client
				</TabAnchor>

				<TabAnchor href="/session" selected={$page.url.pathname === '/session'}>Session</TabAnchor>
			</TabGroup>

			<svelte:fragment slot="trail">
				<div class="flex flex-row gap-1 pr-4">
					<div class="flex flex-row justify-center">
						<SpotlightSearch />
					</div>
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
									<span class="text-red-500">False</span>
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
				</div>
			</svelte:fragment>
		</AppBar>
	</svelte:fragment>

	<!-- Router Slot -->
	<slot />
	<!-- ---- / ---- -->
</AppShell>
