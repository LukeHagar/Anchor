<script lang="ts">
	export let result: any;
	export let selected: boolean;
</script>

<a href={result.href} target="_blank">
	<div
		class="flex flex-col p-2 card {result.category === 'Docs'
			? 'variant-ringed-tertiary'
			: 'variant-ringed-success'} {selected === true ? '!ring-4' : ''}"
	>
		<div class="flex flex-row justify-between">
			<p class="max-w-[350px] truncate">{result.title || result.section}</p>
			<p class="text-xl opacity-70">{result.group}</p>
		</div>
		<p class="text-xs">
			{#if result.tags.length > 0}
				Tags: {result.tags.join(', ')}
			{/if}
		</p>
		<p class="opacity-60 text-xs truncate">{result.href}</p>
	</div>
</a>
