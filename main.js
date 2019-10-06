const debug = false;
let taskKey, pressedKey, selectedOctave;

//TODO: 1. support keyboard
//TODO: 2. support MIDI-keyboard
//TODO: 3. re-start lesson if task key is same as previous one

function hit(key) {
  if (!pianoClickable || !key) {
    return;
  }

  // save key globally
  pressedKey = key;

  switch (getSelectedLesson()) {
    case LESSON.NOTE_NAMES:
      lesson1_verifyPressed();
      break;
    case LESSON.TONE_SEMITONE:
      lesson3_verifyPressed();
      break;
    default:
      throw 'Lesson ' + getSelectedLesson() + ' not implemented'
  }

  total++;

  setTimeout(() => {
    startLesson();
  }, debug ? 200 : 1000);
}

function initialize() {
  renderPiano();
  resetScore();
  startTimer();
  startLesson();
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

function startLesson() {
  resetKeyColor();
  if (!white && !sharp && !flat) {
    printDescription('Please select lesson mode: White / Sharp / Flat');
    hideTask();
    return;
  }
  printDescription(getSelectedLesson().displayName + " - " + getSelectedLesson().description);
  printTask('...');
  updateScore();
  hideSettings();

  switch (getSelectedLesson()) {
    case LESSON.NOTE_NAMES:
      runNoteNames();
    break;
    case LESSON.NAME_THE_NOTE:
      runNameTheNote();
    break;
    case LESSON.TONE_SEMITONE:
      runToneSemitone();
    break;
    default:
      throw 'Lesson ' + getSelectedLesson() + ' not implemented'
  }
}

function resetKeyColor() {
  const keys = document.getElementsByClassName("key");
  for (let i = 0; i < keys.length; i++) {
    keys[i].classList.remove('active', 'selected', 'correct', 'wrong', 'debug');
  }
}

function printTask(text) {
  document.getElementById("task_note").style.display = 'block';
  document.getElementById("task_note").innerHTML = text;
}

function hideTask() {
  document.getElementById("task_note").style.display = 'none';
}

function updateScore() {
  document.getElementById("correct").innerHTML = correct + '';
  document.getElementById("total").innerHTML = total + '';
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
    element = document.getElementById("key_" + findSame(key.note, key.octave).toStr());
  }
  return element;
}

window.onload = function() {
  initialize();
};