import { render } from 'svelte/server';
import { describe, expect, it } from 'vitest';
import Page from '../src/routes/+page.svelte';

describe('Main page render', () => {
  it('renders the calculator page with key content', () => {
    const { body } = render(Page);

    expect(body).toContain('Pretend Locality Income Tax Calculator (for Non-Resident)');
    expect(body).toContain('Formula used:');
    expect(body).toContain('Work Days');
    expect(body).toContain('Your Information');
    expect(body).toContain('Calculated Tax');
    expect(body).toContain('Locality Tax Owed');
  });
});
