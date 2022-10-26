const __platform = __MSTEAMS;

function msTeams() {
	var observer = new MutationObserver(function(mutations) {
		mutations.forEach((mutation) => {
			if (mutation.attributeName === "class" && mutation.target.classList.contains("speaking")) {
	            var _speakerId = mutation.target.id;
	            var _nameId = _speakerId.replace("voice","name");
	            var name = document.getElementById(_nameId).getElementsByTagName("span")[0].innerHTML;
				meeting.isTalking(name);
			}
		})
	});

	var participants_list = document.getElementsByTagName("meeting-panel-components")[0];

	if (!!participants_list.classList.contains("hide-meetings-panel")) {
		document.getElementById("roster-button").click();
	}

	var avatars = document.querySelectorAll(".avatar");
	avatars.forEach((node) => {
		observer.observe(node, {attributes : true});
	});
	state.current = "recording";
	meeting.setEnd(((_m, _s, _o) => {
		meeting.getTalkLogTable();
		exportCsv(meeting.getTalkLog());		
		state.current = "";
		observer.disconnect();
	}).bind(null,meeting,state,observer));
	console.info(`[track-whos-talking] Tracking ${__MSTEAMS} call`);
}


