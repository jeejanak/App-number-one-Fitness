# Momentum — Forgiving Habit Tracker

PWA that works on **Mac, Windows, iPhone, Android** — from YouTube Short's playbook:
Find popular habit app → read 1-3★ reviews → fix gaps → ship.

**Gaps fixed:** No subscription (local-first free), forgiving GitHub-grid (no streak reset), Export CSV, Share week for accountability.

## Run locally
- Double-click `www/index.html` or `index.html`
- Or `npx serve www -l 3000` → http://localhost:3000

## Deploy public link (30 sec, no code)
Drag `www/` or `momentum-public.zip` to https://app.netlify.com/drop → public URL.

## Build Android AAB without Android Studio (cloud)
Push this repo to GitHub `main` → Actions → `Build Android AAB` → download artifact → upload to Play Console ($25).
iOS: Connect same repo to Codemagic.io → builds .ipa on Mac cloud → App Store ($99/yr).

See NO_CODE_LAUNCH.md, STORE_CHECKLIST.md, DEPLOY_PUBLIC_LINK.md
