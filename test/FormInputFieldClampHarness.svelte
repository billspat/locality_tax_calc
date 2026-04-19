<script lang="ts">
  import FormInputField from '../src/lib/components/FormInputField.svelte';
  import { clamp } from '../src/lib/numberfuns';

  let value = $state(0);

  function setClampedValue(nextValue: unknown): void {
    value = clamp(Number(nextValue), 0, 10);
  }
</script>

<FormInputField
  label="Clamped Number"
  formText="Enter a number between 0 and 10."
  inputId="clamped-input"
  type="number"
  bind:value={
    () => value,
    setClampedValue
  }
/>

<p data-testid="current-value">{value}</p>
