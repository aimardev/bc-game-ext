function injectJs(link, inHead = false) {
  const script = document.createElement('script');
  script.type = 'text/javascript';
  script.src = link;

  document.getElementsByTagName('body')[0].appendChild(script);
}

function injectCSS(link) {
  const style = document.createElement('link');
  style.href = link;
  style.rel = 'stylesheet';
  document.getElementsByTagName('head')[0].appendChild(style);
}

async function main() {
  injectCSS(chrome.runtime.getURL('bootstrap.min.css'));
  injectJs(chrome.runtime.getURL('inject.js'));
}

document.addEventListener('DOMContentLoaded', main, false);
