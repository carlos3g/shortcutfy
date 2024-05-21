import fs from 'fs/promises';
import path from 'path';
import { Command } from './enums';
import manifest from './manifest.json';

const commandDefinitions = {
  [Command.TabPrevious]: { description: 'Select previous tab' },
  [Command.TabNext]: { description: 'Select next tab' },
  [Command.TabMoveToPrevious]: { description: 'Move current tab left' },
  [Command.TabMoveToNext]: { description: 'Move current tab right' },
  [Command.TabMoveToFirst]: { description: 'Move current tab to first' },
  [Command.TabMoveToLast]: { description: 'Move current tab to last' },
  [Command.TabReload]: { description: 'Reload tab' },
  [Command.TabDuplicate]: { description: 'Duplicate current tab' },
  [Command.TabPin]: { description: 'Pin / Unpin current tab' },
  [Command.TabMute]: { description: 'Mute / Unmute current tab' },
  [Command.TabClose]: { description: 'Close current tab' },
  [Command.TabCreateNew]: { description: 'Create new tab' },
  [Command.TabGoBack]: { description: 'Go back' },
  [Command.TabGoForward]: { description: 'Go forward' },
  [Command.WindowNew]: { description: 'Create new window' },
  [Command.WindowNewIncognito]: { description: 'Create new incognito window' },
  [Command.OpenExtensions]: { description: 'Open Extensions' },
  [Command.OpenExtensionsShortcuts]: { description: 'Open Extension Shortcuts' },
  [Command.OpenDownloads]: { description: 'Open Chrome Downloads' },
  [Command.OpenSettings]: { description: 'Open Chrome Settings' },
  [Command.OpenHistory]: { description: 'Open Chrome History' },
  [Command.OpenBookmarks]: { description: 'Open Chrome Bookmarks' },
  [Command.OpenHelp]: { description: 'Open Chrome Help' },
  [Command.OpenFlags]: { description: 'Open Chrome Flags' },
  [Command.TabNewInGroup]: { description: 'Create new tab in current group' },
};

const buildManifestCommands = async () => {
  Object.assign(manifest.commands, commandDefinitions);

  await fs.writeFile(path.join(__dirname, 'manifest.json'), JSON.stringify(manifest, null, 2));
};

void buildManifestCommands();
