chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg.type === 'SHOW_SUI_WALLET_POPUP') {
    chrome.windows.create({
      url: chrome.runtime.getURL('popup.html') + '?action=' + msg.payload.action,
      type: 'popup',
      width: 360,
      height: 600,
    })
  }
})
