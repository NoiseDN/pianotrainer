const L4_MODE = Object.freeze({ MINOR: 1, MAJOR: 2 });
let l4_mode = L4_MODE.MAJOR;
let playedChord = new Chord();

function setL4Minor() {
  l4_mode = L4_MODE.MINOR;
  startLesson();
}

function setL4Major() {
  l4_mode = L4_MODE.MAJOR;
  startLesson();
}

/**
 *  Lesson: Build chord
 *  Objective: learn minor and major chords
 */
function runBuildChord() {
  enablePiano();
  hideButtons();
  hideAllLessonSettings();
  showLesson4Settings();
  selectRandomOctave();
  highlightSelectedOctave();

  setRandomKey();

  debug && console.log('task key: ', taskKey);
  debug && taskKey.getChord(isMajor()).forEach(chord =>
    findElement(chord).classList.add('debug'));

  setDescription('Build ' + (isMajor() ? 'major' : 'minor') + ' chord');

  setTask(taskKey.note + (isMajor() ? '' : 'm'));
}

function lesson4_verifyPressed(pressedKey) {
  const pressedEl = findElement(pressedKey);
  addClass(pressedEl, 'selected');

  debug && console.log('pressed key: ', pressedKey);

  playedChord.play(pressedKey);
  if (playedChord.size() < 3) {
    return;
  }

  const taskChord = taskKey.getChord(isMajor());
  debug && console.log('task chord', taskChord.toStr());
  debug && console.log('played chord', playedChord.toStr());

  if (playedChord.equals(taskChord)) {
    playedChord.forEach(chord =>
      addClass(findElement(chord), 'correct'));
    setTask('Correct :)');
    correctAnswer();
  } else {
    playedChord.forEach(chord =>
      addClass(findElement(chord), 'wrong'));
    taskChord.forEach(chord =>
      addClass(findElement(chord), 'correct'));
    setTask('Wrong :(');
  }

  finishLesson();
  playedChord = new Chord();

  setTimeout(() => {
    startLesson();
  }, TIMEOUT);
}

function isMajor() {
  return l4_mode === L4_MODE.MAJOR;
}

function showLesson4Settings() {
  document.getElementById('lesson4-minor').style.display = 'inline-block';
  document.getElementById('lesson4-major').style.display = 'inline-block';
}

function hideLesson4Settings() {
  document.getElementById('lesson4-minor').style.display = 'none';
  document.getElementById('lesson4-major').style.display = 'none';
}