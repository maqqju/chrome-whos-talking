const state = {current : ""};
const meeting = new Meeting();
const __MSTEAMS = "MSTEAMS";
const __ZOOM = "ZOOM";


function exportCsv(meetingTalkLog) {
	var csvContent = "data:text/csv;charset=utf-8,"+"Speaker,Time (mins)\n"+meetingTalkLog.map((_l) => `${_l.speaker},${(_l.stop-_l.start)/60000}`).join("\n");
	var link = document.createElement("a");
	var encodedUriCsv = encodeURI(csvContent);
	link.setAttribute("href",encodedUriCsv);
	link.setAttribute("download",`${__platform}-talk-log-export${Date.now()}.csv`);
	document.body.appendChild(link);
	link.click();
	console.info("[track-whos-talking] Talk Log Export Complete");
}

function trackWhosTalking(_platform) {
	if (!_platform) {
		console.log("[track-whos-talking] VOIP Platform left empty");
		return;
	}

	if (state.current === "recording") {
		meeting.endMeeting();
		return;
	} else {
		switch (_platform) {
			case __ZOOM : 
				zoom()
				break;
			case __MSTEAMS : 
				msTeams()
				break;
			default : 
				console.log(`[track-whos-talking] Could not identify platform ${_platform}`);
		}
	}


}
console.info("[track-whos-talking] Script Loaded");