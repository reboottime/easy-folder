import Message, { MESSAGE_ACTIONS } from "@utils/message";

class Bridge {
  constructor() {
    this.trackDeepSeekHelper();
  }

  private trackDeepSeekHelper = () => {
    // Listen for tab updates (when page loads or URL changes)
    chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
      if (changeInfo.status === 'complete' && tab.url) {
        this.handleDeepSeekHelper(tabId, tab.url);
      }
    });

    // Listen for tab activation (when user switches between tabs)
    chrome.tabs.onActivated.addListener(async (activeInfo) => {
      const tab = await chrome.tabs.get(activeInfo.tabId);
      if (tab.url) {
        this.handleDeepSeekHelper(activeInfo.tabId, tab.url);
      }
    });
  };

  private handleDeepSeekHelper = async (tabId: number, url: string) => {
    const shouldShow = this.isValidDeepSeekSession(url);

    try {
      await chrome.tabs.sendMessage(tabId, new Message(
        MESSAGE_ACTIONS.TOGGLE_DEEPSEEK_HELPER,
        { isVisible: shouldShow }
      ));
    } catch (error) {
    }
  };

  private isValidDeepSeekSession = (url: string): boolean => {
    try {
      const urlObj = new URL(url);
      return urlObj.hostname === 'chat.deepseek.com';
    } catch (error) {
      return false;
    }
  };
}

new Bridge();