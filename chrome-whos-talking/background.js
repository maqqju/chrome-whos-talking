function startTracking() {
	trackWhosTalking && trackWhosTalking(__platform);
}

chrome.action.onClicked.addListener((tab) => {
	chrome.scripting.executeScript({
			target: {tabId: tab.id},
			func: startTracking
		}) 	
})