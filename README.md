# Greeting App

A modern greeting web application with animated backgrounds.

## Features

- **Label**: "Enter Your Name"
- **Input**: Text field with placeholder "Type your name here"
- **Button**: "Greet" to trigger greeting
- **Greeting**: Displays "Hello " + name (or "Hello there" if empty) below the button
- **3 Background Animations** (randomly selected on each click):
  - Confetti explosion
  - Party popper streamers
  - Glowing burst rings
- Animations do not overlap; each clears before the next runs

## Project Structure

```
cursor website/
├── index.html          # Main app
├── css/
│   └── styles.css      # Styling
├── js/
│   └── app.js          # Logic & animations
├── tests/
│   ├── greeting-app.spec.js   # Playwright e2e tests
│   └── test-runner.html       # Browser-based test (no Node.js)
├── package.json
├── playwright.config.js
└── README.md
```

## Run the App

### Option 1: Open in browser (simplest)
Double-click `index.html` or drag it into your browser.

### Option 2: Python HTTP server (no Node.js required)
```powershell
cd "c:\Users\Sapna Jain\OneDrive\Documents\cursor website"
python -m http.server 3000
```
Then visit: **http://localhost:3000**

### Option 3: Node.js / npx serve
```powershell
cd "c:\Users\Sapna Jain\OneDrive\Documents\cursor website"
npx serve . -p 3000
```
Then visit: **http://localhost:3000**

### Option 4: VS Code Live Server
Right-click `index.html` → "Open with Live Server"

## Run Tests

### Option A: Playwright (requires Node.js)
```bash
cd "c:\Users\Sapna Jain\OneDrive\Documents\cursor website"
npm install
npx playwright install chromium
npm test
```

### Option B: Browser test runner (no Node.js)
1. **Using Python server:**
   ```powershell
   cd "c:\Users\Sapna Jain\OneDrive\Documents\cursor website"
   python -m http.server 3000
   ```
   Then open: **http://localhost:3000/tests/test-runner.html**

2. **Using file protocol:**  
   Open `tests/test-runner.html` in your browser (double-click).  
   Tests run automatically and show pass/fail.

## Verification Checklist

- [x] Label "Enter Your Name" on load
- [x] Text input with placeholder "Type your name here"
- [x] Button "Greet"
- [x] Greeting "Hello " + name below button on click
- [x] Empty name → "Hello there"
- [x] 3 animations: confetti, party popper, glowing burst
- [x] Random animation per click
- [x] No overlap; animations clear before next
- [x] Centered, attractive UI
