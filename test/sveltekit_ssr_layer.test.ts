/**
 * SvelteKit SSR-layer integration test.
 *
 * Purpose: exercise the full component + lib dependency graph at render time.
 * This catches:
 *   • Runtime errors thrown during SSR (e.g. bad logic, null dereferences)
 *   • Components or lib modules that fail when actually executed
 *   • Missing exports or shape mismatches between modules
 *
 * LIMITATION — what this test does NOT catch:
 *   • Bundler-time failures such as `import x from "vite"` in a lib module.
 *     In Vitest's Node environment, "vite" resolves fine as a dev dependency.
 *     That same import fails only when SvelteKit bundles the SSR output with
 *     browser/edge module conditions. The only reliable guard for that class
 *     of error is `pnpm build` (or `pnpm test` which runs build first).
 *
 * Run `pnpm test` (build + vitest) to catch both bundler-time and render-time errors.
 */
import { render } from 'svelte/server';
import { describe, expect, it } from 'vitest';

// --- Eagerly import all lib modules used by the app.
// A bad module-level import (e.g. `import { defaultServerConditions } from "vite"`)
// will cause this file to fail to load, surfacing the error as a test failure.
import * as numberfuns from '../src/lib/numberfuns';
import DataGridItem from '../src/lib/components/DataGridItem.svelte';
import FormInputField from '../src/lib/components/FormInputField.svelte';
import TablerCard from '../src/lib/components/TablerCard.svelte';
import Page from '../src/routes/+page.svelte';

describe('SvelteKit SSR layer', () => {
  it('all lib modules load without throwing', () => {
    // If any module above had a broken import the test file would already have
    // failed to import — this assertion is a final safety check on the exports.
    expect(typeof numberfuns.toNumber).toBe('function');
    expect(typeof numberfuns.clamp).toBe('function');
    expect(typeof numberfuns.clampToNonNegative).toBe('function');
    expect(TablerCard).toBeTruthy();
    expect(FormInputField).toBeTruthy();
    expect(DataGridItem).toBeTruthy();
  });

  it('full SSR render of +page.svelte succeeds and returns markup', () => {
    // render() exercises the full Svelte SSR code path including all imported
    // components and derived state. If a module imported by the page throws at
    // initialisation time this will propagate here.
    let result: { body: string; head: string };
    expect(() => {
      result = render(Page);
    }).not.toThrow();

    // Verify the server produced real markup, not an empty or error shell.
    expect(result!.body.length).toBeGreaterThan(500);
    expect(result!.body).toContain('Pretend Locality Income Tax Calculator (for Non-Resident)');
    expect(result!.body).toContain('Work Days');
    expect(result!.body).toContain('Locality Tax Owed');
  });
});
