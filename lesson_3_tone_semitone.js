const MODE = Object.freeze({ TONE: 1, SEMITONE: 2 });
let mode = MODE.TONE;

function setTone() {
  mode = MODE.TONE;
  startLesson();
}
function setSemitone() {
  mode = MODE.SEMITONE;
  startLesson();
}

/**
 *  Lesson: Build tone / semitone
 *  Objective: learn tones and semitones
 */
function runToneSemitone() {
  enablePiano();
  hideButtons();
  hideAllLessonSettings();
  showLesson3Settings();
  setTask('...');

  selectRandomOctave();
  setRandomKey();
  debug && console.log('task key: ', taskKey);
  if (debug && mode === MODE.TONE) {
    addClass(findElement(taskKey.getTone()), 'debug');
  }
  if (debug && mode === MODE.SEMITONE) {
    addClass(findElement(taskKey.getSemitone()), 'debug');
  }

  setDescription('Build ' + (mode === MODE.TONE ? '' : 'semi') + 'tone');

  addClass(findElement(taskKey), 'active');
}

function lesson3_verifyPressed(pressedKey) {
  const pressedEl = findElement(pressedKey);
  removeClass(pressedEl, 'active');

  debug && console.log('pressed key: ', pressedKey);

  if (mode === MODE.TONE) {
    if (pressedKey.isToneFor(taskKey)) {
      addClass(pressedEl, 'correct');
      setTask(pressedKey.note + ' - Correct! :)');
      correctAnswer();
    } else {
      addClass(pressedEl, 'wrong');
      const toneKey = taskKey.getTone();
      addClass(findElement(toneKey), 'correct');
      setTask(pressedKey.note + ' - Wrong! :( Correct - ' + toneKey.note);
    }
  } else {
    if (pressedKey.isSemitoneFor(taskKey)) {
      addClass(pressedEl, 'correct');
      setTask(pressedKey.note + ' - Correct! :)');
      correctAnswer();
    } else {
      addClass(pressedEl, 'wrong');
      const semitoneKey = taskKey.getSemitone();
      addClass(findElement(semitoneKey), 'correct');
      setTask(pressedKey.note + ' - Wrong! :( Correct - ' + semitoneKey.note);
    }
  }
}

function showLesson3Settings() {
  document.getElementById('lesson3-tone').style.display = 'inline-block';
  document.getElementById('lesson3-semitone').style.display = 'inline-block';
}

function hideLesson3Settings() {
  document.getElementById('lesson3-tone').style.display = 'none';
  document.getElementById('lesson3-semitone').style.display = 'none';
}