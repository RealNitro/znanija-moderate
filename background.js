chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status == "complete") {
        if (tab.url.startsWith("https://znanija.com")) {
            chrome.scripting.insertCSS({
                target: {
                    tabId: tabId
                },
                files: ["dark_theme.css"]
            })
        }
    }
})