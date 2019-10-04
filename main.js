let whites = true;
let sharp = false;
let flat = false;
let tone = false;
let halftone = false;
let taskNote, pressedNote, selectedLesson, selectedOctave;
let correct = 0;
let total = 0;

function toggleWhites() {
  whites = !whites;
  start();
}
function toggleSharp() {
  sharp = !sharp;
  start();
}
function toggleFlat() {
  flat = !flat;
  start();
}
function toggleTone() {
  tone = !tone;
  start();
}
function toggleHalftone() {
  halftone = !halftone;
  start();
}

function hit(noteName, octave, sharp = false, flat = false) {
  pressedNote = getNote(noteName, octave, sharp, flat);

  const pressedNode = findNode(pressedNote);
  if (pressedNote.equals(taskNote)) {
    pressedNode.classList.remove('active');
    pressedNode.classList.add('correct');
    end(true);
  } else {
    pressedNode.classList.remove('active');
    pressedNode.classList.add('wrong');
    const taskNode = findNode(taskNote);
    taskNode.classList.remove('active');
    taskNode.classList.add('correct');
    end(false);
  }
}

function selectNote(noteName) {
  const taskNoteContainer = findTaskNoteContainer();

  findNode(taskNote).classList.add('correct');
  if (taskNote.name === noteName) {
    taskNoteContainer.innerHTML = noteName + " - Correct! :)";
    correct++;
  } else {
    taskNoteContainer.innerHTML = noteName + " - Wrong! :(";
    //TODO support sharp and flat
    const selectedNote = getNote(noteName, 1, false, false);
    findNode(selectedNote).classList.add('wrong');
  }
  total++;

  setTimeout(() => {
    play();
  }, 2000);
}

function resetNotesColor() {
  let notes = document.getElementsByClassName("note");
  for (let i = 0; i < notes.length; i++) {
    notes[i].classList.remove('selected');
    notes[i].classList.remove('correct');
    notes[i].classList.remove('wrong');
  }
}

function start() {
  if (!whites && !sharp && !flat) {
    alert("Please select at least one type of notes (whites, sharp, flat)");
    whites = true;
    document.getElementById("whites").checked = true;
  }
  selectedLesson = getSelectedLesson();
  findDescriptionContainer().innerHTML = selectedLesson.displayName + " - " + selectedLesson.description;

  setTimeout(() => {
    play();
  }, 1000)
}

function getSelectedLesson() {
  const lessonIndex = document.getElementById("lesson").selectedIndex;
  return findLesson(document.getElementsByTagName("option")[lessonIndex].value);
}

function play() {
  resetNotesColor();
  resetTaskContainer();
  updateScores();

  switch (selectedLesson) {
    case LESSON.NOTE_NAMES:
      runNoteNames();
    break;
    case LESSON.NAME_THE_NOTE:
      runNameTheNote();
    break;
    default:
      throw 'Lesson not implemented'
  }
}

/**
 *  Lesson: Note names
 *  Objective: learn a note placement on a piano
 */
function runNoteNames() {
  highlightRandomOctave();

  taskNote = getRandomNote(selectedOctave, whites, sharp, flat);

  findTaskNoteContainer().innerHTML = taskNote.print();
}

/**
 *  Lesson: Name the note
 *  Objective: learn notes and their placement
 */
function runNameTheNote() {
  //TODO remove click listeners from piano buttons

  taskNote = getRandomNote(getRandomOctave(), whites, sharp, flat);

  findNode(taskNote).classList.add("selected");
}

function end(success) {
  const taskNoteContainer = findTaskNoteContainer();

  if (success) {
    taskNoteContainer.innerHTML = taskNoteContainer.innerHTML + " - Correct! :)";

  } else {
    taskNoteContainer.innerHTML = pressedNote.print() + " - Wrong! :(";
  }

  setTimeout(() => {
    play();
  }, 2000);
}

function findTaskNoteContainer() {
  return document.getElementById("task_note");
}

function resetTaskContainer() {
  findTaskNoteContainer().innerHTML = '';
}

function updateScores() {
  document.getElementById("correct").innerHTML = correct + '';
  document.getElementById("total").innerHTML = total + '';
}

function findDescriptionContainer() {
  return document.getElementById("description");
}

function findNode(note) {
  if (!note) {
    throw 'Cannot find undefined note';
  }
  let node = document.getElementById("note_" + note.print(true));
  if (!node) {
    node = document.getElementById("note_" + findSame(note).print(true));
  }
  return node;
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

window.onload = function() {
  start();
};