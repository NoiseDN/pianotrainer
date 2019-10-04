/**
 *  Lesson: Note names
 *  Objective: learn a note placement on a piano
 */
function runNoteNames() {
  clickable = true;

  hideButtons();

  highlightRandomOctave();

  taskNote = getRandomNote(selectedOctave, sharp, flat);

  printTask(taskNote.print());
}

function hit(noteName, octave, sharp = false, flat = false) {
  if (!clickable) {
    return;
  }
  pressedNote = getNote(noteName, octave, sharp, flat);

  const pressedNode = findNode(pressedNote);
  if (pressedNote.equals(taskNote)) {
    pressedNode.classList.remove('active');
    pressedNode.classList.add('correct');
    printTask(taskNote.print()  + " - Correct! :)")
  } else {
    pressedNode.classList.remove('active');
    pressedNode.classList.add('wrong');
    const taskNode = findNode(taskNote);
    taskNode.classList.remove('active');
    taskNode.classList.add('correct');
    printTask(pressedNote.print() + " - Wrong! :(");
  }

  setTimeout(() => {
    startLesson(LESSON.NOTE_NAMES);
  }, 2000);
}

function highlightRandomOctave() {
  selectedOctave = getRandomOctave();

  const notes = document.getElementsByClassName("note");
  for (let i = 0; i < notes.length; i++) {
    const note = notes[i];
    note.classList.remove('active');
    if (note.getAttribute('id').indexOf(selectedOctave + '') !== -1) {
      note.classList.add('active');
    }
  }
}
