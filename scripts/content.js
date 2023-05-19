const getLocalStore = (key) => {
  return chrome.storage.local.get([key]).then((result) => {
      return result[key]
  });
}

const setLocalStore = (key, value) => {
  return chrome.storage.local.set({ [key]: value })
}

const toggleGrayscaleAction = (on) => {
  setLocalStore('toggleGrayscale_on', on)
  const html = document.querySelector('html');
  if (on) {
    html.style.filter = 'grayscale(100%)';
  } else {
    html.style.filter = '';
  }
}

const main = async () => {
  const on = Boolean(await getLocalStore('toggleGrayscale_on'));
  toggleGrayscaleAction(on);

  chrome.runtime.onMessage.addListener(function (message) {
    switch (message.action) {
      case 'action_toggleGrayscale':
        toggleGrayscaleAction(message.data);
        break;

      default:
        break;
    }
  });
}

main();