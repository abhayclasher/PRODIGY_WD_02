const playButton = document.getElementsByClassName("Play")[0];
const resetButton = document.getElementsByClassName("reset")[0];
const lapButton = document.getElementsByClassName("Lap")[0];
const lapClearButton = document.getElementsByClassName("lap-clear-button")[0];
const minsDisplay = document.getElementsByClassName("min")[0];
const secsDisplay = document.getElementsByClassName("sec")[0];
const msecsDisplay = document.getElementsByClassName("msec")[0];
const lapsContainer = document.getElementsByClassName("laps")[0];

let isPlaying = false;
let intervalId;
let mins = 0, secs = 0, msecs = 0;

const updateDisplay = () => {
    minsDisplay.textContent = mins.toString().padStart(2, '0') + " : ";
    secsDisplay.textContent = secs.toString().padStart(2, '0') + " : ";
    msecsDisplay.textContent = msecs.toString().padStart(2, '0');
};

const startTimer = () => {
    intervalId = setInterval(() => {
        msecs++;
        if (msecs === 100) {
            msecs = 0;
            secs++;
        }
        if (secs === 60) {
            secs = 0;
            mins++;
        }
        updateDisplay();
    }, 10);
};

const stopTimer = () => {
    clearInterval(intervalId);
};

const play = () => {
    if (!isPlaying) {
        playButton.innerHTML = 'Pause';
        startTimer();
    } else {
        playButton.innerHTML = 'Play';
        stopTimer();
    }
    isPlaying = !isPlaying;
    toggleButtonVisibility();
};

const reset = () => {
    stopTimer();
    mins = 0;
    secs = 0;
    msecs = 0;
    updateDisplay();
    isPlaying = false;
    playButton.innerHTML = 'Play';
    toggleButtonVisibility();
    clearLaps();
};

const recordLap = () => {
    if (isPlaying) {
        const lapItem = document.createElement('li');
        lapItem.classList.add('lap-item');
        lapItem.innerHTML = `
            <span class="number">#${lapsContainer.children.length}</span>
            <span class="timestamp">${minsDisplay.textContent}${secsDisplay.textContent}${msecsDisplay.textContent}</span>
        `;
        lapsContainer.insertBefore(lapItem, lapClearButton);
        updateLapClearButtonVisibility();
    }
};

const clearLaps = () => {
    const lapItems = document.querySelectorAll('.lap-item');
    lapItems.forEach(lap => lap.remove());
    updateLapClearButtonVisibility();
};


const updateLapClearButtonVisibility = () => {
    const lapItems = document.querySelectorAll('.lap-item');
    if (lapItems.length > 0) {
        lapClearButton.classList.remove("hidden");
    } else {
        lapClearButton.classList.add("hidden");
    }
};

// Ensure Lap button, Lap Clear button are hidden, and laps are cleared on page load/refresh
window.onload = () => {
    clearLaps();                        // Clear all laps
    updateLapClearButtonVisibility();   // Hide Lap Clear button if no laps exist
    updateDisplay();
};

playButton.addEventListener("click", play);
resetButton.addEventListener("click", reset);
lapButton.addEventListener("click", recordLap);
lapClearButton.addEventListener("click", clearLaps);
