const MAJOR_CHORDS = new Map();
const MINOR_CHORDS = new Map();

class Chord {
  constructor(first, third, quint) {
    this.first = first;
    this.third = third;
    this.quint = quint;
  }

  full() {
    return this.first && this.third && this.quint;
  }

  toArray() {
    const array = [];

    this.first && array.push(this.first);
    this.third && array.push(this.third);
    this.quint && array.push(this.quint);

    return array;
  }

  toSet() {
    return new Set(this.toArray());
  }

  toStr() {
    return this.toArray().map(k => k.toStr());
  }

  play(key) {
    if (!this.first) {
      this.first = key;
      return;
    }
    if (!this.third) {
      this.third = key;
      return;
    }
    if (!this.quint) {
      this.quint = key;
    }
  }

  size() {
    return this.toArray().length;
  }

  forEach(func) {
    this.toArray().forEach(func);
  }

  has(key) {
    const set = this.toSet();

    return set.has(key) || set.has(findSame(key));
  }

  equals(other) {
    if (!other || !other.full()) {
      return false;
    }
    if (this.size() !== other.size()) {
      return false;
    }
    if (!other.has(this.first)) {
      return false;
    }
    if (!other.has(this.third)) {
      return false;
    }
    if (!other.has(this.quint)) {
      return false;
    }

    return true;
  }
}

function addChord(minor, first, third, quint) {
  if (minor) {
    MINOR_CHORDS.set(first, new Chord(first, third, quint));
  } else {
    MAJOR_CHORDS.set(first, new Chord(first, third, quint));
  }
}