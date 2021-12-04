const startBtn = document.querySelector("#start");
const trackDiv = document.querySelector("#track");
const statsBtn = document.querySelector("#aggregate button");
const statsList = document.querySelector("#aggregate ul");


function addBlock(e) {
    e.preventDefault();

    const block = document.createElement("div");
    block.classList.add("block");
    const trackForm = document.createElement("form");

    const startTime = document.createElement("input");
    startTime.type = "time";
    startTime.required = true;
    startTime.step = "900";

    const endTime = startTime.cloneNode();

    startTime.classList.add("startTime");
    endTime.classList.add("endTime");

    initStartTime(startTime);
    initEndTime(startTime, endTime);

    const trackText = document.createElement("input");
    trackText.type = "text";    
    trackText.classList.add("trackText");

    const submitBlock = document.createElement("button");
    submitBlock.innerText = "추가";
    submitBlock.addEventListener("click", addBlock);

    const checkRestText = document.createElement("label");
    checkRestText.for = "rest";
    checkRestText.innerText = "휴식";
    const checkRest = document.createElement("input");
    checkRest.value = "rest";
    checkRest.type = "checkbox";
    checkRest.addEventListener("change", addRestText);

    trackForm.appendChild(startTime);
    trackForm.appendChild(endTime);
    trackForm.appendChild(trackText);
    trackForm.appendChild(submitBlock);
    trackForm.appendChild(checkRestText);
    trackForm.appendChild(checkRest);
    
    block.appendChild(trackForm);
    trackDiv.appendChild(block);
}

function addRestText(e) {
    e.preventDefault();
    const trackText = e.target.parentNode.querySelector(".trackText");
    if (e.target.checked === true) {
        trackText.value = "휴식";
    }
    else {
        trackText.value = "";
    }
}

function initEndTime(startTime, endTime) {
    // code snippet from
    // https://stackoverflow.com/questions/57179330/add-30min-to-entered-time
    let hours = parseInt(startTime.value.split(':')[0]);
    let minutes = parseInt(startTime.value.split(':')[1]);

    minutes += 30;
    if (minutes >= 60) {
        hours = (hours + 1) % 24;
        minutes -= 60;
    }

    // reformat values as strings with a fix length of 2
    hours = (hours < 10 ? `0${hours}` : `${hours}`);
    minutes = (minutes < 10 ? `0${minutes}` : `${minutes}`);
    
    endTime.value = `${hours}:${minutes}`;
}

function initStartTime(startTime) {
    const allBlocks = document.querySelectorAll(".block");
    if (allBlocks.length === 0) {
        startTime.value = startBtn.firstElementChild.value;
    }
    else {
        const latestTime = allBlocks[allBlocks.length-1].querySelector(".endTime").value;
        startTime.value = latestTime;
    }
}

function getTrackObj() {
    const textBlocks = document.querySelectorAll(".trackText");
    const startTimeBlocks = document.querySelectorAll(".startTime");
    const endTimeBlocks = document.querySelectorAll(".endTime");
    
    let texts = [];
    let startTimes = [];
    let endTimes = [];

    for (let i = 0; i < textBlocks.length; i++) {
        texts.push(textBlocks[i].value);
        startTimes.push(startTimeBlocks[i].value);
        endTimes.push(endTimeBlocks[i].value);
    }

    const intervals = startTimes.map(function(val, i)
    {
        let startSplit = val.split(":");
        let endSplit = endTimes[i].split(":");

        let startDate = new Date(0, 0, 0, startSplit[0],startSplit[1], 0);
        let endDate = new Date(0, 0, 0, endSplit[0],endSplit[1], 0);
        let diffDate = endDate.getTime() - startDate.getTime();

        return diffDate;
    });

    let trackArr = [];
    texts.forEach(function(v,i) {
        let trackObj = {};
        trackObj.text = v;
        trackObj.time = intervals[i];
        trackArr.push(trackObj);
    });

    return trackArr;
}


function aggregateTrack() {
    trackArr = getTrackObj();
    let aggObj = sumUp(trackArr, 'time', 'text')
    
    statsList.replaceChildren();
    writeTrack(aggObj);
}

function sumUp(obj, propName, groupPropName, totals) {
    var totals = totals || {};
    for (const prop in obj) {
        if (prop === propName) {
            if (!totals[obj[groupPropName]]) {
                totals[obj[groupPropName]] = 0
            } 
            totals[obj[groupPropName]] += obj[propName]
        } else if (typeof obj[prop] == 'object'){
            sumUp(obj[prop], propName, groupPropName, totals);
        }
    }
    return totals;
}



function writeTrack(obj) {
    for (const prop in obj) {
        const track = document.createElement("li");
        const diffTime = datesToText(obj[prop]);
        track.innerText = `${prop}  ${diffTime}`;

        statsList.appendChild(track);
    }
}

function datesToText(diffDate) {
    let diffHours = Math.floor(diffDate / 1000 / 60 / 60);
    diffDate -= diffHours * 1000 * 60 * 60;
    let diffMins = Math.floor(diffDate / 1000 / 60);

    const diffText = (diffHours < 9 ? "0" : "") + diffHours + ":" + (diffMins < 9 ? "0" : "") + diffMins;

    return diffText;
}

startBtn.addEventListener("submit", addBlock);
statsBtn.addEventListener("click", aggregateTrack);