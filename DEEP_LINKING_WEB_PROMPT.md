# AlgoDeck Deep Linking Setup Guide

The mobile app has now been configured to intercept both `algodeck://` and `https://algodeck.app` links.
To complete the setup on your website, you need to provide these files and instructions to the Antigravity agent managing your website repository.

## Step 1: Add Configuration Files to `.well-known`

Create a folder named `.well-known` in the root of your public website folder (or however your framework handles static public files, e.g., the `public/` directory in Next.js/React).

Inside that folder, create the following two files:

### 1. `apple-app-site-association` (No file extension)
*Note: Replace `[INSERT_TEAM_ID]` with your 10-character Apple Team ID once you create your Apple Developer Account.*
```json
{
  "applinks": {
    "apps": [],
    "details": [
      {
        "appID": "[INSERT_TEAM_ID].com.algodeck.app",
        "paths": ["/r/*", "/referral/*"]
      }
    ]
  }
}
```

### 2. `assetlinks.json`
*Note: Replace `[INSERT_SHA256_FINGERPRINT]` with the SHA-256 fingerprint of your Android signing keystore.*
```json
[
  {
    "relation": ["delegate_permission/common.handle_all_urls"],
    "target": {
      "namespace": "android_app",
      "package_name": "app.algodeck.com",
      "sha256_cert_fingerprints": [
        "01:9A:15:69:60:28:87:AF:F2:91:2E:97:46:8D:1C:AA:79:E7:BA:41:75:31:BB:88:21:97:0E:4F:53:57:1A:13"
      ]
    }
  }
]
```

---

## Step 2: Prompt for the Web Developer Agent

Copy and paste the following prompt to the Antigravity instance working on your website codebase:

***

**PROMPT:**

> I need to setup deep linking fallbacks and a "Coming Soon" referral UI on my website (`algodeck.app`).
> 
> Please perform the following tasks:
> 
> 1. **Configure App Links / Universal Links:** I have two configuration files: `apple-app-site-association` and `assetlinks.json`. Please place them in the `.well-known/` directory so they are served statically at the root of my domain (e.g., `https://algodeck.app/.well-known/assetlinks.json`). Ensure they are served with the `application/json` content type.
> 
> 2. **Build a Referral Fallback UI:** Create a new page route at `/r/[code]` (or `/referral/[code]`). This page is a fallback for users who click a referral link but don't have the AlgoDeck app installed on their phones. 
> 
> 3. **Design Requirements:**
>    - The UI should have a modern, premium "Glassmorphism" design with vibrant dark-mode aesthetics (matching AlgoDeck's branding).
>    - It should display a message like: *"You've been invited to AlgoDeck! Our mobile app is launching soon."*
>    - Include two large, disabled/grayed-out buttons for **[Download on the App Store]** and **[Get it on Google Play]**.
>    - Add a "Coming Soon" badge over the buttons.
> 
> 4. **Routing:** Ensure that any traffic to `/r/anything` correctly renders this UI page and does not throw a 404 error.
