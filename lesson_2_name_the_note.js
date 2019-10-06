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
  if (!buttonsClickable) {
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
    button.addEventListener('click', () => selectNote(buttons[i]));
    button.innerHTML = buttons[i];
    container.appendChild(button);
  }
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
