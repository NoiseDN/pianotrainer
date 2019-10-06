let white = true;
let sharp = false;
let flat = false;
let pianoClickable = false;
let buttonsClickable = false;
let randomButtons = false;
let correct = 0;
let total = 0;
let clock;

function toggleWhite() {
  white = !white;
  startLesson();
}

function toggleSharp() {
  sharp = !sharp;
  startLesson();
}

function toggleFlat() {
  flat = !flat;
  startLesson();
}

function toggleRandomButtons() {
  randomButtons = !randomButtons;
  initialize();
}

function resetScore() {
  correct = 0;
  total = 0;
}

function startTimer() {
  const minutesLabel = document.getElementById("minutes");
  const secondsLabel = document.getElementById("seconds");
  let totalSeconds = 0;
  clearInterval(clock);
  clock = setInterval(() => {
    ++totalSeconds;
    secondsLabel.innerHTML = pad(totalSeconds % 60);
    minutesLabel.innerHTML = pad(parseInt(totalSeconds / 60));
  }, 1000);
}

function pad(val) {
  let valString = val + "";
  if (valString.length < 2) {
    return "0" + valString;
  } else {
    return valString;
  }
}


