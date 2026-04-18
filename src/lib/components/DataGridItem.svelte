<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		title: string;
		children?: Snippet;
	}

	let { title, children }: Props = $props();
</script>

<div class="datagrid-item">
	<div class="datagrid-title">{title}</div>
	<div class="datagrid-content">
		{@render children?.()}
	</div>
</div>