let startTime, updatedTime, difference, tInterval;
let running = false;
let lapCount = 0;
let previousLapTime = 0; // To store the time at the previous lap
let totalLapDiff = 0;    // To store the cumulative lap difference

const display = document.getElementById("display");
const toggleButton = document.getElementById("toggle");
const resetButton = document.getElementById("reset");
const lapButton = document.getElementById("lap");
const laps = document.getElementById("laps");
const averageLapDisplay = document.getElementById("averageLap");

toggleButton.onclick = toggleStartPause;
resetButton.onclick = resetStopwatch;
lapButton.onclick = addLap;

// Start/Pause the stopwatch
function toggleStartPause() {
    if (!running) {
        startTime = new Date().getTime() - (difference || 0);
        tInterval = setInterval(updateTime, 10);
        toggleButton.innerText = "Pause";
        running = true;
    } else {
        clearInterval(tInterval);
        toggleButton.innerText = "Start";
        running = false;
    }
}

// Reset the stopwatch
function resetStopwatch() {
    clearInterval(tInterval);
    running = false;
    difference = 0;
    display.innerHTML = "00:00:00:000";
    laps.innerHTML = "";
    averageLapDisplay.innerText = "Average Lap Difference: 00:00:00:000";
    lapCount = 0;
    previousLapTime = 0;
    totalLapDiff = 0;
    toggleButton.innerText = "Start";
}

// Record a lap
function addLap() {
    if (running) {
        lapCount++;
        const lapTime = difference;
        const lapDiff = lapTime - previousLapTime; // Difference from the previous lap
        previousLapTime = lapTime;
        totalLapDiff += lapDiff;

        // Calculate average lap difference and round it
        const avgLapDiff = totalLapDiff / lapCount;
        const avgLapDiffRounded = Math.round(avgLapDiff); // Round to nearest millisecond
        averageLapDisplay.innerText = `Average Lap Difference: ${formatTime(avgLapDiffRounded)}`;

        laps.innerHTML += `<div>Lap ${lapCount}: ${formatTime(lapTime)} (Diff: ${formatTime(lapDiff)})</div>`;
    }
}

function updateTime() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;
    display.innerHTML = formatTime(difference);
}

function formatTime(ms) {
    let hours = Math.floor((ms % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((ms % (1000 * 60)) / 1000);
    let milliseconds = Math.floor(ms % 1000); // Get milliseconds as whole number

    return (hours < 10 ? "0" + hours : hours) + ":" + 
            (minutes < 10 ? "0" + minutes : minutes) + ":" + 
            (seconds < 10 ? "0" + seconds : seconds) + ":" + 
            (milliseconds < 100 ? (milliseconds < 10 ? "00" + milliseconds : "0" + milliseconds) : milliseconds);
}

// Keyboard shortcuts
document.addEventListener("keydown", function(event) {
    switch(event.code) {
        case "Space":
            toggleStartPause();
            event.preventDefault(); // Prevent scrolling
            break;
        case "KeyR":
            resetStopwatch();
            break;
        case "KeyL":
            addLap();
            break;
    }
});