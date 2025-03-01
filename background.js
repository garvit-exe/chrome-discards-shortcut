chrome.action.onClicked.addListener((tab) => {
    // First, check if any tab already has chrome://discards/ open.
    chrome.tabs.query({ url: "chrome://discards/*" }, (tabs) => {
        if (tabs.length > 0) {
            // If found, focus the first matching tab.
            chrome.tabs.update(tabs[0].id, { active: true });
            chrome.windows.update(tabs[0].windowId, { focused: true });
        } else {
            // If no discards page is open, check the current tab's URL.
            if (
                (tab.url && tab.url.startsWith("chrome://newtab")) ||
                (tab.url && tab.url.startsWith("chrome://discards"))
            ) {
                // If on the new tab page or already on discards, update the same tab.
                chrome.tabs.update(tab.id, { url: "chrome://discards/" });
            } else {
                // Otherwise, open chrome://discards/ in a new tab.
                chrome.tabs.create({ url: "chrome://discards/" });
            }
        }
    });
});
