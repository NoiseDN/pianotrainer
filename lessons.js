function getSelectedLesson() {
  const lessonIndex = document.getElementById('lesson').selectedIndex;
  return LESSON[document.getElementsByTagName('option')[lessonIndex].value];
}

const LESSON = Object.freeze({
  'NOTE_NAMES': { index: 1, displayName: 'Note names', description: 'Find a note in yellow octave' },
  'NAME_THE_NOTE': { index: 2, displayName: 'Name the note', description: 'Name the highlighted note' },
  'TONE_SEMITONE': { index: 3, displayName: 'Tone / Semitone', description: 'Build tone / semitone' },
  'BUILD_CHORD': { index: 4, displayName: 'Build chord', description: 'Build chord' },
  'NAME_CHORD': { index: 5, displayName: 'Name chord', description: 'Name chord' },
});