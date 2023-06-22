chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  if (changeInfo.status == 'complete') {
    // Send a message to the content script
    chrome.tabs.sendMessage(tabId, { action: 'manipulateDOM' }, (response) => {
      console.log(response);
    });
    console.log('[changeInfo]', changeInfo);
  }
});
