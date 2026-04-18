<script lang="ts">
	import './layout.css';

	let { children } = $props();
</script>

<div class="page">
	<div class="page-wrapper">
		{@render children()}
	</div>
</div>
