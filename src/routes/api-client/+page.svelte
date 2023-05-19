<script lang="ts">
	import { idnSession } from '$lib/settings';
	import { Tab, TabGroup } from '@skeletonlabs/skeleton';
	import { JSONEditor } from 'svelte-jsoneditor';
	import 'svelte-jsoneditor/themes/jse-theme-dark.css';

	import { paths as V2Spec } from './V2Spec.json';
	import { paths as BetaSpec } from './BetaSpec.json';
	import { paths as V3Spec } from './V3Spec.json';
	import { paths as CCSpec } from './CCSpec.json';

	import axios from 'axios';

	function mapPath(path: string[]) {
		const [name, value] = path;
		return { name, value };
	}

	async function makeAPICall() {
		const response = await axios({
			method: selectedAPIMethod,
			url: `${$idnSession.baseUrl}/${APICallPath}`,
			data: requestContent.json,
			headers: {
				authorization: `Bearer ${$idnSession.accessToken}`
			}
		}).catch((err) => {
			console.error(err);
			return err;
		});
		responseContent = { text: undefined, json: response.data };
		console.log(responseContent);
	}

	function handleKeydown(event: KeyboardEvent) {
		console.log(event);

		if (event.isTrusted === true && event.key === 'Enter') {
			makeAPICall();
		}
	}

	let APIVersions = [
		//@ts-ignore
		{ name: 'Beta', value: Object.entries(BetaSpec).map((path) => mapPath(path)) },
		//@ts-ignore
		{ name: 'V3', value: Object.entries(V3Spec).map((path) => mapPath(path)) },
		//@ts-ignore
		{ name: 'V2', value: Object.entries(V2Spec).map((path) => mapPath(path)) },
		//@ts-ignore
		{ name: 'CC', value: Object.entries(CCSpec).map((path) => mapPath(path)) },
		{
			name: 'Custom',
			value: [
				{
					name: 'Custom Path',
					value: { GET: '', POST: '', PUT: '', PATCH: '', DELETE: '', HEAD: '' }
				}
			]
		}
	];

	let requestContent = {
		text: undefined, // can be used to pass a stringified JSON document instead
		json: ''
	};

	let responseContent = {
		text: undefined, // can be used to pass a stringified JSON document instead
		json: ''
	};

	let tabSet: number = 1;

	let selectedAPIVersion = APIVersions[0];
	let selectedPath = selectedAPIVersion.value[0];

	let APICallPath: string = `${selectedAPIVersion.name.toLowerCase()}${selectedPath.name}`;

	let selectedAPIMethod = 'GET';
</script>

<div class="p-2 flex flex-col gap-4 overflow-hidden overflow-y-auto">
	<div class="flex flex-row">
		<select
			placeholder="Select an API Version"
			class="max-w-fit !rounded-r-none px-4 py-2 select"
			bind:value={selectedAPIVersion}
			on:change={() => {
				selectedPath = selectedAPIVersion.value[0];
				if (['Beta', 'V3', 'V2'].includes(selectedAPIVersion.name)) {
					APICallPath = `${selectedAPIVersion.name.toLowerCase()}${selectedPath.name}`;
				} else if (['CC'].includes(selectedAPIVersion.name)) {
					APICallPath = `${selectedPath.name}`;
				} else {
					APICallPath = '';
				}
			}}
		>
			{#each APIVersions as APIVersion}
				<option selected={selectedAPIVersion === APIVersion} value={APIVersion}>
					{APIVersion.name}
				</option>
			{/each}
		</select>
		<select
			placeholder="Choose the API Endpoint"
			class="!rounded-l-none px-4 select"
			bind:value={selectedPath}
			on:change={() => {
				if (['Beta', 'V3', 'V2'].includes(selectedAPIVersion.name)) {
					APICallPath = `${selectedAPIVersion.name.toLowerCase()}${selectedPath.name}`;
				} else if (['CC'].includes(selectedAPIVersion.name)) {
					APICallPath = `${selectedPath.name}`;
				} else {
					APICallPath = '';
				}
			}}
		>
			{#each selectedAPIVersion.value as path}
				<option selected={path === selectedPath} value={path}>{path.name}</option>
			{/each}
		</select>
	</div>
	<div class="flex flex-row">
		<select class="select rounded-r-none w-fit">
			{#each Object.entries(selectedPath.value) as [method, content]}
				<option>{method.toUpperCase()}</option>
			{/each}
		</select>
		<input
			type="text"
			class="w-full !rounded-l-none rounded-r-none px-4 py-2 input"
			bind:value={APICallPath}
		/>
		<button on:click={makeAPICall} class="btn variant-filled-surface rounded-l-none rounded-r-lg">
			Call
		</button>
	</div>

	<TabGroup justify="justify-center">
		<Tab bind:group={tabSet} name="tab1" value={0}>Request</Tab>
		<Tab bind:group={tabSet} name="tab2" value={1}>Response</Tab>
	</TabGroup>

	{#if tabSet === 0}
		<div class="jse-theme-dark">
			<JSONEditor bind:content={requestContent} />
		</div>
	{:else if tabSet === 1}
		<div class="jse-theme-dark">
			<JSONEditor bind:content={responseContent} />
		</div>
	{/if}
</div>
