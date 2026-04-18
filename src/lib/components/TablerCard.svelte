<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		title: string;
		class?: string;
		children?: Snippet;
		[key: string]: unknown;
	}

	let { title, class: className = '', children, ...rest }: Props = $props();
</script>

<div {...rest} class={`card ${className}`.trim()}>
	<div class="card-header">
		<h3 class="card-title">{title}</h3>
	</div>
	<div class="card-body">
		{@render children?.()}
	</div>
</div>