<script lang="ts">
	import {
		InstantSearch,
		SearchBox,
		Hits,
		Pagination,
		HitsPerPage
	} from 'svelte-algolia-instantsearch';
	import algoliasearch from 'algoliasearch/lite';
	import { RadioGroup, RadioItem, popup, type PopupSettings } from '@skeletonlabs/skeleton';
	import SearchIcon from './searchIcon.svelte';

	const searchClient = algoliasearch('TB01H1DFAM', '726952a7a9389c484b6c96808a3e0010');

	// Available Indexes
	// prod_DEVELOPER_SAILPOINT_COM
	// discourse-posts

	let index: string = 'prod_DEVELOPER_SAILPOINT_COM';

	const popupFocusBlur: PopupSettings = {
		event: 'focus-click',
		target: 'popupFocusBlur',
		placement: 'bottom',
		closeQuery: ''
	};
</script>

<div class="px-2 py-4">
	{#key index}
		<InstantSearch indexName={index} {searchClient}>
			<div class="flex flex-col gap-1 h-full">
				<div class="flex flex-row">
					<div use:popup={popupFocusBlur} class="grow relative">
						<SearchIcon />
						<SearchBox
							placeholder="Search the {index === 'prod_DEVELOPER_SAILPOINT_COM' ? 'Docs' : 'Forum'}"
							classes={{
								input: 'input rounded-r-none pl-12',
								form: '',
								resetIcon: 'white',
								submit: 'hidden',
								reset: 'hidden',
								root: 'grow w-full'
							}}
						/>
					</div>
					<select bind:value={index} class="rounded-l-none rounded-full select w-fit">
						<option value="prod_DEVELOPER_SAILPOINT_COM">Docs</option>
						<option value="discourse-posts">Forum</option>
					</select>
				</div>

				<div class="card max-w-[785px] p-2" data-popup="popupFocusBlur">
					<div class="flex overflow-y-scroll overflow-hidden max-h-[300px] grow">
						<Hits let:hit classes={{ root: 'grow' }}>
							{#if hit.hierarchy}
								<a href={hit.url}>
									<div
										class="flex flex-col card variant-soft-surface overflow-hidden p-2 w-[765px]"
									>
										<div class="flex flex-row justify-start gap-2">
											<p class="truncate">
												{hit.hierarchy.lvl1} - {hit.hierarchy.lvl2}
											</p>
										</div>

										<p class="text-xs opacity-70">Tags: {hit.tags.join(', ')}</p>
										<!-- <p class="text-xs text-primary-300 opacity-70">{hit.url_without_anchor}</p> -->
									</div>
								</a>
							{:else}
								<a href={hit.topic.url}>
									<div class="flex flex-col card variant-soft-surface p-2 max-w-[765px] w-[765px]">
										<div class="flex flex-row justify-between">
											<div class="flex flex-col">
												<p class="truncate max-w-[650px]">
													{hit.topic.title}
												</p>
												<p class="text-xs opacity-70 pb-2">
													{hit.user.name}
												</p>
											</div>
											<p class=" top-1 right-1">{hit.topic.views} 👁️‍🗨️</p>
										</div>

										<div class="flex flex-row justify-between">
											{#if hit.topic.tags.length > 0}
												<p class="text-xs opacity-70">Tags: {hit.topic.tags.join(', ')}</p>
											{:else}
												<p class="text-xs opacity-70">No Tags</p>
											{/if}
											<!-- <p class="text-xs text-primary-300 opacity-70 truncate max-w-[550px]">
												{hit.topic.url}
											</p> -->
										</div>
									</div>
								</a>
							{/if}
						</Hits>
					</div>
					<div class="flex flex-row justify-center grow">
						<div class="flex flex-col justify-center grow">
							<Pagination classes={{ list: 'flex flex-row justify-center gap-2 text-xl' }} />
						</div>
					</div>
				</div>
			</div>
		</InstantSearch>
	{/key}
</div>
