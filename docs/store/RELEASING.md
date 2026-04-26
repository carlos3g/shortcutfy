# Releasing

## First publish (one-time, manual)

1. Create a Chrome Web Store developer account at https://chrome.google.com/webstore/devconsole/ and pay the $5 one-time fee.
2. Build the package locally:
   ```sh
   yarn package
   ```
   This produces `shortcutfy-<version>.zip` in the repo root.
3. In the devconsole, click **New item** and upload the zip.
4. Fill out the listing:
   - **Name**: Shortcutfy
   - **Short description**: copy from `src/manifest.json` (`description` field)
   - **Detailed description**: paste from `docs/store/description.md`
   - **Category**: Productivity
   - **Language**: English (United States)
   - **Store icon**: upload `assets/store-icon-128.png`
   - **Screenshots**: at least one 1280×800. Recommended: open `chrome://extensions/shortcuts`, bind a few Shortcutfy commands, then take a 1280×800 screenshot of that page. Save under `assets/screenshot-1.png` for re-use.
   - **Promo tile** (440×280): upload `assets/promo-tile.png`
   - **Marquee** (1400×560, optional): upload `assets/promo-marquee.png`
5. Permissions / Data usage: fill out using `docs/store/permissions.md`.
6. Click **Submit for review**. Approval typically takes a few hours to a few days.
7. After approval, copy the extension's published URL and the **extension ID** (the long string in the URL, like `gighmmpiobklfepjocnamgkkbiglidom`). You'll need this for automated publishing.

## Subsequent releases (fully automated)

After the first publish, every release is a single command.

### One-time setup: Chrome Web Store API credentials

The release workflow uses the Chrome Web Store API to upload and publish updates. You need 3 secrets and 1 var on the GitHub repo:

1. Follow https://github.com/fregante/chrome-webstore-upload-keys (an interactive script) to obtain:
   - `CWS_CLIENT_ID`
   - `CWS_CLIENT_SECRET`
   - `CWS_REFRESH_TOKEN`
2. Add them as **repository secrets** (Settings → Secrets and variables → Actions → New repository secret).
3. Add the extension ID as a **repository variable** named `CWS_EXTENSION_ID`.

If you skip this setup, the release workflow still runs — it just creates a GitHub Release with the zip attached, and you upload manually.

### Cutting a release

```sh
yarn release patch        # 1.0.0 -> 1.0.1
# or
yarn release minor        # 1.0.0 -> 1.1.0
# or
yarn release major        # 1.0.0 -> 2.0.0

git push origin main --follow-tags
```

`yarn release` does this for you:
- Bumps `version` in `package.json` and `src/manifest.json`
- Runs Prettier on the changed files
- Commits with a Conventional Commits message (`chore(release): vX.Y.Z`)
- Tags `vX.Y.Z`

The push triggers `.github/workflows/release.yml`, which:
1. Lints, type-checks, and builds the project
2. Generates `shortcutfy-X.Y.Z.zip`
3. Creates a GitHub Release with the zip attached and auto-generated notes
4. If `CWS_EXTENSION_ID` is set: uploads the zip to the Chrome Web Store and publishes it

The Web Store still queues each upload for review (a few hours typically). After approval it goes live automatically.
