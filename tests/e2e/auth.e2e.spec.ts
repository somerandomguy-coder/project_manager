import { test, expect } from '@playwright/test'

test.describe('Admin Authentication Redirect', () => {
  test('should redirect unauthenticated users from /admin to /admin/login', async ({ page }) => {
    // Navigate to admin root
    await page.goto('http://localhost:3000/admin')
    
    // Check if redirected to login
    await expect(page).toHaveURL(/.*\/admin\/login/)
  })

  test('should allow access to /admin/login without redirect loop', async ({ page }) => {
    await page.goto('http://localhost:3000/admin/login')
    await expect(page).toHaveURL(/.*\/admin\/login/)
  })
  
  test('should allow access to /admin/create-first-user without redirect loop', async ({ page }) => {
    await page.goto('http://localhost:3000/admin/create-first-user')
    await expect(page).toHaveURL(/.*\/admin\/create-first-user/)
  })
})
