/**
 *  Lesson: Name the note
 *  Objective: learn notes and their placement
 */
function runNameTheNote() {
  disablePiano();
  enableButtons();
  renderButtons();
  showButtons();

  selectRandomOctave();
  taskKey = getRandomKey();
  debug && console.log('task key: ', taskKey);
  debug && findButton(taskKey.note).classList.add('debug');
  findElement(taskKey).classList.add('active');
}

function selectNote(noteName) {
  if (!buttonsClickable || !noteName) {
    return;
  }
  disableButtons();
  addClass(findElement(taskKey), 'correct');

  debug && console.log('selected note: ' + noteName);

  addClass(findButton(taskKey.note), 'correct');
  if (taskKey.note === noteName || taskKey.sameAs(noteName)) {
    setTask(noteName + ' - Correct! :)');
    correctAnswer();
  } else {
    setTask(noteName + ' - Wrong! :(');
    const selectedKey = getKey(noteName, selectedOctave);
    addClass(findElement(selectedKey), 'wrong');
    addClass(findButton(noteName), 'wrong');
  }
  finishLesson();

  setTimeout(() => {
    startLesson();
  }, TIMEOUT);
}

function renderButtons() {
  const container = document.getElementById('buttons');
  container.innerHTML = '';
  const buttons = randomButtons ? getRandomButtons() : getSortedButtons();

  for (let i = 0; i < buttons.length; i++) {
    let button = document.createElement('div');
    addClass(button, 'button');
    button.setAttribute('id', 'button_' + buttons[i]);
    button.setAttribute('title', getHint(buttons[i]));
    button.addEventListener('click', () => selectNote(buttons[i]));
    button.innerHTML = buttons[i];
    container.appendChild(button);
  }
}

function getHint(note) {
  let prefix = '';
  if (note.indexOf('#') !== -1) {
    prefix = 'Shift + ';
  } else if (note.indexOf('b') !== -1) {
    prefix = 'Ctrl + ';
  }

  return 'Keyboard: ' + prefix + note.substr(0, 1);
}

function getRandomButtons() {
  return shuffle(getButtons().map(k => k.note));
}

function getSortedButtons() {
  return getButtons()
    .sort((a, b) => b.order - a.order)
    .map(k => k.note);
}

function getButtons() {
  let buttons = [];

  const octaveKeys = KEYS.filter(n => n.octave === 1);

  buttons = buttons.concat(octaveKeys.filter(k => white ? k.white : false));
  buttons = buttons.concat(octaveKeys.filter(k => sharp ? k.sharp : false));
  buttons = buttons.concat(octaveKeys.filter(k => flat ? k.flat : false));

  return buttons;
}

function findButton(noteName) {
  return document.getElementById('button_' + noteName);
}

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

function handleKey(event, code, note, shiftNote, ctrlNote) {
  if (event.code === code) {
    if (sharp && event.shiftKey) {
      selectNote(shiftNote);
    } else if (flat && event.ctrlKey) {
      selectNote(ctrlNote);
    } else {
      selectNote(note);
    }
  }
}