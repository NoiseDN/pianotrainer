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
  taskNote = getRandomNote(getRandomOctave());

  findElement(taskNote).classList.add("selected");
}

function selectNote(noteName) {
  if (!buttonsClickable) {
    return;
  }
  buttonsClickable = false;
  findElement(taskNote).classList.add('correct');
  if (taskNote.name === noteName || taskNote.sameAs(noteName)) {
    printTask(noteName + " - Correct! :)");
    correct++;
  } else {
    printTask(noteName + " - Wrong! :(");
    const selectedNote = getNote(noteName, 1, false, false);
    findElement(selectedNote).classList.add('wrong');
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