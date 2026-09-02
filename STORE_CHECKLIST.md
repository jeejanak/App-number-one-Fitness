# Store Submission Checklist — Momentum

## App ID
com.momentum.habits / Momentum — Forgiving Habit Tracker

## What I prepared
- capacitor.config.json:1 — appId + webDir
- package.json:1 — @capacitor/core/cli/android/ios
- manifest.json:1 — PWA installable
- index.html:1 — actual app (offline, no subscription)

## Steps to generate native projects (run on your PC)
```powershell
cd "C:\Users\DELL\OneDrive\Desktop\MG AI\habit-pwa"
npm install
npx cap init Momentum com.momentum.habits --web-dir .
npx cap add android
# on Mac only:
npx cap add ios
npx cap sync
```

## Android (works on Windows)
- Needs Android Studio: https://developer.android.com/studio
- `npx cap open android` → Build → Generate Signed Bundle (AAB)
- Needs Play Console ($25) + signing key + privacy policy URL
- Upload AAB to Play Console → internal test → production

## iOS (needs Mac + Xcode)
- `npx cap open ios` → set Team, Bundle ID, App Icons
- Needs Apple Developer $99/year + Xcode
- Product → Archive → Distribute to App Store Connect

## Store Listing Ready Text (edit before submit)
- Title: Momentum — Forgiving Habit Tracker
- Subtitle: Goal-linked habits, no streak-shaming
- Description: Built from App Store playbook: fixes Productive's subscription complaints, adds friend accountability + GitHub-style grid, local-first offline, works on Mac/Windows/iOS/Android.
- Keywords: habit tracker, goals, productivity, streaks, accountability
- Privacy Policy: Must host at https://yourdomain/privacy — template in PRIVACY.md
- Screenshots: Take 6.5" iPhone + 12.9" iPad + Android phone screenshots of index.html

## Why stores take time
Apple/Google review 1-3 days, reject if missing privacy policy, icons, or account mismatch. The public PWA link works instantly while you wait.

Next: After `npm install`, tell me OS and I will run the add commands for you.
