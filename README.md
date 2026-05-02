# 🍽️ Pantry Chef — Culinary Journal

Demo Images:<img width="1469" height="800" alt="Screenshot 2026-05-02 at 6 03 48 PM" src="https://github.com/user-attachments/assets/f5e3a96e-b70e-4863-a8c4-6f2c3a4f6101" />


<p align="center">
  <img src="chef_avatar.png" alt="Pantry Chef Logo" width="100" style="border-radius:20px;" />
</p>

<p align="center">
  <strong>Turn your pantry into a recipe playground.</strong><br/>
  A beautiful, offline-capable PWA that matches your ingredients to real recipes — instantly.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/version-2.0-brightgreen?style=flat-square" />
  <img src="https://img.shields.io/badge/PWA-ready-blueviolet?style=flat-square" />
  <img src="https://img.shields.io/badge/Unsplash-API-orange?style=flat-square" />
  <img src="https://img.shields.io/badge/No%20Framework-Vanilla%20JS-yellow?style=flat-square" />
  <img src="https://img.shields.io/badge/license-MIT-blue?style=flat-square" />
</p>

---

## ✨ Features

### 🥘 Smart Recipe Matching
- Add ingredients from your kitchen to your **virtual pantry**
- Smart alias system — "Baby Spinach", "Farm Fresh Eggs", "Russet Potatoes" all resolve correctly
- **Pantry Match Score** shows live percentage match for every recipe in the database
- Coverage-based scoring rewards recipes where you have MORE of the required ingredients

### 🪄 Suggest Ingredients
- Tap **"Suggest Ingredients"** to get smart companion recommendations based on what's already in your pantry
- E.g. add Chicken → get suggestions for Garlic + Lemon
- Suggestions are added to your pantry instantly

### 📸 Live Food Photography
- Every recipe card, detail hero, cooking step, and completion screen shows a **real, relevant Unsplash photo**
- Photos are fetched dynamically based on the recipe title
- In-memory cache prevents duplicate API calls
- Graceful fallback to existing images if Unsplash is unavailable

### 📖 Culinary Journal (Cook Tab)
- All generated recipes are saved as beautiful **journal-style cards** with food photos
- Tap any card to open the full recipe detail view

### 👨‍🍳 Step-by-Step Cooking Mode
- Full **cooking mode** with progress bar
- Each step shows a contextually relevant food photo
- Ingredient chips for each step
- **Voice readout** — tap the speaker icon to hear each step read aloud
- Built-in **countdown timer** with ring animation and presets (5, 10, 15, 20, 30 min)

### 🔖 Saved Recipes
- Bookmark any recipe with the ribbon icon
- Filter by category (Breakfast, Italian, Vegan, Dinner…)
- Rate recipes with 1–5 stars
- Stats panel: Cooked count, Saved count, Avg rating

### 📤 Share Recipe
- On mobile: uses the native **Web Share API** (share sheet)
- On desktop: copies the recipe text to clipboard

### 🛒 Shopping List
- Auto-generates a shopping list for ingredients the recipe needs but aren't in your pantry
- Check off items as you shop

### 🏆 Gamification
- Earn **XP points** for generating and cooking recipes
- Level system displayed on your profile
- Streak and meal count tracking

### 🌙 Dark Mode
- Full dark mode support — toggle in Profile → App Settings
- Preference persisted across sessions

### ⚙️ App Settings
- **Measurement units** — Metric / US Imperial toggle
- **Default servings** — adjustable 1–12 with +/− stepper
- **Cooking reminders** — browser notification permission toggle

### 📱 PWA — Installable
- Works offline via Service Worker caching
- Add to Home Screen on iOS and Android
- App manifest with theme colour and icons

---

## 🚀 Getting Started

