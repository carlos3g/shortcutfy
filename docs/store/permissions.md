# Permission justifications (paste into Chrome Web Store devconsole)

## activeTab justification
Used to read the index, pinned state, mute state, and group ID of the currently focused tab so the extension can move, mute, pin, duplicate, close, reload, or group it when the user triggers a shortcut. No URL, title, favicon, or page content is accessed.

## tabGroups justification
Used to read the active tab's group ID so the "New tab in current group" command can place the newly created tab in the same group. The extension does not modify or read the contents of other groups.

## Single purpose description
Provides user-configurable keyboard shortcuts for navigating Chromium browsers without using the mouse. Every command in the extension is a target for a keyboard binding the user assigns at chrome://extensions/shortcuts; the extension has no UI and performs no behavior outside of dispatching those shortcuts. Tab actions, window actions, and links to built-in chrome:// pages are different shortcut targets that all share the same single purpose: keyboard-driven navigation.

## Data usage disclosures (check these on the form)
- [x] I do not collect or use user data
- [x] I am not selling user data to third parties
- [x] I am not using or transferring user data for purposes unrelated to my item's single purpose
- [x] I am not using or transferring user data to determine creditworthiness or for lending purposes

## Remote code
- [x] No, I am not using remote code (the extension only ships compiled JS bundled in dist/, no eval/CDN scripts)
