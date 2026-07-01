# Make Akelius Pay — Deployment Guide

Complete step-by-step instructions to go from these files to a live site at makeakeliuspay.ca.

---

## What you need before starting

- A GitHub account (free)
- Access to your GoDaddy DNS settings for makeakeliuspay.ca
- A Formspree account (free tier is fine)

---

## Step 1 — Create the GitHub repository

1. Go to https://github.com/new
2. Repository name: `makeakeliuspay` (or any name — it doesn't affect the custom domain)
3. Set visibility to **Public** (required for free GitHub Pages)
4. Do NOT initialize with a README — you already have one
5. Click **Create repository**

---

## Step 2 — Push the files to GitHub

In your terminal, from the folder containing these files:

```bash
git init
git add .
git commit -m "Initial site launch"
git branch -M main
git remote add origin https://github.com/YOUR_GITHUB_USERNAME/makeakeliuspay.git
git push -u origin main
```

Replace `YOUR_GITHUB_USERNAME` with your actual GitHub username.

---

## Step 3 — Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings** (top tab)
3. In the left sidebar, click **Pages**
4. Under **Source**, select **Deploy from a branch**
5. Branch: `main` / folder: `/ (root)`
6. Click **Save**

GitHub will show a message like "Your site is being published at https://YOUR_USERNAME.github.io/makeakeliuspay"

Wait 1–2 minutes. The site should be live at that URL before you point the domain.

---

## Step 4 — Connect your GoDaddy domain

GitHub Pages requires specific DNS records. Log into GoDaddy and go to **DNS Management** for makeakeliuspay.ca.

### Delete any existing A records for the root domain (@)

Then add these four A records:

| Type | Name | Value | TTL |
|------|------|-------|-----|
| A | @ | 185.199.108.153 | 600 |
| A | @ | 185.199.109.153 | 600 |
| A | @ | 185.199.110.153 | 600 |
| A | @ | 185.199.111.153 | 600 |

Then add one CNAME record for the www subdomain:

| Type | Name | Value | TTL |
|------|------|-------|-----|
| CNAME | www | YOUR_GITHUB_USERNAME.github.io | 3600 |

Replace `YOUR_GITHUB_USERNAME` with your actual GitHub username.

### Back in GitHub Pages settings:

1. Under **Custom domain**, type `makeakeliuspay.ca`
2. Click **Save**
3. Check **Enforce HTTPS** (this option appears after DNS propagates — may take 10–30 minutes)

DNS changes can take up to 48 hours to propagate globally, but usually work within 30 minutes.

To verify DNS is resolving correctly, run:
```
nslookup makeakeliuspay.ca
```
You should see the four GitHub IP addresses listed above.

---

## Step 5 — Set up Formspree for the contact form

1. Go to https://formspree.io and create a free account
2. Click **New Form**
3. Name it something like "Make Akelius Pay — Story Submissions"
4. Enter the email address where you want submissions sent (e.g. makeakeliuspay.mtl@gmail.com)
5. Copy your form endpoint — it looks like:
   ```
   https://formspree.io/f/abcd1234
   ```

### Swap the endpoint into submit.html

Open `submit.html` and find this line (around line 60):

```html
action="https://formspree.io/f/YOUR_FORM_ID_HERE"
```

Replace it with your actual endpoint:

```html
action="https://formspree.io/f/abcd1234"
```

Save the file, then commit and push:

```bash
git add submit.html
git commit -m "Add Formspree endpoint"
git push
```

GitHub Pages deploys automatically within 1–2 minutes of a push.

### Test the form

Submit a test story on the live site. You should:
- See the green success message appear (form hides, success text shows)
- Receive the submission at your email within a minute or two

Formspree's free tier allows 50 submissions per month. If you expect more volume, upgrade to their paid plan or switch to a self-hosted alternative.

---

## File structure reference

```
makeakeliuspay/
├── index.html       — Homepage (hero, UN quote, testimonials, CTA)
├── about.html       — About the campaign, UN report, TAL guide, resources
├── submit.html      — Tenant story submission form (Formspree)
├── style.css        — All styles (shared across all pages)
├── CNAME            — GitHub Pages custom domain file (do not delete)
└── README.md        — This file
```

---

## Making changes after launch

All edits follow the same pattern:

1. Edit the file locally
2. `git add <filename>`
3. `git commit -m "description of change"`
4. `git push`

GitHub Pages rebuilds automatically. Changes are live within 1–3 minutes.

---

## Adding real tenant stories

When a tenant submits via the form and consents to anonymous publication:

1. Open `index.html`
2. Find the `testimonials-grid` section
3. Copy one of the existing `<article class="testimonial-card">` blocks
4. Replace the placeholder text with the anonymized story
5. Update the `<footer>` with borough and tenant status only (no names)
6. Commit and push

---

## Troubleshooting

**Site not loading at custom domain after 1 hour:**
- Confirm the four A records are set correctly in GoDaddy
- Confirm the CNAME file in your repo contains exactly `makeakeliuspay.ca` (no extra spaces or characters)
- Confirm the custom domain is saved in GitHub Pages settings

**HTTPS not available:**
- GitHub Pages HTTPS requires DNS to be fully propagated first
- Wait up to 24 hours after DNS change, then check the "Enforce HTTPS" checkbox

**Form submissions not arriving:**
- Verify your Formspree endpoint is correct in submit.html
- Check your spam folder
- Log into Formspree dashboard to see if submissions are recorded there (even if email is delayed)

**Form shows "Form endpoint not configured" alert:**
- You still have `YOUR_FORM_ID_HERE` as the action value — replace it with your real Formspree endpoint
