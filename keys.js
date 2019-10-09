/**
 * Specify number of octaves used in lessons
 */
const OCTAVES = 2;
const KEYS = [];
const TONES = new Map();
const SEMITONES = new Map();

class Key {
  constructor(order, note, octave, flatKey) {
    //TODO get rid of order property
    this.order = order;
    this.note = note;
    this.white = note.length === 1;
    this.octave = octave;
    this.sharp = note.indexOf('#') !== -1;
    this.flat = note.indexOf('b') !== -1;
    this.flatKey = flatKey;
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
    return false;
  }

  getTone() {
    return TONES.get(this);
  }

  isToneFor(other) {
    if (!other) {
      return false;
    }
    return other.getTone().equals(this);
  }

  getSemitone() {
    return SEMITONES.get(this);
  }

  isSemitoneFor(other) {
    if (!other) {
      return false;
    }
    return other.getSemitone().equals(this);
  }

  hasFlat() {
    return ['D', 'E', 'G', 'A', 'B'].includes(this.note);
  }

  getFlatKey() {
    return this.flatKey;
  }
}

for (let o = 0; o <= OCTAVES + 1; o++) {
  const C = new Key(3, 'C', o);
  const Csh = new Key(9, 'C#', o);
  const Db = new Key(15, 'Db', o);
  const D = new Key(4, 'D', o, Db);
  const Dsh = new Key(10, 'D#', o);
  const Eb = new Key(16, 'Eb', o);
  const E = new Key(5, 'E', o, Eb);
  const F = new Key(6, 'F', o);
  const Fsh = new Key(11, 'F#', o);
  const Gb = new Key(17, 'Gb', o);
  const G = new Key(7, 'G', o, Gb);
  const Gsh = new Key(12, 'G#', o);
  const Ab = new Key(13, 'Ab', o);
  const A = new Key(1, 'A', o, Ab);
  const Ash = new Key(8, 'A#', o);
  const Bb = new Key(14, 'Bb', o);
  const B = new Key(2, 'B', o, Bb);

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
TONES.set(getKey('A#', 0), getKey('C', 1));
TONES.set(getKey('Bb', 0), getKey('C', 1));
TONES.set(getKey('B', 0), getKey('C#', 1));
TONES.set(getKey('B', 0), getKey('Db', 1));

TONES.set(getKey('A#', 1), getKey('C', 2));
TONES.set(getKey('Bb', 1), getKey('C', 2));
TONES.set(getKey('B', 1), getKey('C#', 2));
TONES.set(getKey('B', 1), getKey('Db', 2));

TONES.set(getKey('A#', 2), getKey('C', 3));
TONES.set(getKey('Bb', 2), getKey('C', 3));
TONES.set(getKey('B', 2), getKey('C#', 3));
TONES.set(getKey('B', 2), getKey('Db', 3));

// Link semitones between octaves
SEMITONES.set(getKey('B', 0), getKey('C', 1));
SEMITONES.set(getKey('B', 1), getKey('C', 2));
SEMITONES.set(getKey('B', 2), getKey('C', 3));

function getKey(noteName, octave) {
  return KEYS
    .filter(k => k.octave === octave)
    .find(k => k.note === noteName);
}

function getRandomKey() {
  let keys = [];
  const octaveKeys = KEYS.filter(k => k.octave === selectedOctave);

  keys = keys.concat(octaveKeys.filter(k => white ? k.white : false));
  keys = keys.concat(octaveKeys.filter(k => sharp ? k.sharp : false));
  keys = keys.concat(octaveKeys.filter(k => flat ? k.flat : false));

  return keys[getRandomInt(keys.length)];
}

function findSame(key) {
  return KEYS
    .filter(k => k.octave === key.octave)
    .find(k => k.sameAs(key.note));
}


