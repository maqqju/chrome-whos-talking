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

	var observer;
	if (state.current === "recording") {
		meeting.endMeeting();
		return;
	} else {
		switch (_platform) {
			case __ZOOM : 
				observer = zoom();
				break;
			case __MSTEAMS : 
				observer = msTeams();
				break;
			default : 
				console.log(`[track-whos-talking] Could not identify platform ${_platform}`);
		}

		if (!!observer) {
			meeting.setEnd(((_m, _s, _o) => {
				meeting.getTalkLogTable();
				exportCsv(meeting.getTalkLog());		
				state.current = "";
				observer.disconnect();
			}).bind(null,meeting,state,observer));
		}
	}



}
console.info("[track-whos-talking] Script Loaded");
