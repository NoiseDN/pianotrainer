/**
 * Enable DEBUG mode for APP
 */
const debug = false;

/**
 * Global variables
 */
let taskKey, pressedKey, selectedOctave;

function initialize() {
  renderPiano();
  resetScore();
  startTimer();
  startLesson();
}

function startLesson() {
  resetKeyColor();
  if (!white && !sharp && !flat) {
    setDescription('Please select lesson mode: White / Sharp / Flat');
    hideTask();
    return;
  }
  let lesson = getSelectedLesson();
  setTitle('Lesson ' + lesson.index + ' : ' + lesson.displayName);
  setDescription(lesson.description);
  setTask('...');
  updateScore();
  hideLesson3Settings();

  switch (lesson) {
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
      throw 'Lesson ' + lesson + ' not implemented'
  }
}

function resetKeyColor() {
  const whiteKeys = document.getElementsByClassName('anchor');
  for (let i = 0; i < whiteKeys.length; i++) {
    whiteKeys[i].classList.remove('active', 'selected', 'correct', 'wrong', 'debug');
  }
  const blackKeys = document.getElementsByClassName('flat');
  for (let i = 0; i < blackKeys.length; i++) {
    blackKeys[i].classList.remove('active', 'selected', 'correct', 'wrong', 'debug');
  }
}

function setTask(text) {
  document.getElementById('task').style.display = 'block';
  document.getElementById('task').innerHTML = text;
}

function hideTask() {
  document.getElementById('task').style.display = 'none';
}

function updateScore() {
  document.getElementById('correct').innerHTML = correct + '';
  document.getElementById('total').innerHTML = total + '';
}

function setTitle(text) {
  document.getElementById('title').innerHTML = text;
}

function setDescription(text) {
  document.getElementById('description').innerHTML = text;
}

function showButtons() {
  document.getElementById('buttons-wrapper').style.display = 'block';
}

function hideButtons() {
  document.getElementById('buttons-wrapper').style.display = 'none';
}

function findElement(key) {
  if (!key) {
    throw 'Cannot find undefined key';
  }
  let element;
  if (key.sharp) {
    element = document.getElementById('key_' + findSame(key).toStr());
  } else {
    element = document.getElementById('key_' + key.toStr());
  }
  if (!element) {
    throw 'Could not find element for key ' + key.toStr();
  }
  return element;
}

window.onload = function() {
  initialize();
};

/**
 * Support keyboard keys
 */
document.addEventListener('keyup', function(event) {
  if (getSelectedLesson() !== LESSON.NAME_THE_NOTE) {
    return;
  }
  debug && console.log('Keyboard key pressed: ', event.code);
  handleKey(event, 'KeyA', 'A', 'A#', 'Ab');
  handleKey(event, 'KeyB', 'B', null, 'Bb'); // exclude B#
  handleKey(event, 'KeyC', 'C', 'C#', null); // exclude Cb
  handleKey(event, 'KeyD', 'D', 'D#', 'Db');
  handleKey(event, 'KeyE', 'E', null, 'Eb'); // exclude E#
  handleKey(event, 'KeyF', 'F', 'F#', null); // exclude Fb
  handleKey(event, 'KeyG', 'G', 'G#', 'Gb');
});