/**
 *  Lesson: Note names
 *  Objective: learn a note placement on a piano
 */
function runNoteNames() {
  pianoClickable = true;

  hideButtons();
  highlightRandomOctave();

  // save note globally
  taskNote = getRandomNote(selectedOctave);

  printTask(taskNote.name);
}

function hit(noteName, octave, sharp = false, flat = false) {
  if (!pianoClickable) {
    return;
  }

  // save note globally
  pressedNote = getNote(noteName, octave, sharp, flat);

  const pressedEl = findElement(pressedNote);
  pressedEl.classList.remove('active');
  if (pressedNote.equals(taskNote)) {
    pressedEl.classList.add('correct');
    printTask(taskNote.name  + " - Correct! :)")
    correct++;
  } else {
    pressedEl.classList.add('wrong');
    const taskNode = findElement(taskNote);
    taskNode.classList.remove('active');
    taskNode.classList.add('correct');
    printTask(pressedNote.name + " - Wrong! :(");
  }
  total++;

  setTimeout(() => {
    startLesson(LESSON.NOTE_NAMES);
  }, 1000);
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
