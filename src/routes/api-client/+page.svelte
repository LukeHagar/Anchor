<script lang="ts">
	import { Tab, TabGroup } from '@skeletonlabs/skeleton';
	import { JSONEditor } from 'svelte-jsoneditor';
	import 'svelte-jsoneditor/themes/jse-theme-dark.css';

	import BetaSpec from './BetaSpec.json';
	import CustomSpec from './CustomSpec.json';
	import V3Spec from './V3Spec.json';

	let APIVersions;

	let specification = BetaSpec;
	let path = Object.entries(specification.paths)[0][0];

	let requestContent = {
		text: undefined, // can be used to pass a stringified JSON document instead
		json: {
			request: 'All your base belong to us'
		}
	};

	let responseContent = {
		text: undefined, // can be used to pass a stringified JSON document instead
		json: {
			response: 200
		}
	};

	let tabSet: number = 0;

	$: methods = Object.entries(specification.paths[path] || { get: 'content' });
</script>

<div class="p-4 flex flex-col gap-4 h-full">
	<div class="flex flex-row">
		<select bind:value={specification} class="select w-fit rounded-r-none">
			<option value={BetaSpec}>Beta API</option>
			<option value={V3Spec}>V3 API</option>
			<option value={CustomSpec}>Custom</option>
		</select>
		<select bind:value={path} class="select rounded-l-none">
			{#each Object.entries(specification.paths) as [path, methods]}
				<option value={path}>{path}</option>
			{/each}
		</select>
	</div>
	<div class="flex flex-row">
		<select class="select rounded-r-none w-fit">
			{#each methods as [method, content]}
				<option>{method.toUpperCase()}</option>
			{/each}
		</select>
		<input bind:value={path} class="input rounded-l-none rounded-r-none pl-4" />
		<button class="btn variant-filled-surface rounded-l-none rounded-r-lg">Call</button>
	</div>
	<TabGroup justify="justify-center" class="grow">
		<Tab bind:group={tabSet} name="tab1" value={0}>Request</Tab>
		<Tab bind:group={tabSet} name="tab2" value={1}>Response</Tab>
	</TabGroup>
	{#if tabSet === 0}
		<div class="jse-theme-dark h-full">
			<JSONEditor bind:content={requestContent} />
		</div>
	{:else if tabSet === 1}
		<div class="jse-theme-dark h-full">
			<JSONEditor bind:content={responseContent} />
		</div>
	{/if}
</div>
