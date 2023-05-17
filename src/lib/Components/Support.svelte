<script lang="ts">
	import { labelSort } from '$lib/utilities';

	const links: { label: string; href: string }[] = [
		{
			label: '🎫 Submit a ticket',
			href: 'https://support.sailpoint.com/csm?id=sc_cat_item&sys_id=a78364e81bec151050bcc8866e4bcb5c&referrer=popular_items'
		},
		{
			label: '🔭 Scope of SaaS Support',
			href: 'https://community.sailpoint.com/t5/IdentityNow-Wiki/What-is-supported-by-SaaS-Support/ta-p/198779'
		},
		{ label: '🔖 Support Knowledge Base', href: 'https://support.sailpoint.com/' }
	];
</script>

<div class="p-2 card variant-soft-surface">
	<h1 class="text-center pb-2">Support</h1>
	<div class="flex flex-col gap-2">
		{#each links as link}
			<a class="btn btn-sm variant-filled" target="_blank" rel="noreferrer" href={link.href}>
				{link.label}
			</a>
		{/each}
	</div>
</div>
