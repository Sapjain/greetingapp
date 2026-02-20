# Commands to Run & See Output

## 1. Run the App

Open PowerShell and run:

```powershell
cd "c:\Users\Sapna Jain\OneDrive\Documents\cursor website"
python -m http.server 3000
```

**Output:**
```
Serving HTTP on :: port 3000 (http://[::]:3000/) ...
```

Then open your browser and go to: **http://localhost:3000**

---

## 2. Run Verification Tests

### Option A: Playwright (requires Node.js)

```powershell
cd "c:\Users\Sapna Jain\OneDrive\Documents\cursor website"
npm install
npx playwright install chromium
npm test
```

**Expected output:** All tests pass (✓).

### Option B: Browser Test Runner (no Node.js)

1. Start the app with the Python server (see above).
2. In your browser, open: **http://localhost:3000/tests/test-runner.html**
3. Tests run automatically. You'll see green ✓ for passed tests and red ✗ for failed ones.

---

## 3. Quick Test (No Server)

1. Double-click `index.html` to open the app in your browser.
2. Enter a name, click **Greet**, and confirm the greeting and animation appear.
