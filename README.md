# Paws and Pets Play Club

Five-page static site for Alixandra's pet care business in Washingtonville, NY. Deploys to Vercel.

---

## Project structure

```
paws-and-pets-play-club/
├── index.html          # Home — layered hero, marquee, service preview, testimonials, CTA
├── services.html       # Services — detailed breakdown of all 5 services + FAQ + price table
├── about.html          # About — Alix's story, day-in-the-life, family-supported, stats
├── gallery.html        # Gallery — masonry photo grid with lightbox
├── book.html           # Book — process timeline, contact methods, form, booking FAQ
├── assets/
│   ├── styles.css      # Shared design system (~45KB)
│   └── scripts.js      # Shared interactions: nav, reveal, parallax, counters, lightbox, form
├── images/             # Optimized real photos (renamed for clarity)
├── images.1/, images.2/  # Old folders — safe to delete once you've confirmed the new site
├── vercel.json         # Vercel config: clean URLs + immutable cache for assets
├── robots.txt
├── sitemap.xml
└── README.md
```

---

## Three things to finish before launch

### 1. Hook up the contact form (5 minutes, free)

The form on `book.html` uses **Web3Forms** — free, no signup, emails Alix when someone submits.

1. Go to [web3forms.com](https://web3forms.com)
2. Enter Alix's email (`pawsandpetsplayclub1@gmail.com`) → **Create Access Key**
3. Confirm the verification email
4. Copy the access key
5. Open `book.html`, find:
   ```html
   <input type="hidden" name="access_key" value="YOUR_WEB3FORMS_ACCESS_KEY" />
   ```
   Replace `YOUR_WEB3FORMS_ACCESS_KEY` with your key.
6. Commit + push. Vercel auto-deploys.

Until then, the form falls back to opening the user's email app — still works, just less smooth.

### 2. Set up Google Business Profile (the #1 local SEO lever)

Bigger than anything in the site code. Visit [business.google.com](https://business.google.com), claim a profile for "Paws and Pets Play Club" with the Washingtonville address and `(845) 751-8556`. Free. Without this, Alix won't show up in Google Maps for "dog walker near me" — and that's where local clients actually search.

After it's verified, ask early happy clients to leave a Google review. Five short reviews moves the needle hard.

### 3. Drop in real testimonials

The Home page has three placeholder testimonial slots in the `Trusted by neighbors` section. Once Alix collects 2–3 real quotes (3 sentences each, first name + pet name), open `index.html`, find the `<figure class="quote placeholder">` blocks, replace the placeholder text + footer line, and remove the `placeholder` class to make them full opacity.

---

## Deploy

The Vercel project is already configured (`.vercel/project.json` is set).

```bash
git add .
git commit -m "Multi-page redesign"
git push
```

Vercel auto-deploys from the connected GitHub repo within ~30 seconds. With the new `vercel.json`, URLs will be clean — `/services` instead of `/services.html` (Vercel strips the extension automatically).

---

## What changed in this rebuild

Compared to the previous single-page version:

- **Five pages instead of one.** Home / Services / About / Gallery / Book. Real navigation between real pages with shared `assets/styles.css` and `assets/scripts.js` so there's one design system, not five.
- **Layered photo collage hero on Home** with word-by-word reveal animation, ken-burns slow zoom on each photo, and a decorative paw-trail SVG.
- **Marquee strip** under the hero — slow scroll of recent pet names ("JJ the Chihuahua · Bél the tabby · Cody the doodle…"). Pauses on hover.
- **Real motion throughout.** Stagger reveals on grouped items, parallax on the featured photo, animated counters on the About stats row, smooth scroll, sticky nav with shadow on scroll, mobile sticky text-Alix bar that hides near the top, hover states that actually feel considered.
- **Asymmetric service cards on Home** — two horizontal hero cards on top, three vertical cards below. Not the matched-set "AI grid" pattern.
- **Editorial Services page** with alternating left/right layout per service, badge labels, price tiles, includes-tags, and 2–3 FAQ accordions per service. Plus a full pricing table at the bottom.
- **Magazine-style About page** with drop-cap intro, asymmetric photo grid, two pull-quotes, animated stat counters, "A day in the life" timeline, family-supported sub-section, "Why families pick us" three-column block.
- **Masonry gallery with lightbox.** Click any photo to open full-size, arrow keys / on-screen buttons to flip through, Esc to close. Hover reveals captions.
- **Book page with process timeline** ("From first text to first walk, in four steps") plus a 7-question booking FAQ.
- **Lightbox + custom cursor + scroll-to-top paw** as polish.
- **Brand mark animates** on hover (subtle rotate + scale).
- **Custom SVG illustrations** instead of emoji or stock — paw trail in the hero, paw mark in CTAs and footer, all decorative.
- **CTA banners** on every page with the same forest-green ink-style block + a wheat-italic "free" word for emphasis.

All real photos. No stock pet imagery — that would dilute the trust signal.

---

## Editing common things

- **Phone** — search `8457518556` (in `tel:` and `sms:` links) and `(845) 751-8556` (display). All five pages.
- **Email** — search `pawsandpetsplayclub1@gmail.com`.
- **Hero headline** — `index.html`, search `Pet care from a Washingtonville local`.
- **Service descriptions / prices** — `services.html`, look for the `<section id="walking">` etc. blocks. Match the price-tile + includes-tags + FAQ structure.
- **Stats** — `about.html`, search `data-count`. The number animates from 0 to that value when scrolled into view.
- **Day-in-the-life** — `about.html`, search `Bél's breakfast` to find the schedule rows.
- **Marquee text** — `index.html`, search `JJ the Chihuahua`. Update the pet names in both `<span>` blocks (it's duplicated for the seamless-loop trick).
- **Gallery photos** — `gallery.html`, each `<figure data-lightbox>`. Add or reorder. The lightbox auto-picks them up.
- **Colors** — `assets/styles.css`, the `:root {}` block at the top. Change once, everything updates.
- **Booking FAQ** — `book.html`, search `Booking FAQ`.

---

## Adding more photos

1. Drop `.jpg` files into `images/` (keep under ~300KB; use [tinypng.com](https://tinypng.com))
2. Reference with `<img src="images/your-photo.jpg" alt="describe what's in it" loading="lazy">`
3. Always write real `alt` text — it helps screen readers and helps Google understand the image.

To shrink an image on the command line:
```bash
magick input.jpg -resize '1400x1400>' -strip -interlace Plane -quality 82 output.jpg
```

---

## Local preview

Two options:

```bash
# Option 1: Simple Python server (any port)
cd paws-and-pets-play-club
python3 -m http.server 8000
# then visit http://localhost:8000

# Option 2: Vercel CLI (gives you the production-like clean URLs)
npx vercel dev
# then visit the URL it shows
```

---

## Final pre-launch checklist

- [ ] Web3Forms access key set in `book.html`
- [ ] Google Business Profile claimed + verified
- [ ] At least 2 real testimonials in `index.html`
- [ ] Submitted form actually arrives in Alix's inbox (test it)
- [ ] Mobile preview looks right (open on Alix's actual phone)
- [ ] Tap "Text Alix" on phone → opens Messages with the right number
- [ ] Lightbox opens / closes / arrow-keys flip through gallery
- [ ] Final URL (custom domain or `paws-and-pets-play-club.vercel.app`) replaces placeholder URLs in canonical tags, OG tags, sitemap, JSON-LD schema
