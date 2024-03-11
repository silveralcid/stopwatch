let stopwatchDisplay = document.getElementById('stopwatch');
let startButton = document.getElementById('start');
let stopButton = document.getElementById('stop');
let resetButton = document.getElementById('reset');
let addButton = document.getElementById('add');
let timeInput = document.getElementById('timeInput');

let startTime; 
let elapsedTime = 0; 
let timerInterval; 

function formatTime(timeInSeconds) {
  let seconds = Math.floor(timeInSeconds) % 60; 
  let minutes = Math.floor(timeInSeconds / 60) % 60;
  let hours = Math.floor(timeInSeconds / 3600);

  // Add leading zeros for a standard stopwatch look
  seconds = seconds < 10 ? '0' + seconds : seconds;
  minutes = minutes < 10 ? '0' + minutes : minutes;
  hours = hours < 10 ? '0' + hours : hours;

  return `${hours}:${minutes}:${seconds}`; 
}

function updateTimeDisplay() {
  stopwatchDisplay.textContent = formatTime(elapsedTime);
}

function startTimer() { 
    startTime = Date.now() - elapsedTime * 1000; // Adjusting start time considering elapsed time
    timerInterval = setInterval(function() {
      const timeSinceStart = Date.now() - startTime;
      elapsedTime = timeSinceStart / 1000; 
      updateTimeDisplay();
    }, 10); // Update display roughly every 10 milliseconds
}

function stopTimer() {
  clearInterval(timerInterval);
}

function resetTimer() {
  clearInterval(timerInterval);
  elapsedTime = 0;
  updateTimeDisplay();
}

function addTime() {
  let additionalMinutes = parseInt(timeInput.value);
  if (!isNaN(additionalMinutes)) {
    elapsedTime += additionalMinutes * 60; // Convert minutes to seconds
    updateTimeDisplay();
    timeInput.value = ''; // Clear the input
  }
}

// Adding the event listeners
startButton.addEventListener('click', startTimer);
stopButton.addEventListener('click', stopTimer);
resetButton.addEventListener('click', resetTimer);
addButton.addEventListener('click', addTime);