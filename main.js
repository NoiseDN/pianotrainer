let sharp = false;
let flat = false;
let tone = false;
let halftone = false;
let clickable = false;
let taskNote, pressedNote, selectedOctave;
let correct = 0;
let total = 0;

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
  printTask('...');
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

function findElement(note) {
  if (!note) {
    throw 'Cannot find undefined note';
  }
  let node = document.getElementById("note_" + note.toStr());
  if (!node) {
    node = document.getElementById("note_" + findSame(note).toStr());
  }
  return node;
}

function getRandomButtons() {
  let buttons = [];

  const octaveNotes = NOTES.filter(n => n.octave === 1);

  // always include white notes
  buttons = buttons.concat(octaveNotes.filter(n => n.white));

  buttons = buttons.concat(octaveNotes.filter(n => sharp ? n.sharp : false));
  buttons = buttons.concat(octaveNotes.filter(n => flat ? n.flat : false));

  return shuffle(buttons.map(b => b.name));
}

window.onload = function() {
  initialize();
};