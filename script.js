let stopwatchDisplay = document.getElementById('stopwatch');
let startButton = document.getElementById('start');
let stopButton = document.getElementById('stop');
let resetButton = document.getElementById('reset');
let addButton = document.getElementById('add');
let hoursInput = document.getElementById('hoursInput');
let minutesInput = document.getElementById('minutesInput');
let secondsInput = document.getElementById('secondsInput');

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
  let additionalHours = parseInt(hoursInput.value) || 0;
  let additionalMinutes = parseInt(minutesInput.value) || 0;
  let additionalSeconds = parseInt(secondsInput.value) || 0;
  
  // Convert hours and minutes to seconds and add all to elapsedTime
  elapsedTime += additionalHours * 3600 + additionalMinutes * 60 + additionalSeconds;
  updateTimeDisplay();

  // Clear the input fields
  hoursInput.value = '';
  minutesInput.value = '';
  secondsInput.value = '';
}

// Adding the event listeners
startButton.addEventListener('click', startTimer);
stopButton.addEventListener('click', stopTimer);
resetButton.addEventListener('click', resetTimer);
addButton.addEventListener('click', addTime);

// Display current Stopwatch time in browser tab
function updateTimeDisplay() {
    stopwatchDisplay.textContent = formatTime(elapsedTime);
    document.title = formatTime(elapsedTime); // Update the title with the current stopwatch time
  }