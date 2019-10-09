function getSelectedLesson() {
  const lessonIndex = document.getElementById("lesson").selectedIndex;
  return LESSON[document.getElementsByTagName("option")[lessonIndex].value];
}

const LESSON = Object.freeze({
  'NOTE_NAMES': { index: 1, displayName: 'Note names', description: 'Find a note in yellow octave' },
  'NAME_THE_NOTE': { index: 2,displayName: 'Name the note', description: 'Name the highlighted note' },
  'TONE_SEMITONE': { index: 3,displayName: 'Tone / Semitone', description: 'Build tone / semitone' },
  'NAME_ACCORD': { index: 4,displayName: 'Name accord', description: 'Find and play a note displayed in the task' },
  'BUILD_ACCORD': { index: 5,displayName: 'Build accord', description: 'Find and play a note displayed in the task' },
});