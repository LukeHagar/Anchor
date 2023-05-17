<script lang="ts">
	import { popup, type PopupSettings } from '@skeletonlabs/skeleton';

	const links: { label: string; href: string }[] = [
		{
			label: '🖥 Developer Community',
			href: 'https://developer.sailpoint.com/discuss/'
		},
		{ label: '📎 API Documentation', href: 'https://developer.sailpoint.com/idn/api/v3' },
		{ label: '🧘‍♂️  CLI Documentation', href: 'https://developer.sailpoint.com/idn/tools/cli' },
		{
			label: '🔌 Connector Reference',
			href: 'https://community.sailpoint.com/t5/IdentityNow-Connectors/IdentityNow-Connectors/ta-p/80019'
		},
		{
			label: '🚩 Transform Guides',
			href: 'https://community.sailpoint.com/t5/Search/bd-p/search?searchString=%22IdentityNow+Transforms+-%22'
		},
		{
			label: '🧭 Compass',
			href: 'https://community.sailpoint.com'
		},
		{
			label: '🔏 User Level Access Matrix',
			href: 'https://documentation.sailpoint.com/saas/help/common/users/user_level_matrix.html'
		}
	];

	const popupResources: PopupSettings = {
		event: 'click',
		target: 'popupResources',
		placement: 'bottom',
		closeQuery: '.listbox-item'
	};
</script>

<button class="btn btn-sm variant-ghost-primary" use:popup={popupResources}>Resources</button>

<div class="p-2 card" data-popup="popupResources">
	<ul class="flex flex-col justify-center gap-2">
		{#each links as link}
			<li class="listbox-item">
				<a
					class="hover:underline text-center hover:text-tertiary-600"
					target="_blank"
					rel="noreferrer"
					href={link.href}
				>
					{link.label}
				</a>
			</li>
		{/each}
	</ul>
</div>
