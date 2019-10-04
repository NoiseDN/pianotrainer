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
    this.name = name.toUpperCase();
    this.white = white;
    this.octave = octave;
    this.sharp = sharp;
    this.flat = flat;
  }

  print(includeOctave = false) {
    return this.name + (includeOctave ? this.octave : '') + (this.sharp ? '#': '') + (this.flat ? "b" : '');
  }

  equals(other) {
    if (!other) {
      return false;
    }
    if (this.octave !== other.octave) {
      return false;
    }
    if (this.sameAs(other)) {
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

  sameAs(other) {
    if (this.name === 'C' && this.sharp && other.name === 'D' && other.flat) {
      return true;
    }
    if (this.name === 'D' && this.sharp && other.name === 'E' && other.flat) {
      return true;
    }
    if (this.name === 'F' && this.sharp && other.name === 'G' && other.flat) {
      return true;
    }
    if (this.name === 'G' && this.sharp && other.name === 'A' && other.flat) {
      return true;
    }
    if (this.name === 'A' && this.sharp && other.name === 'B' && other.flat) {
      return true;
    }
  }
}

for (let o = 1; o <= OCTAVES; o++) {
  NOTES.push(new Note('C', true, o));
  NOTES.push(new Note('C', false, o, true, false));
  NOTES.push(new Note('D', false, o, false, true));
  NOTES.push(new Note('D', true, o));
  NOTES.push(new Note('D', false,o, true, false));
  NOTES.push(new Note('E', false,o, false, true));
  NOTES.push(new Note('E', true, o));
  NOTES.push(new Note('F', true, o));
  NOTES.push(new Note('F', false,o, true, false));
  NOTES.push(new Note('G', false,o, false, true));
  NOTES.push(new Note('G', true, o));
  NOTES.push(new Note('G', false,o, true, false));
  NOTES.push(new Note('A', false,o, false, true));
  NOTES.push(new Note('A', true, o));
  NOTES.push(new Note('A', false,o, true, false));
  NOTES.push(new Note('B', false,o, false, true));
  NOTES.push(new Note('B', true, o));
}

function getNote(noteName, octave, sharp, flat) {
  return NOTES.find(n => n.name.toUpperCase() === noteName.toUpperCase() &&
      n.octave === octave && n.sharp === sharp && n.flat === flat);
}

function getRandomNote(octave, includeSharp, includeFlat) {
  let notes = [];
  const octaveNotes = NOTES.filter(n => n.octave === octave);

  // always include white notes
  notes = notes.concat(octaveNotes.filter(n => n.white));

  notes = notes.concat(octaveNotes.filter(n => includeSharp ? n.sharp : false));
  notes = notes.concat(octaveNotes.filter(n => includeFlat ? n.flat : false));

  return notes[getRandomInt(notes.length)];
}

function getRandomOctave() {
  return getRandomInt(OCTAVES) + 1;
}

function findSame(note) {
  return NOTES.find(n => n.sameAs(note));
}


