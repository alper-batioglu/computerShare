if ('serviceWorker' in navigator) {
  const x = navigator.serviceWorker.register('sworker2.js');
  x.then(registration => {
    console.log(registration);
  });

  navigator.serviceWorker.ready.then((registration) => {
    navigator.serviceWorker.controller.postMessage({
      type: 'MESSAGE_IDENTIFIER',
    });
    // At this point, a Service Worker is controlling the current page
  });
  navigator.serviceWorker.onmessage = (event) => {
    if (event.data && event.data.type === 'hadi') {
      console.log("geldi hadi");
      if (confirm("yeni version devrede, update edelim mi")) {
        setTimeout(() => { window.location.reload() }, 100);
      }
    }
  };
}

document.querySelector('#show').addEventListener('click', () => {
  const iconUrl = document.querySelector('select').selectedOptions[0].value;
  let imgElement = document.createElement('img');
  imgElement.src = iconUrl;
  document.querySelector('#container').appendChild(imgElement);
});