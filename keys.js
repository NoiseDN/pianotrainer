/**
 * Specify number of octaves used in lessons
 */
const OCTAVES = 2;

const KEYS = [];

class Key {
  constructor(order, note, white, octave, sharp = false, flat = false) {
    if (sharp && flat) {
      throw 'Cannot create a Key both sharp and flat';
    }
    this.order = order;
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
  KEYS.push(new Key(3, 'C', true, o));
  KEYS.push(new Key(9, 'C#', false, o, true, false));
  KEYS.push(new Key(15, 'Db', false, o, false, true));
  KEYS.push(new Key(4, 'D', true, o));
  KEYS.push(new Key(10, 'D#', false,o, true, false));
  KEYS.push(new Key(16, 'Eb', false,o, false, true));
  KEYS.push(new Key(5, 'E', true, o));
  KEYS.push(new Key(6, 'F', true, o));
  KEYS.push(new Key(11, 'F#', false, o, true, false));
  KEYS.push(new Key(17, 'Gb', false, o, false, true));
  KEYS.push(new Key(7, 'G', true, o));
  KEYS.push(new Key(12, 'G#', false, o, true, false));
  KEYS.push(new Key(13, 'Ab', false, o, false, true));
  KEYS.push(new Key(1, 'A', true, o));
  KEYS.push(new Key(8, 'A#', false, o, true, false));
  KEYS.push(new Key(14, 'Bb', false, o, false, true));
  KEYS.push(new Key(2, 'B', true, o));
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


