/**
 *  Lesson: Name the note
 *  Objective: learn notes and their placement
 */
function runNameTheNote() {
  pianoClickable = false;
  buttonsClickable = true;

  renderButtons();
  showButtons();

  // save note globally
  taskKey = getRandomKey(getRandomOctave());

  findElement(taskKey).classList.add("selected");
}

function selectNote(noteName) {
  if (!buttonsClickable) {
    return;
  }
  buttonsClickable = false;
  findElement(taskKey).classList.add('correct');
  if (taskKey.note === noteName || taskKey.sameAs(noteName)) {
    printTask(noteName + " - Correct! :)");
    correct++;
  } else {
    printTask(noteName + " - Wrong! :(");
    const selectedKey = getKey(noteName, 1);
    findElement(selectedKey).classList.add('wrong');
  }
  total++;

  setTimeout(() => {
    startLesson();
  }, 1000);
}

function renderButtons() {
  const container = document.getElementById('note_buttons');
  container.innerHTML = '';
  const buttons = randomButtons ? getRandomButtons() : getSortedButtons();

  for (let i = 0; i < buttons.length; i++) {
    let button = document.createElement("div");
    button.classList.add('button');
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

  // always include white notes
  buttons = buttons.concat(octaveKeys.filter(k => k.white));

  buttons = buttons.concat(octaveKeys.filter(k => sharp ? k.sharp : false));
  buttons = buttons.concat(octaveKeys.filter(k => flat ? k.flat : false));

  return buttons;
}
