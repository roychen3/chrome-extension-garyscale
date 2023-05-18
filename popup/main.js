const toggleGrayscale = async (target) => {
    const on = await getLocalStore('toggleGrayscale_on').catch(() => false);
    sendMessageToContentScript('toggleGrayscale', !on);
    setLocalStore('toggleGrayscale_on', !on)
    target.textContent = !on ? 'On' : 'Off';
}

const main = async () => {
    const toggleGrayscaleButtonElement = document.createElement('button');
    toggleGrayscaleButtonElement.classList.add = 'toggle-grayscale-button';
    toggleGrayscaleButtonElement.addEventListener('click', function () {
        toggleGrayscale(this);
    });

    const on = await getLocalStore('toggleGrayscale_on').catch(() => false);
    toggleGrayscaleButtonElement.textContent = on ? 'On' : 'Off';
    document.body.appendChild(toggleGrayscaleButtonElement);
}

main();