import { Command } from './enums/index.js';
import {
  closeTab,
  createNewTab,
  duplicateTab,
  moveToFirstTab,
  moveToLastTab,
  moveToNextTab,
  moveToPreviousTab,
  muteTab,
  newIncognitoWindow,
  newTabInGroup,
  newWindow,
  nextTab,
  openBookmarks,
  openDownloads,
  openExtensions,
  openExtensionsShortcuts,
  openFlags,
  openHelp,
  openHistory,
  openSettings,
  pinTab,
  previusTab,
  reloadTab,
  tabGoBack,
  tabGoForward,
} from './helpers/index.js';

type CommandKeys = keyof typeof Command;

const commandHandlers = {
  [Command.TabPrevious]: previusTab,
  [Command.TabNext]: nextTab,
  [Command.TabMoveToPrevious]: moveToPreviousTab,
  [Command.TabMoveToNext]: moveToNextTab,
  [Command.TabMoveToFirst]: moveToFirstTab,
  [Command.TabMoveToLast]: moveToLastTab,
  [Command.TabReload]: reloadTab,
  [Command.TabDuplicate]: duplicateTab,
  [Command.TabPin]: pinTab,
  [Command.TabMute]: muteTab,
  [Command.TabClose]: closeTab,
  [Command.TabCreateNew]: createNewTab,
  [Command.TabNewInGroup]: newTabInGroup,
  [Command.TabGoBack]: tabGoBack,
  [Command.TabGoForward]: tabGoForward,
  [Command.WindowNew]: newWindow,
  [Command.WindowNewIncognito]: newIncognitoWindow,
  [Command.OpenExtensions]: openExtensions,
  [Command.OpenExtensionsShortcuts]: openExtensionsShortcuts,
  [Command.OpenDownloads]: openDownloads,
  [Command.OpenSettings]: openSettings,
  [Command.OpenHistory]: openHistory,
  [Command.OpenBookmarks]: openBookmarks,
  [Command.OpenHelp]: openHelp,
  [Command.OpenFlags]: openFlags,
};

chrome.commands.onCommand.addListener((command) => {
  const handler = commandHandlers[command as CommandKeys];

  if (handler) {
    void handler();
  } else {
    // eslint-disable-next-line no-console
    console.error('Unknown command', command);
  }
});
