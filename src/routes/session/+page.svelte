<script>
	import { idnSession } from '$lib/settings';
	import { CodeBlock } from '@skeletonlabs/skeleton';
</script>

<div class="p-4 h-full flex flex-col justify-center">
	<CodeBlock lineNumbers language="json" code={JSON.stringify($idnSession, null, ' ')} />
</div>
