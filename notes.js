/**
 * Specify number of octaves used in lessons
 */
const OCTAVES = 2;

const NOTES = [];

class Note {
  constructor(name, white, octave, sharp = false, flat = false) {
    if (sharp && flat) {
      throw 'Cannot create a Note both sharp and flat';
    }
    this.name = name;
    this.white = white;
    this.octave = octave;
    this.sharp = sharp;
    this.flat = flat;
  }

  toStr() {
    return this.name + this.octave;
  }

  equals(other) {
    if (!other) {
      return false;
    }
    if (this.octave !== other.octave) {
      return false;
    }
    if (this.sameAs(other.name)) {
      return true;
    }
    if (this.name !== other.name) {
      return false;
    }
    if (this.sharp !== other.sharp) {
      return false;
    }
    return this.flat === other.flat;
  }

  sameAs(name) {
    if (this.name === 'C#' && name === 'Db' || this.name === 'Db' && name === 'C#')  {
      return true;
    }
    if (this.name === 'D#' && name === 'Eb' || this.name === 'Eb' && name === 'D#') {
      return true;
    }
    if (this.name === 'F#' && name === 'Gb' || this.name === 'Gb' && name === 'F#') {
      return true;
    }
    if (this.name === 'G#' && name === 'Ab' || this.name === 'Ab' && name === 'G#') {
      return true;
    }
    if (this.name === 'A#' && name === 'Bb' || this.name === 'Bb' && name === 'A#') {
      return true;
    }
  }
}

for (let o = 1; o <= OCTAVES; o++) {
  NOTES.push(new Note('C', true, o));
  NOTES.push(new Note('C#', false, o, true, false));
  NOTES.push(new Note('Db', false, o, false, true));
  NOTES.push(new Note('D', true, o));
  NOTES.push(new Note('D#', false,o, true, false));
  NOTES.push(new Note('Eb', false,o, false, true));
  NOTES.push(new Note('E', true, o));
  NOTES.push(new Note('F', true, o));
  NOTES.push(new Note('F#', false, o, true, false));
  NOTES.push(new Note('Gb', false, o, false, true));
  NOTES.push(new Note('G', true, o));
  NOTES.push(new Note('G#', false, o, true, false));
  NOTES.push(new Note('Ab', false, o, false, true));
  NOTES.push(new Note('A', true, o));
  NOTES.push(new Note('A#', false, o, true, false));
  NOTES.push(new Note('Bb', false, o, false, true));
  NOTES.push(new Note('B', true, o));
}

function getNote(noteName, octave, sharp, flat) {
  let note = NOTES.find(n => n.name === noteName &&
      n.octave === octave && n.sharp === sharp && n.flat === flat);
  if (!note) {
    note = findSame(new Note(noteName, true, octave, sharp, flat));
  }
  return note;
}

function getRandomNote(octave) {
  let notes = [];
  const octaveNotes = NOTES.filter(n => n.octave === octave);

  // always include white notes
  notes = notes.concat(octaveNotes.filter(n => n.white));

  notes = notes.concat(octaveNotes.filter(n => sharp ? n.sharp : false));
  notes = notes.concat(octaveNotes.filter(n => flat ? n.flat : false));

  return notes[getRandomInt(notes.length)];
}

function getRandomOctave() {
  return getRandomInt(OCTAVES) + 1;
}

function findSame(note) {
  return NOTES.find(n => n.sameAs(note.name));
}


