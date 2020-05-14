// state = {
//     isMute: false,
//     tabId: 0
// };

chrome.runtime.onMessage.addListener((req, sender, sendResponse) => {
    if (req.message === "clicked") {
        if (req.count === 0) {
            // this.setState({ isMute: true, tabId: req.tab });
            chrome.runtime.sendMessage({ isMute: true, tabId: req.tab });
        }
    }
});