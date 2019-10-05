/**
 * Specify number of octaves used in lessons
 */
const OCTAVES = 2;
const KEYS = [];
const TONES = new Map();
const SEMITONES = new Map();

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

  isToneFor(other) {
    if (!other) {
      return false;
    }
    return TONES.get(this).equals(other);
  }

  isSemitoneFor(other) {
    if (!other) {
      return false;
    }
    return SEMITONES.get(this).equals(other);
  }
}

for (let o = 1; o <= OCTAVES; o++) {
  const C = new Key(3, 'C', true, o);
  const Csh = new Key(9, 'C#', false, o, true, false);
  const Db = new Key(15, 'Db', false, o, false, true);
  const D = new Key(4, 'D', true, o);
  const Dsh = new Key(10, 'D#', false,o, true, false);
  const Eb = new Key(16, 'Eb', false,o, false, true);
  const E = new Key(5, 'E', true, o);
  const F = new Key(6, 'F', true, o);
  const Fsh = new Key(11, 'F#', false, o, true, false);
  const Gb = new Key(17, 'Gb', false, o, false, true);
  const G = new Key(7, 'G', true, o);
  const Gsh = new Key(12, 'G#', false, o, true, false);
  const Ab = new Key(13, 'Ab', false, o, false, true);
  const A = new Key(1, 'A', true, o);
  const Ash = new Key(8, 'A#', false, o, true, false);
  const Bb = new Key(14, 'Bb', false, o, false, true);
  const B = new Key(2, 'B', true, o);

  KEYS.push(C, Csh, Db, D, Dsh, Eb, E, F, Fsh, Gb, G, Gsh, Ab, A, Ash, Bb, B);

  /**
   *  TONES
   */
  TONES.set(C, D);
  TONES.set(Csh, Dsh);
  TONES.set(Db, Eb);
  TONES.set(D, E);
  TONES.set(Dsh, F);
  TONES.set(Eb, F);
  TONES.set(E, Fsh);
  TONES.set(F, G);
  TONES.set(Fsh, Gsh);
  TONES.set(Gb, Ab);
  TONES.set(G, A);
  TONES.set(Gsh, Ash);
  TONES.set(Ab, Bb);
  TONES.set(A, B);

  /**
   *  SEMITONES
   */
  SEMITONES.set(C, Csh);
  SEMITONES.set(Csh, D);
  SEMITONES.set(Db, D);
  SEMITONES.set(D, Dsh);
  SEMITONES.set(Dsh, E);
  SEMITONES.set(Eb, E);
  SEMITONES.set(E, F);
  SEMITONES.set(F, Fsh);
  SEMITONES.set(Fsh, G);
  SEMITONES.set(Gb, G);
  SEMITONES.set(G, Gsh);
  SEMITONES.set(Gsh, A);
  SEMITONES.set(Ab, A);
  SEMITONES.set(A, Ash);
  SEMITONES.set(Ash, B);
  SEMITONES.set(Bb, B);
}

// Link tones between octaves
TONES.set(getKey('A#', 1, true, false), getKey('C', 2));
TONES.set(getKey('Bb', 1, false, true), getKey('C', 2));
TONES.set(getKey('B', 1), getKey('C#', 2, true, false));
TONES.set(getKey('B', 1), getKey('Db', 2, false, true));
TONES.set(getKey('A#', 2, true, false), getKey('C', 1));
TONES.set(getKey('Bb', 2, false, true), getKey('C', 1));
TONES.set(getKey('B', 2), getKey('C#', 1, true, false));
TONES.set(getKey('B', 2), getKey('Db', 1, false, true));

// Link semitones between octaves
SEMITONES.set(getKey('B', 1), getKey('C', 2));
SEMITONES.set(getKey('B', 2), getKey('C', 1));

function getKey(noteName, octave, sharp = false, flat = false) {
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


