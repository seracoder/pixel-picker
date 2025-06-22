chrome.runtime.onInstalled.addListener(() => {
  console.log('Color Picker Pro extension installed')
})

// Handle extension icon click
// chrome.action.onClicked.addListener((tab) => {
//   console.log('Extension icon clicked')
// })

// Handle messages from content script or popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'getTabInfo') {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs[0]) {
        sendResponse({ 
          url: tabs[0].url,
          title: tabs[0].title 
        })
      }
    })
    return true
  }
})