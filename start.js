const startBtn = document.querySelector("#start");
const trackDiv = document.querySelector("#track");

function addBlock(e) {
    e.preventDefault();

    const block = document.createElement("div");
    block.class = "time-block";

    const startTime = document.createElement("input");
    const endTime = document.createElement("input");

    startTime.type = "time";
    endTime.type = "time";
    // startTime.required = True;
    // endTime.required = True;
    startTime.value = "08:30";  // TODO

    const trackText = document.createElement("input");
    trackText.type = "text";
    
    const trackForm = document.createElement("form");

    trackForm.appendChild(startTime);
    trackForm.appendChild(endTime);
    trackForm.appendChild(trackText);
    
    block.appendChild(trackForm);
    trackDiv.appendChild(block);
}

startBtn.addEventListener("submit", addBlock);