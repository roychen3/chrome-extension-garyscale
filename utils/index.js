const sendMessageToContentScript = (action, data) => {
    // Send a message to the active tab's content script
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        const activeTabId = tabs[0].id;
        chrome.tabs.sendMessage(activeTabId, {
            action,
            data,
        });
    });
}

const setLocalStore = async (key, value) => {
    return new Promise((resolve, reject) => {
        chrome.storage.local.set({ [key]: value }).then(() => {
            resolve(value)
        }).catch((error) => {
            reject(error)
        });
    })
}

const getLocalStore = async (key) => {
    return new Promise((resolve, reject) => {
        chrome.storage.local.get([key]).then((result) => {
            resolve(result[key])
        }).catch((error) => {
            reject(error)
        });
    })
}
