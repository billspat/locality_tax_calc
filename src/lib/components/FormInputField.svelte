<script lang="ts">
	interface Props {
		label: string;
		formText: string;
		inputId: string;
		type: string;
		value?: string | number;
		step?: string | number;
		inputStyle?: string;
		[key: string]: unknown;
	}

	let {
		label,
		formText,
		inputId,
		type,
		value = $bindable(),
		step,
		inputStyle = 'max-width: 16rem;',
		...rest
	}: Props = $props();
</script>

<div class="mb-3">
	<label class="form-label" for={inputId}>{label}</label>
	<p class="form-text" style="white-space: pre-line;">{@html formText}</p>
	<input
		id={inputId}
		type={type}
		class="form-control"
		style={inputStyle}
		{step}
		bind:value
		{...rest}
	/>
</div>