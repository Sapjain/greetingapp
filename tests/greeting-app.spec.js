const { test, expect } = require('@playwright/test');

test.describe('Greeting App - Requirements Verification', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('displays "Enter Your Name" label on load', async ({ page }) => {
    const label = page.locator('#name-label, label[for="name-input"]');
    await expect(label).toBeVisible();
    await expect(label).toHaveText('Enter Your Name');
  });

  test('has text input with placeholder "Type your name here"', async ({ page }) => {
    const input = page.locator('#name-input');
    await expect(input).toBeVisible();
    await expect(input).toHaveAttribute('placeholder', 'Type your name here');
    await expect(input).toHaveAttribute('type', 'text');
  });

  test('has button labeled "Greet"', async ({ page }) => {
    const button = page.locator('#greet-btn');
    await expect(button).toBeVisible();
    await expect(button).toHaveText('Greet');
  });

  test('displays "Hello " + name when button is clicked with name entered', async ({ page }) => {
    const input = page.locator('#name-input');
    const button = page.locator('#greet-btn');
    const greetingDisplay = page.locator('#greeting-display');

    await input.fill('Alice');
    await button.click();

    await expect(greetingDisplay).toBeVisible();
    await expect(greetingDisplay).toHaveText('Hello Alice');
  });

  test('displays "Hello there" when empty name and button clicked', async ({ page }) => {
    const button = page.locator('#greet-btn');
    const greetingDisplay = page.locator('#greeting-display');

    await button.click();

    await expect(greetingDisplay).toBeVisible();
    await expect(greetingDisplay).toHaveText('Hello there');
  });

  test('greeting displays below the button', async ({ page }) => {
    const form = page.locator('#greet-form');
    const greetingDisplay = page.locator('#greeting-display');

    const formBox = await form.boundingBox();
    const greetingBox = await greetingDisplay.boundingBox();

    expect(formBox).toBeTruthy();
    expect(greetingBox).toBeTruthy();
    expect(greetingBox.y).toBeGreaterThan(formBox.y + formBox.height - 10);
  });

  test('triggers animation when greet button is clicked', async ({ page }) => {
    const button = page.locator('#greet-btn');
    const animationContainer = page.locator('#animation-container');

    await button.click();

    await page.waitForTimeout(200);

    const children = await animationContainer.locator('> *').count();
    expect(children).toBeGreaterThan(0);
  });

  test('only one animation runs at a time - no overlap on rapid clicks', async ({ page }) => {
    const input = page.locator('#name-input');
    const button = page.locator('#greet-btn');
    const animationContainer = page.locator('#animation-container');

    await input.fill('Test');
    await button.click();
    await page.waitForTimeout(500);
    await button.click();
    await page.waitForTimeout(500);
    await button.click();

    await page.waitForTimeout(3500);

    const children = await animationContainer.locator('> *').count();
    expect(children).toBe(0);
  });

  test('animations clear properly before next runs', async ({ page }) => {
    const button = page.locator('#greet-btn');
    const animationContainer = page.locator('#animation-container');

    await button.click();
    await page.waitForTimeout(3500);

    const childrenAfterFirst = await animationContainer.locator('> *').count();
    expect(childrenAfterFirst).toBe(0);

    await button.click();
    await page.waitForTimeout(200);
    const childrenSecond = await animationContainer.locator('> *').count();
    expect(childrenSecond).toBeGreaterThan(0);
  });

  test('greeting updates when different names are entered', async ({ page }) => {
    const input = page.locator('#name-input');
    const button = page.locator('#greet-btn');
    const greetingDisplay = page.locator('#greeting-display');

    await input.fill('Bob');
    await button.click();
    await expect(greetingDisplay).toHaveText('Hello Bob');

    await input.fill('Charlie');
    await button.click();
    await expect(greetingDisplay).toHaveText('Hello Charlie');
  });

  test('UI is centered - main card is in viewport center', async ({ page }) => {
    const card = page.locator('.card');
    await expect(card).toBeVisible();

    const viewport = page.viewportSize();
    const cardBox = await card.boundingBox();

    const cardCenterX = cardBox.x + cardBox.width / 2;
    const viewportCenterX = viewport.width / 2;

    const tolerance = viewport.width * 0.3;
    expect(Math.abs(cardCenterX - viewportCenterX)).toBeLessThan(tolerance);
  });
});
