# TheAIcraftify — Portfolio Website

A dark, premium, mobile-first portfolio site documenting a public 90-day
AI + web development journey. Plain **HTML, CSS, and JavaScript** — no
frameworks, no build step, no database, nothing paid.

```
theaicraftify/
├── index.html      ← all page content and structure
├── styles.css       ← all visual styling (colors, fonts, layout, responsive)
├── script.js         ← interactivity (menu, roadmap tracker, etc.)
└── README.md         ← this file
```

---

## 1. How to run it on your computer

You don't need to install anything special.

**Easiest way:**
1. Find the `index.html` file.
2. Double-click it. It will open directly in your web browser.

**Slightly better way (recommended once you're editing a lot):**
Browsers sometimes restrict things when you open a file directly (double-click).
A tiny local server avoids this:

- If you use **VS Code**: install the free "Live Server" extension, right-click
  `index.html`, choose **"Open with Live Server."**
- If you have **Python** installed: open a terminal in the project folder and run
  `python3 -m http.server`, then visit `http://localhost:8000` in your browser.

Any change you make to `index.html`, `styles.css`, or `script.js` will show up
when you refresh the page.

---

## 2. How to edit your personal details

Open `index.html` in any text editor and use "Find" (Ctrl+F / Cmd+F) to locate
these spots:

| What to change | Search for this in `index.html` |
|---|---|
| Instagram link | `https://instagram.com/TheAIcraftify` (appears twice — hero "Follow My Journey" button uses `#instagram`, and the two real links are in the **Instagram section** and **Contact section**) |
| Email address | `mailto:youremail@example.com` in the **Contact section** |
| WhatsApp number | `https://wa.me/10000000000` in the **Contact section** — replace `10000000000` with your real number in international format, no `+` or spaces (e.g. `wa.me/919876543210`) |
| Your name / brand | Search for `TheAIcraftify` if you ever want to rename the brand — it appears in the nav logo, hero, Instagram section, and footer |
| Hero terminal messages | Open `script.js`, find `TERMINAL_MESSAGES` near the top of section 2 — edit the list of strings there |

Everything else (headlines, about text, roadmap tasks, log entries) is plain
text inside `index.html` — just find the section comment (e.g.
`<!-- 6. LEARNING LOG -->`) and edit the text between the tags.

### Adding a new Learning Log entry
In `index.html`, find `<ol class="log-list" id="logList">` and add a new
block **above** the existing ones (newest first):

```html
<li class="log-entry">
  <span class="log-day">Day 12</span>
  <p>Learned how JavaScript arrays work and built a to-do list.</p>
</li>
```

### Replacing a project card with a real project
In the **Projects section**, find one `<article class="project-card">` block.
Update:
- `Project 01` title text and description
- The `Coming Soon` badge — delete that `<span class="project-status">` line entirely once the project is live
- The two links (`data-role="view-project"` and `data-role="github-project"`) —
  change `href="#"` to your live demo URL and GitHub repo URL

### Updating your roadmap day
You don't need to edit code for this — use the **+ / −** buttons on the live
site under "My 90-Day AI Developer Challenge." It saves automatically in your
browser (via `localStorage`), so it will remember your day count and checked
tasks next time you open the site *on the same browser and device*. If you
publish the site and view it on your phone, the counter starts fresh there —
each device tracks its own copy, since there's no backend/database.

---

## 3. How to deploy it for free

**Recommended: Netlify Drop (no account needed to try, free account to keep it live)**
1. Go to https://app.netlify.com/drop
2. Drag your whole `theaicraftify` folder onto the page.
3. You'll get a live public URL in seconds. Create a free account to keep it
   permanently and optionally set a custom subdomain like
   `theaicraftify.netlify.app`.

**Alternative: GitHub Pages (good since you're already learning Git)**
1. Create a free GitHub account and a new repository, e.g. `theaicraftify`.
2. Upload `index.html`, `styles.css`, and `script.js` to it (or push via Git
   if you've learned that yet).
3. Go to the repo's **Settings → Pages**.
4. Under "Branch," choose `main` and folder `/root`, then save.
5. GitHub gives you a live URL like `https://yourusername.github.io/theaicraftify/`.

**Alternative: Vercel**
1. Go to https://vercel.com, sign up free.
2. "Add New Project" → import from GitHub (or drag-and-drop the folder).
3. Deploy — you'll get a live URL instantly.

Once live, put the link in your Instagram bio and you're done.

---

## 4. How each section works (plain-language explanation)

- **Nav bar** — sticky at the top. On phones, the three lines (burger icon)
  toggle a dropdown menu — handled by `navToggle` / `navLinks` in `script.js`.
- **Hero** — the big intro. The typing effect under the subheading is done by
  a small JavaScript loop that adds/removes one letter at a time.
- **About** — static text describing you honestly as a self-taught learner.
- **Roadmap** — three "phase" cards (Foundation / Building / Portfolio) each
  with a checklist. Checking a box, and moving the day counter, both save to
  `localStorage`, which is just a small storage box inside your own browser —
  no server, no login, no data sent anywhere.
- **Projects** — three cards, each with a number, title, description, tags,
  and two buttons. Marked "Coming Soon" until you replace the placeholder
  links with real ones.
- **Skills** — two lists (Currently Learning / Future) with honest status
  labels (Learning / Building / Exploring) instead of fake percentages.
- **Learning Log** — a simple timeline of dated entries you add to by hand.
- **Instagram** — a call-to-action section linking to your Instagram profile.
- **Future Goal** — a horizontal path showing your intended direction
  (Learn → Build → Publish → Freelance → Work With Teams → Become an AI Developer).
- **Contact** — three buttons: Instagram, Email, WhatsApp.
- **Footer** — brand name, tagline, and copyright year.

All colors, fonts, and spacing are controlled from one place: the `:root`
block at the very top of `styles.css`. Change a value there (like
`--accent-ai`) and it updates everywhere that color is used.

---

## 5. What to build during Days 1–90 (suggestions)

**Days 1–30 (Foundation)**
- Rebuild a couple of sections of this very site from scratch, unstyled, to
  practice raw HTML/CSS.
- Build 2–3 tiny standalone pages: a personal bio card, a simple pricing
  table, a contact form (front-end only).
- Learn just enough Git/GitHub to push this project to a repository and
  track changes with commits.

**Days 31–60 (Building)**
- Connect a free public API (e.g. a weather API or a quotes API) to a small
  page using `fetch()` — this is what "Project 02" language should turn into.
- Learn basic Python syntax and write small scripts (not connected to the
  website yet — just building the muscle).
- Build one working AI-powered mini tool (e.g. a text summarizer or FAQ
  responder using a free-tier AI API) and turn it into "Project 01."

**Days 61–90 (Portfolio & Real World)**
- Polish and deploy at least one real project with a working demo link.
- Replace all three placeholder project cards on this site with real ones.
- Write 3–5 genuine Learning Log entries documenting specific wins.
- Reach out to 2–3 small local businesses offering a simple free/low-cost
  website audit or fix, to start building real (even if small) experience.
- Update the About section once you have a first real project shipped —
  keep it honest, just let the achievements speak for themselves.

Good luck — ship something small every week, and let this site be the proof.
