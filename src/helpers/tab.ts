import { adjustPosition } from './misc.js';
import { TabFacade } from '../facades/index.js';

export const runOnCurrentTab = async (callback: (tab: chrome.tabs.Tab) => void) => {
  const currentTab = await TabFacade.currentTab();

  callback(currentTab);
};

export const selectTab = async (position: number) => {
  const tabs = await TabFacade.currentWindowTabs();

  await TabFacade.highlightTab(adjustPosition(position, tabs.length));
};

export const moveTab = async (tab: chrome.tabs.Tab, position: number) => {
  const pinnedTabs = await TabFacade.currentWindowPinnedTabs();
  const tabs = await TabFacade.currentWindowTabs();
  const offset = !tab.pinned ? pinnedTabs.length : 0;
  const limit = tab.pinned ? pinnedTabs.length : undefined;

  await TabFacade.moveTab(tab.id!, adjustPosition(position, tabs.length, offset, limit));
};

export const previusTab = async () => {
  await runOnCurrentTab(async (tab: chrome.tabs.Tab) => {
    await selectTab(tab.index - 1);
  });
};

export const nextTab = async () => {
  await runOnCurrentTab(async (tab: chrome.tabs.Tab) => {
    await selectTab(tab.index + 1);
  });
};

export const moveToPreviousTab = async () => {
  await runOnCurrentTab(async (tab: chrome.tabs.Tab) => {
    await moveTab(tab, tab.index - 1);
  });
};

export const moveToNextTab = async () => {
  await runOnCurrentTab(async (tab: chrome.tabs.Tab) => {
    await moveTab(tab, tab.index + 1);
  });
};

export const moveToFirstTab = async () => {
  await runOnCurrentTab(async (tab: chrome.tabs.Tab) => {
    await chrome.tabs.move(tab.id!, {
      index: 0,
    });
  });
};

export const moveToLastTab = async () => {
  await runOnCurrentTab(async (tab: chrome.tabs.Tab) => {
    await chrome.tabs.move(tab.id!, {
      index: -1,
    });
  });
};

export const reloadTab = async () => {
  await runOnCurrentTab(async (tab: chrome.tabs.Tab) => {
    await chrome.tabs.reload(tab.id!);
  });
};

export const duplicateTab = async () => {
  await runOnCurrentTab(async (tab: chrome.tabs.Tab) => {
    await chrome.tabs.duplicate(tab.id!);
  });
};

export const pinTab = async () => {
  await runOnCurrentTab(async (tab: chrome.tabs.Tab) => {
    await chrome.tabs.update(tab.id!, {
      pinned: !tab.pinned,
    });
  });
};

export const muteTab = async () => {
  await runOnCurrentTab(async (tab: chrome.tabs.Tab) => {
    await chrome.tabs.update(tab.id!, {
      muted: !tab.mutedInfo?.muted,
    });
  });
};

export const closeTab = async () => {
  await runOnCurrentTab(async (tab: chrome.tabs.Tab) => {
    await chrome.tabs.remove(tab.id!);
  });
};

export const createNewTab = async () => {
  await chrome.tabs.create({});
};

export const tabGoBack = async () => {
  await runOnCurrentTab(async (tab: chrome.tabs.Tab) => {
    await chrome.tabs.goBack(tab.id!);
  });
};

export const tabGoForward = async () => {
  await runOnCurrentTab(async (tab: chrome.tabs.Tab) => {
    await chrome.tabs.goForward(tab.id!);
  });
};

export const newTabInGroup = async () => {
  await runOnCurrentTab(async (tab: chrome.tabs.Tab) => {
    const newTab = await chrome.tabs.create({
      index: tab.index + 1,
    });

    await chrome.tabs.group({
      tabIds: newTab.id,
      groupId: tab.groupId,
    });
  });
};
