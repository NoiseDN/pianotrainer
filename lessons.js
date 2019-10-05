function findLesson(lesson) {
  return LESSON[lesson];
}

const LESSON = Object.freeze({
  'NOTE_NAMES': { displayName: 'Key names', description: 'Find a note (in yellow octave)' },
  'NAME_THE_NOTE': { displayName: 'Name the note', description: 'Name the highlighted note' },
  'TONE_SEMITONE': { displayName: 'Tone / Semitone', description: 'Build tone / semitone' },
  'NAME_ACCORD': { displayName: 'Name accord', description: 'Find and play a note displayed in the task' },
  'BUILD_ACCORD': { displayName: 'Build accord', description: 'Find and play a note displayed in the task' },
});