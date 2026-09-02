# Deploy Public Link — 30 seconds, free, works on Mac/Windows/iPhone/Android

Your PWA is store-ready in habit-pwa/. To make it public *today* without Apple/Google approval:

## Option A — Netlify Drop (fastest, no account needed at first)
1. Go to https://app.netlify.com/drop
2. Drag the entire `habit-pwa` folder onto the page
3. You get a public URL like `https://momentum-xxxxx.netlify.app` — share it. Phones can Install → Add to Home Screen.

## Option B — Vercel (also free)
1. `npm i -g vercel`
2. `cd "C:\Users\DELL\OneDrive\Desktop\MG AI\habit-pwa"`
3. `vercel --prod` → follow prompts → public URL

## Option C — GitHub Pages
1. `git init` in habit-pwa, push to GitHub
2. Settings → Pages → Source: main / root

All 3 serve `index.html:1` + `manifest.json:1` + `sw.js:1` as PWA. Test install on iPhone/Android/Mac/Windows.

After public link works, use the same build for stores (no changes).
