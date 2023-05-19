<script lang="ts">
	import { matchSorter } from 'match-sorter';
	import SvelteSpotlight from 'svelte-spotlight/SvelteSpotlight.svelte';
	import algoliasearch, { type SearchClient } from 'algoliasearch';
	import type { Hit, IndexHit } from '$lib/utilities';
	import { onMount } from 'svelte';
	import Item from './Item.svelte';

	let isOpen: boolean = false;

	let results: any = [];
	let query: string = '';
	let indices = ['prod_DEVELOPER_SAILPOINT_COM', 'discourse-posts'];

	let preSelectedResult: Hit | undefined = undefined;
	let selectedResult: Hit | undefined = undefined;
	let client: SearchClient;

	async function search(query: string) {
		if (client) {
			client.search<IndexHit>(indices.map((indexName) => ({ indexName, query }))).then((data) => {
				// @ts-ignore
				results = [];
				for (const result of data.results) {
					results = [
						...results,
						...result.hits.map((entry) => {
							if (entry.hierarchy) {
								return {
									objectID: entry.objectID,
									group: entry.hierarchy.lvl0,
									section: entry.hierarchy.lvl1,
									title: entry.hierarchy.lvl2,
									tags: entry.tags,
									href: entry.url,
									category: 'Docs'
								};
							} else if (entry.topic) {
								return {
									objectID: entry.objectID,
									group: 'Forum',
									section: entry.category.name,
									title: entry.topic.title,
									tags: entry.topic.tags,
									href: entry.topic.url,
									category: 'Forum'
								};
							}
						})
					];
				}
			});
		}
	}

	$: search(query);

	onMount(() => (client = algoliasearch('TB01H1DFAM', '726952a7a9389c484b6c96808a3e0010')));
</script>

<div>
	<button class="btn btn-sm variant-filled-surface" on:click={() => (isOpen = !isOpen)}>
		Search
	</button>

	<SvelteSpotlight
		{results}
		bind:isOpen
		bind:preSelectedResult
		bind:selectedResult
		bind:query
		modalClass="w-[700px] max-h-[600px] overflow-hidden card !top-6"
		headerClass="p-4 justify-center items-center"
		inputClass="input bg-transparent"
		resultIdKey="objectID"
		resultsClass="py-2 px-2 overflow-y-scroll max-h-[400px]"
		contentClass="max-h-[400px]"
	>
		<Item slot="result" let:result let:selected {selected} {result} />
		<div slot="footer" class="flex flex-row justify-center gap-8 py-4">
			<p class="text-tertiary-500">Official Documentation</p>
			<p class="text-success-500">Forums</p>
		</div>
		<div slot="noResults" class="px-10 py-3 text-slate-500 text-sm">No results...</div>
	</SvelteSpotlight>
</div>
