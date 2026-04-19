// @vitest-environment jsdom

import { flushSync, mount, unmount } from 'svelte';
import { afterEach, describe, expect, it } from 'vitest';
import FormInputFieldClampHarness from './FormInputFieldClampHarness.svelte';

describe('FormInputField component', () => {
  afterEach(() => {
    document.body.innerHTML = '';
  });

  it('renders label, helper text, and input', () => {
    const app = mount(FormInputFieldClampHarness, { target: document.body });

    expect(document.body.textContent).toContain('Clamped Number');
    expect(document.body.textContent).toContain('Enter a number between 0 and 10.');

    const input = document.querySelector<HTMLInputElement>('#clamped-input');
    expect(input).not.toBeNull();
    expect(input?.value).toBe('0');

    unmount(app);
  });

  it('works with clamp logic through function binding', () => {
    const app = mount(FormInputFieldClampHarness, { target: document.body });
    const input = document.querySelector<HTMLInputElement>('#clamped-input');

    expect(input).not.toBeNull();

    if (!input) {
      throw new Error('Expected clamped input to exist');
    }

    input.value = '15';
    input.dispatchEvent(new Event('input', { bubbles: true }));
    flushSync();

    expect(input.value).toBe('10');
    expect(document.querySelector('[data-testid="current-value"]')?.textContent).toBe('10');

    input.value = '-3';
    input.dispatchEvent(new Event('input', { bubbles: true }));
    flushSync();

    expect(input.value).toBe('0');
    expect(document.querySelector('[data-testid="current-value"]')?.textContent).toBe('0');

    unmount(app);
  });
});
