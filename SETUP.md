# 🚀 Setup Guide for GitHub Pages Deployment

This guide will help you deploy the Chord Progression Generator to GitHub Pages with your API token securely configured.

## Prerequisites

- A GitHub account
- A GitHub Models API token ([Get one here](https://github.com/marketplace/models))
- This repository forked or cloned to your GitHub account

## Step-by-Step Deployment

### Step 1: Get Your GitHub Models API Token

1. Visit [https://github.com/marketplace/models](https://github.com/marketplace/models)
2. Click "Sign up" or "Get started" for GitHub Models
3. Follow the instructions to get access
4. Generate an API token
5. **Copy the token** - you'll need it in the next step

### Step 2: Add Token to Repository Secrets

1. Go to your repository on GitHub
2. Click **Settings** (in the top menu)
3. In the left sidebar, click **Secrets and variables** → **Actions**
4. Click the green **"New repository secret"** button
5. Fill in:
   - **Name**: `GITHUB_MODELS_TOKEN` (exactly as written)
   - **Secret**: Paste your GitHub Models API token
6. Click **"Add secret"**

✅ Your token is now securely stored and won't be visible in your code!

### Step 3: Enable GitHub Pages

1. Still in Settings, click **Pages** in the left sidebar
2. Under "Build and deployment":
   - **Source**: Select "GitHub Actions"
3. Click **Save**

### Step 4: Deploy

The app will automatically deploy when you push to the main/master branch.

**If you already pushed the code**:
- The GitHub Action should run automatically
- Go to the **Actions** tab to see the deployment progress

**If you haven't pushed yet**:
```bash
git add .
git commit -m "Initial deployment"
git push origin main  # or 'master' depending on your default branch
```

### Step 5: Access Your App

1. Go to the **Actions** tab in your repository
2. Wait for the "Deploy to GitHub Pages" workflow to complete (green checkmark)
3. Your app will be live at:
   ```
   https://YOUR-USERNAME.github.io/ChordGenerator/
   ```
   (Replace YOUR-USERNAME with your GitHub username)

4. **Test it**: Visit the URL and click "Generate Progression"
   - It should work immediately without asking for a token!
   - If it prompts for a token, check that your secret is named exactly `GITHUB_MODELS_TOKEN`

## Troubleshooting

### Deployment Failed

**Check the GitHub Actions log**:
1. Go to the **Actions** tab
2. Click on the failed workflow run
3. Click on the failed job to see error details

**Common issues**:
- Secret name must be exactly `GITHUB_MODELS_TOKEN` (case-sensitive)
- Make sure GitHub Pages is enabled in Settings → Pages
- Ensure the workflow file exists at `.github/workflows/deploy.yml`

### App Prompts for Token

If the deployed app still asks for a token:

1. **Verify the secret name**: Must be `GITHUB_MODELS_TOKEN`
2. **Check the workflow ran**: Go to Actions tab, ensure deployment succeeded
3. **Clear browser cache**: Hard refresh (Ctrl+Shift+R or Cmd+Shift+R)
4. **Check config.js**: In your deployed site, view source - config.js should have the token (obfuscated in browser DevTools)

### API Calls Failing

1. **Verify your token is valid**: Test it manually at [GitHub Models](https://github.com/marketplace/models)
2. **Check token permissions**: Ensure the token has access to the models API
3. **Look at browser console**: Open DevTools (F12) → Console tab for error messages

## Security Notes

### ✅ Safe

- Token stored in GitHub Secrets (encrypted)
- Token injected at build time
- `config.js` is generated during deployment (not in repository)

### ⚠️ Important

While the token is injected at build time, it **will be visible** to anyone who:
- Views the page source
- Opens browser DevTools and checks the config.js file

**This is suitable for**:
- Personal projects
- Educational purposes
- Demo applications
- Low-stakes usage

**This is NOT suitable for**:
- Production applications with sensitive data
- Shared/paid API keys with usage limits
- Enterprise applications

For production applications, consider setting up a backend proxy service.

## Local Development

If you want to develop locally:

1. **Copy the template**:
   ```bash
   cp config.template.js config.js
   ```

2. **Edit config.js**:
   ```javascript
   window.APP_CONFIG = {
       GITHUB_TOKEN: 'your_actual_token_here'
   };
   ```

3. **Run locally**:
   ```bash
   # Use any static file server
   python -m http.server 8000
   # Or
   npx serve
   ```

4. **Visit**: `http://localhost:8000`

**Note**: `config.js` is gitignored, so your local token won't be committed.

## Updating Your Token

If you need to change the API token:

1. Go to Settings → Secrets and variables → Actions
2. Click on `GITHUB_MODELS_TOKEN`
3. Click "Update secret"
4. Enter the new token
5. Push a commit to trigger redeployment (or manually trigger the workflow)

## Manual Workflow Trigger

You can manually trigger a deployment without pushing:

1. Go to **Actions** tab
2. Click **"Deploy to GitHub Pages"** in the left sidebar
3. Click **"Run workflow"** dropdown
4. Click the green **"Run workflow"** button

---

## Questions?

- Check the [main README.md](README.md) for feature documentation
- Check GitHub Actions logs for deployment issues
- Open an issue if you encounter problems

Happy music creating! 🎵
