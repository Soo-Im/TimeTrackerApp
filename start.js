const startBtn = document.querySelector("#start");
const trackDiv = document.querySelector("#track");

function addBlock(e) {
    e.preventDefault();

    const block = document.createElement("div");
    block.classList.add("block");
    const trackForm = document.createElement("form");

    const startTime = document.createElement("input");
    const endTime = document.createElement("input");

    startTime.type = "time";
    endTime.type = "time";
    setStartTime(startTime);

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

function setStartTime(startTime) {
    const allBlocks = document.querySelectorAll(".block");
    if (allBlocks.length === 0) {
        
        startTime.value = startBtn.firstElementChild.value;
    }
    else {
        startTime.value = "09:30";
    }
}


startBtn.addEventListener("submit", addBlock);