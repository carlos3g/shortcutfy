# Long description (paste into Chrome Web Store devconsole)

Shortcutfy is a single-purpose extension that lets you navigate the browser using only your keyboard.

Every command in the extension is a target for a keyboard binding you assign at chrome://extensions/shortcuts. Bind once, then move tabs, mute audio, open chrome://flags, create incognito windows, and more — all without ever touching the mouse. There is no UI. Nothing to learn beyond the keys you choose.

✦ TABS
• Cycle to previous / next tab (with wrap-around at the ends)
• Move the current tab left or right (skipping the pinned-tab boundary)
• Move the current tab to the very first or last position
• Reload, duplicate, pin / unpin, mute / unmute, close
• Open a new tab, or a new tab inside the current tab group
• Go back / forward in tab history

✦ WINDOWS
• Open a new window
• Open a new incognito window

✦ QUICK LINKS
One key to open any of these:
• chrome://extensions
• chrome://extensions/shortcuts
• chrome://downloads
• chrome://settings
• chrome://history
• chrome://bookmarks
• chrome://help
• chrome://flags

✦ PRIVACY
Shortcutfy reads only what it needs to act on the current tab — its position, pin state, mute state, and group ID. It does NOT read tab URLs, page content, or browsing history. It does NOT transmit any data. It has no network access.

The extension declares only two permissions:
• activeTab — to operate on the focused tab when you trigger a shortcut.
• tabGroups — so "New tab in current group" can read the active tab's group.

✦ OPEN SOURCE
Shortcutfy is MIT-licensed and open source: https://github.com/carlos3g/shortcutfy