### Prerequisites
- A modern browser (Chrome, Safari, Firefox, Edge)
- A free [Unsplash Developer Account](https://unsplash.com/developers) for live food photos

### 1. Clone the repository

```bash
git clone https://github.com/Srush6007/Pantry-Chef.git
cd Pantry-Chef
```

### 2. Set up your Unsplash API key

Create a `.env` file in the project root (**never commit this file**):

```env
UNSPLASH_ACCESS_KEY=your_unsplash_access_key_here
```

Then open `app.js` and update line 2:

```js
const UNSPLASH_ACCESS_KEY = "your_unsplash_access_key_here";
```

> 💡 Get a free key at [https://unsplash.com/developers](https://unsplash.com/developers) — the free tier allows 50 requests/hour.

### 3. Run locally

**Option A — Simple (no install needed):**
```bash
npx serve . -p 3000
# Then open http://localhost:3000
```

**Option B — Python:**
```bash
python3 -m http.server 3000
# Then open http://localhost:3000
```

**Option C — VS Code Live Server:**
- Install the [Live Server extension](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer)
- Right-click `index.html` → Open with Live Server

> ⚠️ You **must** serve the files through a local server (not open `index.html` directly) for the Service Worker and Unsplash API calls to work correctly.

---

## 📂 Project Structure

```
Pantry-Chef/
├── index.html          # All app screens / views (HTML structure)
├── app.js              # All application logic (~2,200 lines, Vanilla JS)
├── styles.css          # All styling with CSS variables & dark mode
├── sw.js               # Service Worker (PWA offline caching)
├── manifest.json       # PWA manifest (icons, theme, display mode)
├── chef_avatar.png     # Default chef avatar image
├── .gitignore          # Excludes .env, node_modules, .DS_Store
└── README.md           # This file
```

---

## 🗂️ App Screens

| Screen | Description |
|---|---|
| **Explore** | Add ingredients, see pantry match scores, generate recipe |
| **Cook (Journal)** | Culinary journal — all generated recipe cards |
| **Recipe Detail** | Full recipe: ingredients, steps, nutrition, share, shopping list |
| **Cooking Mode** | Step-by-step cooking with timer, voice, and live photos |
| **Bon Appétit** | Completion screen with XP reward |
| **Saved** | Bookmarked recipes with filter + star ratings |
| **Profile** | Chef stats, dietary prefs, skill level, app settings |

---

## 🧰 Tech Stack

| Layer | Technology |
|---|---|
| Structure | HTML5 (semantic, PWA-ready) |
| Styling | Vanilla CSS with CSS custom properties (variables) |
| Logic | Vanilla JavaScript (ES2022, no frameworks) |
| Fonts | Playfair Display + DM Sans (Google Fonts) |
| Icons | Material Symbols Rounded (Google) |
| Images | Unsplash API (dynamic, title-based search) |
| Storage | `localStorage` (all user data persisted locally) |
| Offline | Service Worker (cache-first strategy, v5) |

---

## 🔑 Environment Variables

| Variable | Required | Description |
|---|---|---|
| `UNSPLASH_ACCESS_KEY` | ✅ Yes | Unsplash API Access Key for food photos |

> **Note:** Since this is a client-side static app, the key is embedded directly in `app.js` (line 2). Keep your `app.js` private or use a proxy server in production for better security.

---

## 📖 How to Use

### Adding Ingredients
1. Type an ingredient name in the search bar (e.g. `Chicken`, `Spinach`, `Eggs`)
2. Press **Enter** or click **Add**
3. The ingredient appears in **Your Pantry** with an auto-detected category and icon

### Suggesting Ingredients
1. Add 1–2 ingredients to your pantry
2. Tap **✨ Suggest Ingredients**
3. Smart companion ingredients are automatically added

### Generating a Recipe
1. Add at least one ingredient
2. Tap **Generate Magic Recipe**
3. The app scores every recipe in the database against your pantry and shows the best match
4. The recipe opens instantly with a live Unsplash food photo

### Cooking Mode
1. Open any recipe
2. Tap **Start Cooking**
3. Navigate steps with **Next Step** or use the **Timer** pill
4. Tap the **🔊 speaker** to hear the step read aloud
5. Complete all steps → **Bon Appétit** screen + XP reward

### Saving a Recipe
1. Open a recipe detail view
2. Tap the **🔖 bookmark** icon in the top-right
3. Find it any time in the **Saved** tab

### Sharing a Recipe
1. Open a recipe detail view
2. Tap **Share** in the action buttons
3. On mobile: native share sheet opens
4. On desktop: recipe text is copied to clipboard

---

## 🗃️ Recipe Database

The app includes a built-in database of **20+ recipes** covering:

- 🍗 Chicken (Biryani, Fried Rice, Teriyaki Bowl, Butter Chicken, Grilled)
- 🥚 Eggs (Frittata, Masala Omelette, Egg Fried Rice)
- 🐟 Fish & Seafood (Lemon Herb Salmon)
- 🍝 Pasta (Tomato, Creamy Garlic)
- 🧀 Paneer (Tikka Skillet, Palak Paneer)
- 🫛 Lentils (Veggie Dal)
- 🥦 Vegetables (Aloo Gobi, Mixed Stir-Fry, Mushroom Toast)
- 🥑 Snacks (Avocado Toast)
- 🍖 Mutton (Curry)

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -m "feat: add your feature"`
4. Push to the branch: `git push origin feature/your-feature`
5. Open a Pull Request

---

## 📝 License

This project is licensed under the **MIT License** — feel free to use, modify, and distribute.

---

## 🙏 Credits

- Food photography by [Unsplash](https://unsplash.com)
- Icons by [Google Material Symbols](https://fonts.google.com/icons)
- Fonts by [Google Fonts](https://fonts.google.com)

---

<p align="center">
  Made with ❤️ by <a href="https://github.com/Srush6007">Srush6007</a>
</p>
