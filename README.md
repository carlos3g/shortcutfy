# Shortcutfy

A Chromium browser extension that gives you customizable keyboard shortcuts for everyday tab, window, and navigation actions — the ones the browser doesn't ship with out of the box (move tab to first/last, create a new tab inside the current tab group, open `chrome://flags`, and so on).

Built as a Manifest V3 service worker. No UI, no tracking, no permissions beyond what's needed to manipulate tabs.

## Features

### Tabs

- Select previous / next tab (with wrap-around)
- Move current tab left / right (respects pinned-tab boundary)
- Move current tab to first / last position
- Reload, duplicate, pin/unpin, mute/unmute, close
- Create a new tab
- Create a new tab inside the current tab group
- Go back / go forward in tab history

### Windows

- New window
- New incognito window

### Quick links to internal pages

- `chrome://extensions`
- `chrome://extensions/shortcuts`
- `chrome://downloads`
- `chrome://settings`
- `chrome://history`
- `chrome://bookmarks`
- `chrome://help`
- `chrome://flags`

## Install (from source)

1. Clone the repository and install dependencies:

   ```sh
   yarn install
   ```

2. Build the extension:

   ```sh
   yarn build
   ```

3. Open your Chromium-based browser (Chrome, Edge, Brave, Arc, etc.) and go to `chrome://extensions`.
4. Enable **Developer mode**.
5. Click **Load unpacked** and select the generated `dist/` folder.

## Configure shortcuts

Chrome does not let extensions ship default key bindings, so every command starts unbound. To assign keys:

1. Open `chrome://extensions/shortcuts` (Shortcutfy itself can open this page once you bind the `open-extensions-shortcuts` command).
2. Find **Shortcutfy** in the list and assign whatever combinations you want to each command.

## Development

Requires Node.js (LTS — see `.nvmrc`) and Yarn 4.

| Script                | What it does                                                                  |
| --------------------- | ----------------------------------------------------------------------------- |
| `yarn build`          | Compiles `src/` to `dist/` with `tsc`. Output is the loadable extension.      |
| `yarn start:dev`      | `tsc -w` — incremental rebuilds while you iterate.                            |
| `yarn lint`           | Runs ESLint with `--fix` over the source.                                     |
| `yarn format`         | Runs Prettier over `src/**/*.ts`.                                             |
| `yarn style`          | `yarn format && yarn lint` in one shot.                                       |
| `yarn build:commands` | Regenerates the `commands` block in `src/manifest.json` from the code source. |

After `yarn build`, reload the extension in `chrome://extensions` to pick up changes.

### Adding a new shortcut

The extension keeps the command list in three synchronized places. To add a command:

1. Add an entry to the `Command` enum in `src/enums/index.ts`.
2. Implement the handler (usually in `src/helpers/`) and re-export it from `src/helpers/index.ts`.
3. Wire it into `commandHandlers` in `src/service-worker.ts`.
4. Add a description for it in `commandDefinitions` inside `src/build-manifest-commands.ts`, then run `yarn build:commands` to update `src/manifest.json`.

### Project layout

```
src/
├── service-worker.ts          # MV3 background entry — registers chrome.commands listener
├── manifest.json              # Extension manifest (declares commands)
├── build-manifest-commands.ts # Regenerates manifest.commands from source
├── enums/                     # Command enum (single source of truth for command keys)
├── facades/                   # Thin wrappers around chrome.tabs.* used by helpers
└── helpers/                   # Command handlers — tabs, windows, browser-url shortcuts
```

### Commits

This repository uses [Conventional Commits](https://www.conventionalcommits.org/), enforced by `commitlint` + a Husky `commit-msg` hook. `pre-commit` runs `lint-staged` (ESLint + Prettier) on touched files.

## License

MIT — see `package.json`.
