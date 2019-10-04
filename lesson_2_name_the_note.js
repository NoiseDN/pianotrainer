/**
 *  Lesson: Name the note
 *  Objective: learn notes and their placement
 */
function runNameTheNote() {
  clickable = false;

  showButtons();

  taskNote = getRandomNote(getRandomOctave(), sharp, flat);

  findNode(taskNote).classList.add("selected");
}

function selectNote(noteName) {
  findNode(taskNote).classList.add('correct');
  if (taskNote.name === noteName) {
    printTask(noteName + " - Correct! :)");
    correct++;
  } else {
    printTask(noteName + " - Wrong! :(");
    //TODO support sharp and flat
    const selectedNote = getNote(noteName, 1, false, false);
    findNode(selectedNote).classList.add('wrong');
  }
  total++;

  setTimeout(() => {
    startLesson(LESSON.NAME_THE_NOTE);
  }, 2000);
}