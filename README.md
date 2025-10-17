# Text Search Application

A simple React search app that lets you search through articles and highlights matching keywords in real-time.

## Quick Start

### Prerequisites
- Node.js (v14 or higher)
- npm

### Installation

1. Create a new React app:
   ```bash
   npx create-react-app text-search-app
   cd text-search-app
   ```

2. Install dependencies:
   ```bash
   npm install -D tailwindcss postcss autoprefixer
   npm install lucide-react
   npx tailwindcss init -p
   ```

3. Copy the search app code to `src/App.js`

4. Update `src/index.css`:
   ```css
   @tailwind base;
   @tailwind components;
   @tailwind utilities;
   ```

5. Update `tailwind.config.js`:
   ```javascript
   export default {
     content: [
       "./index.html",
       "./src/**/*.{js,jsx,ts,tsx}",
     ],
     theme: {
       extend: {},
     },
     plugins: [],
   }
   ```

6. Start the app:
   ```bash
   npm start
   ```

## How to Use

1. Type a keyword in the search box
2. Matching articles will appear with highlighted text
3. See the total number of matches found
4. Clear the search to see all articles

## Features

- 🔍 Real-time search filtering
- ✨ Highlighted search results
- 📊 Match counter
- 🎨 Clean, modern UI
- 📱 Responsive design

## Technologies

- React with Hooks
- Tailwind CSS
- Lucide React Icons

## Customization

Add more articles by editing the `articles` array in `App.js`:

```javascript
{
  id: 7,
  title: "Your Title",
  date: "Your Date",
  excerpt: "Your excerpt..."
}
```

Change the highlight color by modifying `bg-yellow-300` to any Tailwind color like `bg-blue-300` or `bg-green-300`.
