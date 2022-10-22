function trackZoom() {
	trackWhosTalking && trackWhosTalking("ZOOM");
}

chrome.action.onClicked.addListener((tab) => {
	chrome.scripting.executeScript({
			target: {tabId: tab.id},
			func: trackZoom
		}) 	
})