const __platform = __ZOOM;

function zoom() {
	const config = { attributes: true, childList: true, subtree: true };

	const observer = new MutationObserver((mutationList, _obs) => {
		for (const mutation of mutationList) {
			if (mutation.addedNodes) {
				mutation.addedNodes.forEach((n) => {
					if(n.classList && n.classList.contains("participants-icon__voip-speaking-icon")) {
	                    const parentContainer = n.parentElement.parentElement.parentElement.parentElement;
	                    const name = parentContainer.querySelector(".participants-item__display-name").innerHTML;
	                    meeting.isTalking(name);
					}
				})
			}

			if (mutation.removedNodes) {
				mutation.removedNodes.forEach((n) => {
					if(n.classList && n.classList.contains("participants-icon__voip-speaking-icon")) {
						meeting.silence();
					}
				})
			}
		}});

	var participants_list = document.getElementById("participants-ul");

	if (!participants_list) {
		var footerButtons = document.getElementsByClassName("footer-button-base__button ax-outline footer-button__button");
		if(!!footerButtons.length) {
			// opens the participant list panel
			footerButtons[0].click();
		} else {
			console.error("[track-whos-talking] This is not a zoom call.")
			return;
		}
	}

	observer.observe(document.getElementById("participants-ul"),config);
	state.current = "recording";
	meeting.setEnd(((_m, _s, _o) => {
		meeting.getTalkLogTable();
		exportCsv(meeting.getTalkLog());		
		state.current = "";
		observer.disconnect();
	}).bind(null,meeting,state,observer));
	console.info(`[track-whos-talking] Tracking ${__ZOOM} call`);
}

console.info(`[track-whos-talking] ${__ZOOM} Script Loaded`);
