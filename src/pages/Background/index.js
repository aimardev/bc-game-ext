import * as storage from './helper/storage';
import { scanLink } from './helper/service';
const FSIO_MENU_ID = 'Filescan extension'

chrome.runtime.onInstalled.addListener(function () {
  chrome.contextMenus.create({
    title: `Scan with FileScan.IO Client`,
    contexts: ['link'],
    id: FSIO_MENU_ID
  })

  chrome.tabs.create({
    url: chrome.runtime.getURL('panel.html?tab=setting')
  });
});

function scan_link(info, tab) {
  if (info.menuItemId !== FSIO_MENU_ID) {
    return;
  }

  scanLink(info.linkUrl).then(res => console.log(res))
}

chrome.contextMenus.onClicked.addListener(scan_link);


chrome.windows.onCreated.addListener((window) => {
  chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    switch (request.cmd) {
      case 'get_base_url':
        storage.getBaseURL().then(value => {
          sendResponse(value)
        })
        break
      case 'get_api_key':
        storage.getApiKey().then(value => {
          sendResponse(value)
        })
        break
      default:
        sendResponse(null)
    }

    return true
  });

  console.log('background.js started')
})
