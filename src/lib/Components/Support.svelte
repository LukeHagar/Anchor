<script lang="ts">
	const supportLinks: { label: string; href: string }[] = [
		{
			label: '🎫 Submit a ticket',
			href: 'https://support.sailpoint.com/csm?id=sc_cat_item&sys_id=a78364e81bec151050bcc8866e4bcb5c&referrer=popular_items'
		},
		{
			label: '🔭  Scope of SaaS Support',
			href: 'https://community.sailpoint.com/t5/IdentityNow-Wiki/What-is-supported-by-SaaS-Support/ta-p/198779'
		},
		{ label: '🔖  Support Knowledge Base', href: 'https://support.sailpoint.com/' }
	];
</script>

<h1 class="text-center">Support</h1>
<ul class="flex flex-col">
	{#each supportLinks as link}
		<li class="flex flex-row gap-1 hover:underline hover:text-tertiary-600">
			<a target="_blank" rel="noreferrer" href={link.href}>
				{link.label}
			</a>
		</li>
	{/each}
</ul>
