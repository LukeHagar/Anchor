<script>
	import { idnSession } from '$lib/settings';
	import { CodeBlock } from '@skeletonlabs/skeleton';
</script>

<div class="p-1">
	<CodeBlock lineNumbers language="json" code={JSON.stringify($idnSession, null, ' ')} />
</div>
