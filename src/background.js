let clickCount = 0, filePath;
chrome.runtime.onInstalled.addListener(() => {
    chrome.browserAction.onClicked.addListener(tab => {
        chrome.tabs.sendMessage(tab.id, {message: "clicked", tab: tab.id, count: clickCount++ });
        chrome.runtime.onMessage.addListener((req, sender, sendResponse) => {
            if (req.isMute) 
                filePath = "src/scripts/mute.js";
            if (!req.isMute)
                filePath = "src/scripts/unmute.js";

            chrome.tabs.executeScript(req.tabId, {
                file:  filePath
            });
        });        
    })
});