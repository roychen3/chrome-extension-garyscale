const getLocalStore = (key) => {
    return chrome.storage.local.get([key]).then((result) => {
        return result[key]
    });
}

const getCurrentTabId = () => {
    return chrome.tabs.query({ active: true, currentWindow: true }).then((tabs) => {
        const activeTabId = tabs[0].id;
        return activeTabId
    });
}

const sendMessageToCurrentTab = async (action, data) => {
    const tabId = await getCurrentTabId();
    return chrome.tabs.sendMessage(tabId, {
        action,
        data,
    })
}

const handleToggleGrayscale = async (target) => {
    const on = await getLocalStore('toggleGrayscale_on');
    await sendMessageToCurrentTab('action_toggleGrayscale', !on);
    target.textContent = !on ? 'On' : 'Off';
}

const main = async () => {
    const toggleGrayscaleButtonElement = document.createElement('button');
    toggleGrayscaleButtonElement.classList.add = 'toggle-grayscale-button';
    toggleGrayscaleButtonElement.addEventListener('click', function () {
        handleToggleGrayscale(this);
    });

    const on = Boolean(await getLocalStore('toggleGrayscale_on'));
    toggleGrayscaleButtonElement.textContent = on ? 'On' : 'Off';
    document.body.appendChild(toggleGrayscaleButtonElement);
}

main();