import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './e2e',
  // Each test is given 30 seconds.
  timeout: 30_000,
  // Run tests in parallel.
  fullyParallel: true,
  // Fail the build on CI if you accidentally left test.only.
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: 'list',

  use: {
    // Base URL for the static preview server.
    baseURL: 'http://localhost:4173',
    trace: 'on-first-retry',
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],

  // Start `vite preview` to serve the static build before the tests run.
  webServer: {
    command: 'pnpm preview',
    url: 'http://localhost:4173',
    reuseExistingServer: !process.env.CI,
    // Give it a generous timeout so CI doesn't flake.
    timeout: 30_000,
  },
});
