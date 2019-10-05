/**
 * Specify number of octaves used in lessons
 */
const OCTAVES = 2;

const KEYS = [];

class Key {
  constructor(note, white, octave, sharp = false, flat = false) {
    if (sharp && flat) {
      throw 'Cannot create a Key both sharp and flat';
    }
    this.note = note;
    this.white = white;
    this.octave = octave;
    this.sharp = sharp;
    this.flat = flat;
  }

  toStr() {
    return this.note + this.octave;
  }

  equals(other) {
    if (!other) {
      return false;
    }
    if (this.octave !== other.octave) {
      return false;
    }
    if (this.sameAs(other.note)) {
      return true;
    }
    if (this.note !== other.note) {
      return false;
    }
    if (this.sharp !== other.sharp) {
      return false;
    }
    return this.flat === other.flat;
  }

  sameAs(name) {
    if (this.note === 'C#' && name === 'Db' || this.note === 'Db' && name === 'C#')  {
      return true;
    }
    if (this.note === 'D#' && name === 'Eb' || this.note === 'Eb' && name === 'D#') {
      return true;
    }
    if (this.note === 'F#' && name === 'Gb' || this.note === 'Gb' && name === 'F#') {
      return true;
    }
    if (this.note === 'G#' && name === 'Ab' || this.note === 'Ab' && name === 'G#') {
      return true;
    }
    if (this.note === 'A#' && name === 'Bb' || this.note === 'Bb' && name === 'A#') {
      return true;
    }
  }
}

for (let o = 1; o <= OCTAVES; o++) {
  KEYS.push(new Key('C', true, o));
  KEYS.push(new Key('C#', false, o, true, false));
  KEYS.push(new Key('Db', false, o, false, true));
  KEYS.push(new Key('D', true, o));
  KEYS.push(new Key('D#', false,o, true, false));
  KEYS.push(new Key('Eb', false,o, false, true));
  KEYS.push(new Key('E', true, o));
  KEYS.push(new Key('F', true, o));
  KEYS.push(new Key('F#', false, o, true, false));
  KEYS.push(new Key('Gb', false, o, false, true));
  KEYS.push(new Key('G', true, o));
  KEYS.push(new Key('G#', false, o, true, false));
  KEYS.push(new Key('Ab', false, o, false, true));
  KEYS.push(new Key('A', true, o));
  KEYS.push(new Key('A#', false, o, true, false));
  KEYS.push(new Key('Bb', false, o, false, true));
  KEYS.push(new Key('B', true, o));
}

function getKey(noteName, octave, sharp, flat) {
  let key = KEYS.find(n => n.note === noteName &&
      n.octave === octave && n.sharp === sharp && n.flat === flat);
  if (!key) {
    key = findSame(noteName);
  }
  return key;
}

function getRandomKey(octave) {
  let keys = [];
  const octaveKeys = KEYS.filter(k => k.octave === octave);

  // always include white keys
  keys = keys.concat(octaveKeys.filter(k => k.white));

  keys = keys.concat(octaveKeys.filter(k => sharp ? k.sharp : false));
  keys = keys.concat(octaveKeys.filter(k => flat ? k.flat : false));

  return keys[getRandomInt(keys.length)];
}

function getRandomOctave() {
  return getRandomInt(OCTAVES) + 1;
}

function findSame(keyName) {
  return KEYS.find(n => n.sameAs(keyName));
}


