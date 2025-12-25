# Paws and Pets Play Club Website

Pet sitting, dog walking, and overnight care website for Alixandra in Washingtonville, NY.

## 🚀 Quick Deploy to Vercel

1. Push this folder to a GitHub repository
2. Go to [vercel.com](https://vercel.com) and sign in with GitHub
3. Click "New Project" → Import your repo
4. Click "Deploy" (no settings needed)
5. Done! You'll get a URL like `paws-and-pets-play-club.vercel.app`

## 📁 Project Structure

```
paws-and-pets-play-club/
├── index.html      # The entire website (single file)
├── images/         # Add photos here
│   └── .gitkeep
└── README.md       # This file
```

## 🖼️ Adding Photos

1. Get photos from Alixandra (the ones you already have are perfect)
2. Resize them to reasonable web sizes (1200px wide max, compress with tinypng.com)
3. Name them clearly and add to the `images/` folder:
   - `hero.jpg` - Main hero photo (her smiling with a dog)
   - `about-1.jpg` - Her with dogs outdoors
   - `about-2.jpg` - Cozy cuddles
   - `about-3.jpg` - Her with a cat
   - `gallery-1.jpg` through `gallery-7.jpg` - Various pet photos

4. In `index.html`, find the placeholder comments and replace them:

**Before:**
```html
<div class="hero-photo-main">
  👩🏽‍🦱🐕
  <span class="photo-placeholder-text">...</span>
</div>
```

**After:**
```html
<div class="hero-photo-main">
  <img src="images/hero.jpg" alt="Alixandra with a happy dog">
</div>
```

## ✏️ Making Changes

Everything is in `index.html`. To edit:

- **Prices**: Search for `$15`, `$25`, etc. and update
- **Phone**: Search for `845` and update all instances
- **Email**: Search for `pawsandpetsplayclub1@gmail.com`
- **Text content**: Just find and edit the text you want to change
- **Colors**: All colors are defined in `:root` at the top of the `<style>` section

## 📱 Contact Form

The form uses `mailto:` - when someone submits, it opens their email app with a pre-filled message to Alixandra's email. No server needed!

## 🔄 Updating the Live Site

After making changes:
1. Commit and push to GitHub
2. Vercel auto-deploys within ~30 seconds
3. Changes are live!

## 💡 Tips

- Use [TinyPNG](https://tinypng.com) to compress images before uploading
- Test on mobile (the site is responsive)
- The site works offline once loaded

---

Made with 🐾 for Paws and Pets Play Club
