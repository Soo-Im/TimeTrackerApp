const startBtn = document.querySelector("#start");
const trackDiv = document.querySelector("#track");
const statsBtn = document.querySelector("#aggregate");

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

function collectTexts() {
    const allBlocks = document.querySelectorAll(".trackText");
    let allTexts = [];
    for (let i = 0; i < allBlocks.length; i++) {
        allTexts.push(allBlocks[i].value);
    }
    return allTexts;
}

function collectTimes() {
    const startTimeBlocks = document.querySelectorAll(".startTime");
    const endTimeBlocks = document.querySelectorAll(".endTime");
    
    let startTimes = [];
    let endTimes = [];

    for (let i = 0; i < startTimeBlocks.length; i++) {
        startTimes.push(startTimeBlocks[i].value);
        endTimes.push(endTimeBlocks[i].value);
    }

    // const diffTimes = endTimes - startTimes;
    // const hh = Math.floor(diffTimes / 1000 / 60 / 60);
    // diffTimes -= hh * 1000 * 60 * 60;
    // const mm = Math.floor(diffTimes / 1000 / 60);

}

function aggregateTrack() {
    aggTimes = collectTimes();
    aggTexts = collectTexts();

    console.log(aggTimes);
    console.log(aggTexts);

}

startBtn.addEventListener("submit", addBlock);
statsBtn.addEventListener("click", aggregateTrack);