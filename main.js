let sharp = false;
let flat = false;
let tone = false;
let halftone = false;
let pianoClickable = false;
let buttonsClickable = false;
let taskKey, pressedKey, selectedOctave;
let correct = 0;
let total = 0;
let clock;

function toggleSharp() {
  sharp = !sharp;
  initialize();
}
function toggleFlat() {
  flat = !flat;
  initialize();
}
function toggleTone() {
  tone = !tone;
  initialize();
}
function toggleHalftone() {
  halftone = !halftone;
  initialize();
}

function initialize() {
  renderPiano();
  const selectedLesson = getSelectedLesson();
  printDescription(selectedLesson.displayName + " - " + selectedLesson.description);
  resetScore();
  startTimer();
  startLesson(selectedLesson);
}

function renderPiano() {
  const container = document.getElementById('piano');
  container.innerHTML = '';

  for (let i = 0; i < KEYS.length; i++) {
    const key = KEYS[i];
    if (key.note.endsWith('b')) {
      continue;
    }
    let noteEl = document.createElement("div");
    noteEl.classList.add('key');
    noteEl.classList.add(key.white ? 'white' : 'black');
    if (!key.white) {
      noteEl.classList.add(key.note.substr(0, 1).toLowerCase() + key.octave);
    }
    noteEl.setAttribute('id', 'key_' + key.note + key.octave);
    noteEl.addEventListener('click', () => hit(key));
    container.appendChild(noteEl);
  }
}

function getSelectedLesson() {
  const lessonIndex = document.getElementById("lesson").selectedIndex;
  return findLesson(document.getElementsByTagName("option")[lessonIndex].value);
}

function startLesson(lesson) {
  resetKeyColor();
  printTask('...');
  updateScore();

  switch (lesson) {
    case LESSON.NOTE_NAMES:
      runNoteNames();
    break;
    case LESSON.NAME_THE_NOTE:
      runNameTheNote();
    break;
    default:
      throw 'Lesson ' + lesson + ' not implemented'
  }
}

function resetKeyColor() {
  const keys = document.getElementsByClassName("key");
  for (let i = 0; i < keys.length; i++) {
    keys[i].classList.remove('active', 'selected', 'correct', 'wrong');
  }
}

function printTask(text) {
  return document.getElementById("task_note").innerHTML = text;
}

function updateScore() {
  document.getElementById("correct").innerHTML = correct + '';
  document.getElementById("total").innerHTML = total + '';
}

function resetScore() {
  correct = 0;
  total = 0;
}

function printDescription(text) {
  document.getElementById("description").innerHTML = text;
}

function showButtons() {
  document.getElementById('task-container').style.display = 'block';
}

function hideButtons() {
  document.getElementById('task-container').style.display = 'none';
}

function findElement(key) {
  if (!key) {
    throw 'Cannot find undefined key';
  }
  let element = document.getElementById("key_" + key.toStr());
  if (!element) {
    element = document.getElementById("key_" + findSame(key.note).toStr());
  }
  return element;
}

function getRandomButtons() {
  let buttons = [];

  const octaveKeys = KEYS.filter(n => n.octave === 1);

  // always include white notes
  buttons = buttons.concat(octaveKeys.filter(k => k.white));

  buttons = buttons.concat(octaveKeys.filter(k => sharp ? k.sharp : false));
  buttons = buttons.concat(octaveKeys.filter(k => flat ? k.flat : false));

  return shuffle(buttons.map(k => k.note));
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

window.onload = function() {
  initialize();
};