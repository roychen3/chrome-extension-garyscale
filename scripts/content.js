const toggleGrayscaleAction = (on) => {
  const html = document.querySelector('html');
  if (on) {
    html.style.filter = 'grayscale(100%)';
  } else {
    html.style.filter = '';
  }
}

const main = async () => {
  const on = await getLocalStore('toggleGrayscale_on').catch(() => false);
  toggleGrayscaleAction(on);

  chrome.runtime.onMessage.addListener(function (message) {
    switch (message.action) {
      case 'toggleGrayscale':
        toggleGrayscaleAction(message.data);
        break;

      default:
        break;
    }
  });
}

main();