# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Shortcutfy is a Chrome (Manifest V3) extension that registers a service worker which listens to `chrome.commands.onCommand` and dispatches keyboard shortcuts to handlers that drive tabs, windows, and `chrome://` pages. There is no UI — the extension is configured via Chrome's built-in shortcuts page (`chrome://extensions/shortcuts`).

## Commands

- `yarn build` — `tsc` compiles `src/` to `dist/`. Load `dist/` as an unpacked extension in a Chromium browser.
- `yarn start:dev` — `tsc -w` for incremental rebuilds while iterating.
- `yarn lint` / `yarn format` / `yarn style` — ESLint 9 flat config (`eslint.config.mjs` — `@eslint/js` recommended + `typescript-eslint` recommended-type-checked + Prettier), Prettier on its own, and both together.
- `yarn build:commands` — runs `src/build-manifest-commands.ts` via `tsx`. **Writes back to `src/manifest.json`** (not to `dist/`), regenerating the `commands` block from the `Command` enum + `commandDefinitions` map. The output is `JSON.stringify`-formatted (not Prettier-formatted), so follow this with `yarn format` before committing. Run this after adding a new command so the source manifest stays in sync.
- No real test suite — `yarn test` is a placeholder that exits 0 (the `pre-push` hook runs it).

Husky hooks: `pre-commit` runs `lint-staged` (eslint + prettier), `commit-msg` runs commitlint (Conventional Commits), `pre-push` runs `yarn test`.

## Architecture

The flow is intentionally flat — there is one entry point and three layers:

1. **`src/service-worker.ts`** — the MV3 background service worker. It owns a single `commandHandlers` object that maps `Command` enum values to handler functions, and registers one `chrome.commands.onCommand` listener that looks up and invokes the handler. Adding a new shortcut means: (a) add an entry to the `Command` enum, (b) add a handler (usually in `src/helpers/`), (c) wire it into `commandHandlers`, (d) add the command to `src/manifest.json` (or run `yarn build:commands`).

2. **`src/helpers/`** — the handlers. Each is an `async () => void` that performs one user-facing action. `tab.ts` covers tab navigation/manipulation and uses `runOnCurrentTab` to fetch the active tab before acting. `browser-url.ts` is a set of trivial `chrome.tabs.create({ url: 'chrome://...' })` wrappers. `window.ts` covers new-window commands. `misc.ts` holds shared utilities like `adjustPosition` (wrap-around index math used for tab cycling and bounded-range moves involving pinned tabs).

3. **`src/facades/`** — `TabFacade` is a thin static class that wraps the raw `chrome.tabs.*` API surface used by the helpers (`currentTab`, `currentWindowTabs`, `currentWindowPinnedTabs`, `highlightTab`, `moveTab`). New code that touches `chrome.tabs` should generally go through this facade rather than calling the API directly, to keep helpers easy to read.

### Manifest is the source of truth, but duplicated

The set of commands is declared in three places that must stay aligned:
- `src/manifest.json` `commands` — what Chrome registers.
- `src/enums/index.ts` `Command` — the string keys used in code.
- `src/service-worker.ts` `commandHandlers` — the dispatch table.

`src/build-manifest-commands.ts` exists to regenerate the manifest's `commands` from a single source list, but it must be run manually (`yarn build:commands`) and writes to `src/manifest.json`.

### Module system quirk

`package.json` has `"type": "module"` and `tsconfig` uses `module: ESNext` with `moduleResolution: Node`. Imports inside `src/` use **explicit `.js` extensions** even though the source files are `.ts` (e.g. `from './enums/index.js'`). This is required for ESM resolution at runtime in the service worker — preserve this convention when adding new imports.

## Package manager

Yarn 4 (Berry) with `nodeLinker: node-modules` (configured in `.yarnrc.yml`) — PnP is intentionally disabled to keep tooling (`tsx`, ESLint plugin resolution) on the well-trodden path of a real `node_modules` tree.
