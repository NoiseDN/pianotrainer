function hit(key) {
  if (!pianoClickable) {
    return;
  } else if (!key) {
    return console.log('key undefined!');
  }

  switch (getSelectedLesson()) {
    case LESSON.NOTE_NAMES:
      lesson1_verifyPressed(key);
      break;
    case LESSON.TONE_SEMITONE:
      lesson3_verifyPressed(key);
      break;
    case LESSON.BUILD_CHORD:
      return lesson4_verifyPressed(key);
    default:
      throw 'Lesson ' + getSelectedLesson() + ' not implemented'
  }

  finishLesson();

  setTimeout(() => {
    startLesson();
  }, TIMEOUT);
}

function renderPiano() {
  const container = document.getElementById('piano');
  container.innerHTML = '';

  for (let octave = 0; octave <= OCTAVES + 1; octave++) {
    const whiteKeys = KEYS
      .filter(k => k.octave === octave)
      .filter(k => k.white);

    for (let j = 0; j < whiteKeys.length; j++) {
      container.appendChild(renderKey(whiteKeys[j]));
    }
  }
}

function renderKey(key) {
  const li = document.createElement("li");
  const anchor = document.createElement("div");
  addClass(anchor, 'anchor');
  anchor.setAttribute('id', 'key_' + key.note + key.octave);
  anchor.addEventListener('click', () => hit(key));
  li.appendChild(anchor);
  if (key.hasFlat()) {
    const span = document.createElement("span");
    addClass(span, 'flat');
    span.setAttribute('id', 'key_' + key.note + 'b' + key.octave);
    span.addEventListener('click', () => hit(key.getFlatKey()));
    li.appendChild(span);
  }
  return li;
}

function highlightSelectedOctave() {
  const keyElements = document.getElementsByClassName("anchor");
  for (let i = 0; i < keyElements.length; i++) {
    const keyElement = keyElements[i];
    removeClass(keyElement, 'active');
    if (keyElement.getAttribute('id').indexOf(selectedOctave + '') !== -1) {
      addClass(keyElement, 'active');
    }
  }
}
