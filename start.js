const startBtn = document.querySelector("#start");
const trackDiv = document.querySelector("#track");

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

    const submitBlock = document.createElement("button");
    submitBlock.innerText = "입력";
    submitBlock.addEventListener("click", addBlock);

    trackForm.appendChild(startTime);
    trackForm.appendChild(endTime);
    trackForm.appendChild(trackText);
    trackForm.appendChild(submitBlock);
    
    block.appendChild(trackForm);
    trackDiv.appendChild(block);
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


startBtn.addEventListener("submit", addBlock);