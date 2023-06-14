import * as storage from './helper/storage';
const projectId = 'polar-strata-307423';

// Imports the Google Cloud client library

// Instantiates a client

chrome.windows.onCreated.addListener((window) => {
  chrome.runtime.onMessage.addListener(function (
    request,
    sender,
    sendResponse
  ) {
    switch (request.cmd) {
      case 'get_base_url':
        storage.getBaseURL().then((value) => {
          sendResponse(value);
        });
        break;
      case 'get_api_key':
        storage.getApiKey().then((value) => {
          sendResponse(value);
        });
        break;
      default:
        sendResponse(null);
    }

    return true;
  });

  console.log('background.js started');
});
