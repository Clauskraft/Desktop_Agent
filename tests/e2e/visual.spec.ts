import { test, expect } from '@playwright/test';

test.describe('Visual CVI Tests', () => {
  test('Dashboard uses TDC colors', async ({ page }) => {
    await page.goto('/');
    
    // Check that primary color is used
    const heading = page.locator('h4');
    await expect(heading).toBeVisible();
    
    // Visual snapshot
    await expect(page).toHaveScreenshot('dashboard.png');
  });

  test('Navigation uses glassmorphism', async ({ page }) => {
    await page.goto('/');
    
    const nav = page.locator('nav');
    await expect(nav).toBeVisible();
    
    await expect(page).toHaveScreenshot('navigation.png');
  });

  test('Chat interface renders correctly', async ({ page }) => {
    await page.goto('/chat');
    
    await expect(page.locator('h4')).toContainText('Chat');
    await expect(page).toHaveScreenshot('chat.png');
  });
});
