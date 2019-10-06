/**
 *  Lesson: Name the note
 *  Objective: learn notes and their placement
 */
function runNameTheNote() {
  pianoClickable = false;
  buttonsClickable = true;

  renderButtons();
  showButtons();

  selectedOctave = getRandomOctave();
  taskKey = getRandomKey();
  debug && console.log('task key: ', taskKey);
  debug && findButton(taskKey.note).classList.add('debug');
  findElement(taskKey).classList.add("selected");
}

function selectNote(noteName) {
  if (!buttonsClickable || !noteName) {
    return;
  }
  buttonsClickable = false; //TODO change style of disabled buttons
  findElement(taskKey).classList.add('correct');

  debug && console.log('selected note: ' + noteName);

  if (taskKey.sameAs(noteName)) {
    printTask(noteName + " - Correct! :)");
    correct++;
  } else {
    printTask(noteName + " - Wrong! :(");
    const selectedKey = getKey(noteName, selectedOctave);
    findElement(selectedKey).classList.add('wrong');
  }
  total++;

  setTimeout(() => {
    startLesson();
  }, debug ? 200 : 1000);
}

function renderButtons() {
  const container = document.getElementById('note_buttons');
  container.innerHTML = '';
  const buttons = randomButtons ? getRandomButtons() : getSortedButtons();

  for (let i = 0; i < buttons.length; i++) {
    let button = document.createElement("div");
    button.classList.add('button');
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

  buttons = buttons.concat(octaveKeys.filter(k =>  white ? k.white : false));
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