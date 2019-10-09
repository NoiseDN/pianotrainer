let white = true;
let sharp = true;
let flat = true;
let pianoClickable = false;
let buttonsClickable = false;
let randomButtons = false;
let correct = 0;
let total = 0;
let clock;
const TIMEOUT = debug ? 200 : 1000;

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
  startLesson();
}

function resetScore() {
  correct = 0;
  total = 0;
}

function correctAnswer() {
  correct++;
}

function finishLesson() {
  total++;
}

function enablePiano() {
  pianoClickable = true;
}

function disablePiano() {
  pianoClickable = false;
}

function enableButtons() {
  buttonsClickable = true;
}

function disableButtons() {
  buttonsClickable = false;
  const buttons = document.getElementsByClassName('button');
  for (let i = 0; i < buttons.length; i++) {
    const button = buttons[i];
    addClass(button, 'disabled');
  }
}

function selectRandomOctave() {
  selectedOctave = getRandomInt(OCTAVES) + 1;
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


