export const openExtensions = async () => {
  await chrome.tabs.create({
    url: 'chrome://extensions',
  });
};

export const openExtensionsShortcuts = async () => {
  await chrome.tabs.create({
    url: 'chrome://extensions/shortcuts',
  });
};

export const openDownloads = async () => {
  await chrome.tabs.create({
    url: 'chrome://downloads',
  });
};

export const openSettings = async () => {
  await chrome.tabs.create({
    url: 'chrome://settings',
  });
};

export const openHistory = async () => {
  await chrome.tabs.create({
    url: 'chrome://history',
  });
};

export const openBookmarks = async () => {
  await chrome.tabs.create({
    url: 'chrome://bookmarks',
  });
};

export const openHelp = async () => {
  await chrome.tabs.create({
    url: 'chrome://help',
  });
};

export const openFlags = async () => {
  await chrome.tabs.create({
    url: 'chrome://flags',
  });
};
