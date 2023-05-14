<script lang="ts">
	import { idnSession } from '$lib/settings';
</script>

<div class="p-2 flex flex-row gap-2">
	<div class="p-1">
		<p class="underline text-lg">Tenant Info</p>
		<p class="text-sm">Tenant: {$idnSession.org}</p>
		<p class="text-sm">Region: {$idnSession.region}</p>
		<p class="text-sm">Pod: {$idnSession.pod}</p>
	</div>
	<div class="p-1">
		<p class="underline text-lg">Quick Links</p>
		<a
			target="_blank"
			rel="noreferrer"
			href={$idnSession.tenant + '/ui/admin#admin:dashboard:overview'}
		>
			Tenant Dashboard
		</a>
	</div>
</div>
