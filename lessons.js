function findLesson(lesson) {
  return LESSON[lesson];
}

const LESSON = Object.freeze({
  'NOTE_NAMES': { displayName: 'Note names' },
  'NAME_THE_NOTE': { displayName: 'Name the note' },
  'TONE_HALFTONE': { displayName: 'Tone / Halftone' },
  'NAME_ACCORD': { displayName: 'Name accord' },
  'BUILD_ACCORD': { displayName: 'Build accord' },
});