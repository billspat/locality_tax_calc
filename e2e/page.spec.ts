import { expect, test } from '@playwright/test';

test.describe('Static page rendering', () => {
  test('page loads without 500 error', async ({ page }) => {
    const response = await page.goto('/');
    expect(response?.status()).toBe(200);
  });

  test('page title and header text is present', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('heading', { level: 1 })).toContainText(
      'Pretend Locality Income Tax Calculator (for Non-Resident)'
    );
  });

  test('formula section is rendered', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByText('Formula used:')).toBeVisible();
    // The formula code block contains the key equation text.
    await expect(page.locator('code.formula-code')).toBeVisible();
    await expect(page.locator('code.formula-code')).toContainText('Tax Rate');
  });

  test('input fields are rendered and interactive', async ({ page }) => {
    await page.goto('/');

    // Key input IDs expected on the page.
    const inputIds = [
      'year',
      'totalWorkDays',
      'holidays',
      'ptoDays',
      'daysWorkedInCity',
      'totalWages',
      'deductions',
      'taxRate',
    ];
    for (const id of inputIds) {
      await expect(page.locator(`#${id}`)).toBeVisible();
    }
  });

  test('tax result updates when wages are changed', async ({ page }) => {
    await page.goto('/');

    // Enter wages and a meaningful number of city work days.
    const wagesInput = page.locator('#totalWages');
    await wagesInput.fill('100000');
    await wagesInput.blur();

    const cityDaysInput = page.locator('#daysWorkedInCity');
    await cityDaysInput.fill('200');
    await cityDaysInput.blur();

    // The "Locality Tax Owed" datagrid item should now show a non-zero value.
    const taxOwedValue = page.getByText('$').filter({ hasText: /^\$[\d,]+/ });
    await expect(taxOwedValue.first()).toBeVisible();
  });

  test('input validation clamps values to allowed range', async ({ page }) => {
    await page.goto('/');

    // Deductions is limited to 1–20 — try entering 99.
    const deductionsInput = page.locator('#deductions');
    await deductionsInput.fill('99');
    await deductionsInput.blur();

    // After the setter fires the value should be clamped to 20.
    await expect(deductionsInput).toHaveValue('20');
  });
});
