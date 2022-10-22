/**
 * A class that helps you keep track of who's talking during a meeting.
 *
 * 
 * @param {attendees : array}
 */
function Meeting(attendees) {
    const LOG_TEMPLATE = {speaker : "", start : null, stop : null};

    this._attendees = attendees || [];
    this._talkLog = [];
    this._currentTalk = {speaker : "", start : null, stop : null};
    this._meetingEnd;


    /**
     * Provided with the name of who is talking, this function logs the 
     * time of when someone started talking during a meeting
     * 
     * @param  {n : String}
     */
    this.isTalking = function(n) {
        var _time = this._stopTalking();

        this._currentTalk.speaker = n;
        this._currentTalk.start = _time;
        
        console.log(`${n} is now talking`);
    }

    /**
     * This internal function is used to log someone who stopped talking.
     * 
     * @return {_t : Date}
     */
    this._stopTalking = function() {
        var _t = Date.now();
        if (this._currentTalk.speaker) {
            this._currentTalk.stop = _t;
            this._talkLog.push(Object.assign({},this._currentTalk));
            console.log(`${this._currentTalk.speaker} stopped talking`)
        }
        this._currentTalk = Object.assign({},LOG_TEMPLATE);
        return _t;
    }

    /**
     * When there is silence during the meeting, this function stops all talking.
     * 
     */
    this.silence = function() {
        this._stopTalking();
    }

    
    /**
     * Records when the meeting has ended
     */
    this.endMeeting = function() {
        this._meetingEnd = this._stopTalking();
        console.log(`Meeting stopped at ${this._meetingEnd}`);
    }

    this.getAttendees = function() {
        return this._attendees;
    }

    this.getTalkLogTable = function() {
        return console.table(this._talkLog);
    }

    this.getTalkLog = function() {
        return this._talkLog;
    }
}