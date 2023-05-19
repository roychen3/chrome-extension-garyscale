const getLocalStore = (key) => {
    return chrome.storage.local.get([key]).then((result) => {
        return result[key]
    });
}

chrome.tabs.onActivated.addListener(async (activeInfo) => {
    const on = Boolean(await getLocalStore('toggleGrayscale_on'))
    chrome.tabs.sendMessage(activeInfo.tabId, {
        action: 'action_toggleGrayscale',
        data: on,
    }).catch((error) => {
        console.log('error: ', error)
    })
});

