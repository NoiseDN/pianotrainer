function findLesson(lesson) {
  return LESSON[lesson];
}

const LESSON = Object.freeze({
  'NOTE_NAMES': { displayName: 'Note names', description: 'Find a note (in yellow octave)' },
  'NAME_THE_NOTE': { displayName: 'Name the note', description: 'Name the highlighted note' },
  'TONE_HALFTONE': { displayName: 'Tone / Halftone', description: 'Find and play a note displayed in the task' },
  'NAME_ACCORD': { displayName: 'Name accord', description: 'Find and play a note displayed in the task' },
  'BUILD_ACCORD': { displayName: 'Build accord', description: 'Find and play a note displayed in the task' },
});