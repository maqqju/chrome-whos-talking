const __platform = __GOOGLEMEETS;

function googleMeets() {
  const lastSpeaker = {name : "", time : null};
  function extractName(node) {
      return Array.prototype.slice.call(node.parentNode
                                            .parentNode
                                            .parentNode
                                            .parentNode
                                            .parentNode
                                            .parentNode.querySelectorAll("div:nth-child(1) > div[avatar-tooltip-id]:not(div[avatar-tooltip-id='']) div:nth-child(2) span"))
                                            .map((span) => span.innerText).reduce((acc,span) => acc+=span)
  }

  var observer = new MutationObserver((mutations) => 
    mutations.forEach((mutation) => {
      if (mutation.attributeName === "class") {
        var _name = extractName(mutation.target);
	if (lastSpeaker.name !== _name && lastSpeaker.time >= (Date.now()-2000)) {
	   meeting.isTalking(_name);
	}
      }
    })
  );
	
	var participants_list = document.querySelector("div[avatar-tooltip-id]");

	if (!participants_list) {
		Array.prototype.slice.call(document.getElementsByClassName("google-material-icons")).filter((i) => i.innerText === "people_outline")[0].parentElement.click();
	}

	var avatars = Array.prototype.slice.call(
                document.querySelectorAll("span[aria-label='In call'] > div[role='list'] > div[role='listitem'] > div:nth-child(2) > div[class]:not(div[class='']) > div > div > div > div:nth-child(2)"));
  
	avatars.forEach((node) => {
		observer.observe(node, {attributes : true});
	});
	state.current = "recording";
	
	console.info(`[track-whos-talking] Tracking ${__GOOGLEMEETS} call`);

	return observer;
}


console.info(`[track-whos-talking] ${__GOOGLEMEETS} Script Loaded`);
