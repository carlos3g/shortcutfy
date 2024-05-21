export class TabFacade {
  public static async currentTab(): Promise<chrome.tabs.Tab> {
    const [currentTab] = await chrome.tabs.query({ active: true, currentWindow: true });

    return chrome.tabs.get(currentTab.id!);
  }

  public static async currentWindowTabs(): Promise<chrome.tabs.Tab[]> {
    return chrome.tabs.query({ currentWindow: true });
  }

  public static async currentWindowPinnedTabs(): Promise<chrome.tabs.Tab[]> {
    return chrome.tabs.query({ pinned: true, currentWindow: true });
  }

  public static async highlightTab(position: number): Promise<void> {
    await chrome.tabs.highlight({
      tabs: position,
    });
  }

  public static async moveTab(id: number, position: number): Promise<void> {
    await chrome.tabs.move(id, {
      index: position,
    });
  }
}
