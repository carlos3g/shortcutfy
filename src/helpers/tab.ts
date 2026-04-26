import { adjustPosition } from './misc.js';
import { TabFacade } from '../facades/index.js';

type TabWithId = chrome.tabs.Tab & { id: number };

export const runOnCurrentTab = async (callback: (tab: TabWithId) => Promise<void>) => {
  const currentTab = await TabFacade.currentTab();

  if (!currentTab?.id) return;

  await callback(currentTab as TabWithId);
};

export const selectTab = async (position: number) => {
  const tabs = await TabFacade.currentWindowTabs();

  await TabFacade.highlightTab(adjustPosition(position, tabs.length));
};

export const moveTab = async (tab: TabWithId, position: number) => {
  const pinnedTabs = await TabFacade.currentWindowPinnedTabs();
  const tabs = await TabFacade.currentWindowTabs();
  const offset = !tab.pinned ? pinnedTabs.length : 0;
  const limit = tab.pinned ? pinnedTabs.length : undefined;

  await TabFacade.moveTab(tab.id, adjustPosition(position, tabs.length, offset, limit));
};

export const previousTab = async () => {
  await runOnCurrentTab(async (tab) => {
    await selectTab(tab.index - 1);
  });
};

export const nextTab = async () => {
  await runOnCurrentTab(async (tab) => {
    await selectTab(tab.index + 1);
  });
};

export const moveToPreviousTab = async () => {
  await runOnCurrentTab(async (tab) => {
    await moveTab(tab, tab.index - 1);
  });
};

export const moveToNextTab = async () => {
  await runOnCurrentTab(async (tab) => {
    await moveTab(tab, tab.index + 1);
  });
};

export const moveToFirstTab = async () => {
  await runOnCurrentTab(async (tab) => {
    await chrome.tabs.move(tab.id, { index: 0 });
  });
};

export const moveToLastTab = async () => {
  await runOnCurrentTab(async (tab) => {
    await chrome.tabs.move(tab.id, { index: -1 });
  });
};

export const reloadTab = async () => {
  await runOnCurrentTab(async (tab) => {
    await chrome.tabs.reload(tab.id);
  });
};

export const duplicateTab = async () => {
  await runOnCurrentTab(async (tab) => {
    await chrome.tabs.duplicate(tab.id);
  });
};

export const pinTab = async () => {
  await runOnCurrentTab(async (tab) => {
    await chrome.tabs.update(tab.id, { pinned: !tab.pinned });
  });
};

export const muteTab = async () => {
  await runOnCurrentTab(async (tab) => {
    await chrome.tabs.update(tab.id, { muted: !tab.mutedInfo?.muted });
  });
};

export const closeTab = async () => {
  await runOnCurrentTab(async (tab) => {
    await chrome.tabs.remove(tab.id);
  });
};

export const createNewTab = async () => {
  await chrome.tabs.create({});
};

export const tabGoBack = async () => {
  await runOnCurrentTab(async (tab) => {
    await chrome.tabs.goBack(tab.id);
  });
};

export const tabGoForward = async () => {
  await runOnCurrentTab(async (tab) => {
    await chrome.tabs.goForward(tab.id);
  });
};

export const newTabInGroup = async () => {
  await runOnCurrentTab(async (tab) => {
    const newTab = await chrome.tabs.create({ index: tab.index + 1 });

    if (!newTab.id || tab.groupId === chrome.tabGroups.TAB_GROUP_ID_NONE) return;

    await chrome.tabs.group({
      tabIds: newTab.id,
      groupId: tab.groupId,
    });
  });
};
