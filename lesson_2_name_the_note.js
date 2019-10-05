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
    const selectedKey = getKey(noteName, 1, false, false);
    findElement(selectedKey).classList.add('wrong');
  }
  total++;

  setTimeout(() => {
    startLesson(LESSON.NAME_THE_NOTE);
  }, 1000);
}

function renderButtons() {
  const container = document.getElementById('note_buttons');
  container.innerHTML = '';
  const buttons = getRandomButtons();

  for (let i = 0; i < buttons.length; i++) {
    let button = document.createElement("div");
    button.classList.add('button');
    button.addEventListener('click', () => selectNote(buttons[i]));
    button.innerHTML = buttons[i];
    container.appendChild(button);
  }
}