window.addEventListener('message', (event) => {
  console.log(event)
  if (event.source !== window) return
  if (event.data.type === 'SUI_WALLET_POPUP_REQUEST') {
    chrome.runtime.sendMessage({
      type: 'SHOW_SUI_WALLET_POPUP',
      payload: event.data.payload,
    })
  }
})
