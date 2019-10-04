let whites = true;
let sharp = false;
let flat = false;
let tone = false;
let halftone = false;
let clickable = false;
let taskNote, pressedNote, selectedOctave;
let correct = 0;
let total = 0;

function toggleWhites() {
  whites = !whites;
  initialize();
}
function toggleSharp() {
  sharp = !sharp;
  initialize();
}
function toggleFlat() {
  flat = !flat;
  initialize();
}
function toggleTone() {
  tone = !tone;
  initialize();
}
function toggleHalftone() {
  halftone = !halftone;
  initialize();
}

function initialize() {
  if (!whites && !sharp && !flat) {
    alert("Please select at least one type of notes (whites, sharp, flat)");
    whites = true;
    document.getElementById("whites").checked = true;
  }

  const selectedLesson = getSelectedLesson();
  printDescription(selectedLesson.displayName + " - " + selectedLesson.description);
  startLesson(selectedLesson);
}

function getSelectedLesson() {
  const lessonIndex = document.getElementById("lesson").selectedIndex;
  return findLesson(document.getElementsByTagName("option")[lessonIndex].value);
}

function startLesson(lesson) {
  resetNotesColor();
  printTask('');
  updateScores();

  switch (lesson) {
    case LESSON.NOTE_NAMES:
      runNoteNames();
    break;
    case LESSON.NAME_THE_NOTE:
      runNameTheNote();
    break;
    default:
      throw 'Lesson ' + lesson + ' not implemented'
  }
}

function resetNotesColor() {
  let notes = document.getElementsByClassName("note");
  for (let i = 0; i < notes.length; i++) {
    notes[i].classList.remove('active', 'selected', 'correct', 'wrong');
  }
}

function printTask(text) {
  return document.getElementById("task_note").innerHTML = text;
}

function updateScores() {
  document.getElementById("correct").innerHTML = correct + '';
  document.getElementById("total").innerHTML = total + '';
}

function printDescription(text) {
  document.getElementById("description").innerHTML = text;
}

function showButtons() {
  document.getElementById('note_buttons').style.display = 'block';
}

function hideButtons() {
  document.getElementById('note_buttons').style.display = 'none';
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

window.onload = function() {
  initialize();
};