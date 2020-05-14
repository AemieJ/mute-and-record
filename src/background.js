chrome.runtime.onInstalled.addListener(() => {
    chrome.browserAction.onClicked.addListener(tab => {
        chrome.tabs.sendMessage(tab.id, {message: "clicked", tab: tab.id, count: 0});
        chrome.runtime.onMessage.addListener((req, sender, sendResponse) => {
            if (req.isMute === true) {
                chrome.storage.sync.set({ filePath: "src/scripts/mute.js" });
            }
        });
        
        chrome.storage.sync.get(["filePath"], result => {
            chrome.tabs.executeScript(tab.id, {
                file: result.filePath
            });
        });
        
    })
});