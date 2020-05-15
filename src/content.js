function tabIdExist(history, tabId) {
    let found = history.find(element => element.tabId === tabId);
    if (found !== undefined) return true;
    return false;
}

function toggleMute(history, tabId) {
    let index = history.findIndex(element => element.tabId === tabId);
    if (history[index].isMute) {
        history[index].isMute = false;
    } else {
        history[index].isMute = true;
    }
    return history;
}

function fetchParticularTab(history, tabId) {
    return history.find(element => element.tabId === tabId);
}

chrome.runtime.onMessage.addListener((req, sender, sendResponse) => {
    if (req.message === "clicked") {
        if (req.count === 0) chrome.storage.sync.set({ history: [] });
        chrome.storage.sync.get(["history"], result => {
            if (!result.history.length) {
                result.history[0] = { isMute: true, tabId: req.tab };   
                chrome.storage.sync.set({ history: result.history });
            } else {
                if (tabIdExist(result.history, req.tab)) {
                    let arr = toggleMute(result.history, req.tab);
                    chrome.storage.sync.set({ history: arr });
                } else {
                    result.history.push({ isMute: true, tabId: req.tab });
                    chrome.storage.sync.set({ history: result.history });
                }
            }

            console.log(result.history);
            let detailsTab = fetchParticularTab(result.history, req.tab);
            chrome.runtime.sendMessage(detailsTab);
        });
    }
});