let mode = 'TONE';

function setTone() {
  mode = 'TONE';
  startLesson();
}
function setSemitone() {
  mode = 'SEMITONE';
  startLesson();
}

/**
 *  Lesson: Build tone / semitone
 *  Objective: learn tones and semitones
 */
function runToneSemitone() {
  pianoClickable = true;
  hideButtons();
  showSettings();
  printTask('...');

  selectedOctave = getRandomOctave();
  taskKey = getRandomKey();
  debug && console.log('task key: ', taskKey);
  if (debug && mode === 'TONE') {
    findElement(taskKey.getTone()).classList.add('debug');
  }
  if (debug && mode === 'SEMITONE') {
    findElement(taskKey.getSemitone()).classList.add('debug');
  }

  printDescription(getSelectedLesson().displayName +
      (mode === 'TONE' ? " - Build tone" : " - Build semitone"));

  findElement(taskKey).classList.add("selected");
}

function lesson3_verifyPressed() {
  const pressedEl = findElement(pressedKey);
  pressedEl.classList.remove('active');

  debug && console.log('pressed key: ', pressedKey);

  if (mode === 'TONE') {
    if (pressedKey.isToneFor(taskKey)) {
      pressedEl.classList.add('correct');
      printTask(pressedKey.note + " - Correct! :)");
      correct++;
    } else {
      pressedEl.classList.add('wrong');
      const toneKey = taskKey.getTone();
      findElement(toneKey).classList.add('correct');
      printTask(pressedKey.note + " - Wrong! :( Correct - " + toneKey.note);
    }
  } else {
    if (pressedKey.isSemitoneFor(taskKey)) {
      pressedEl.classList.add('correct');
      printTask(pressedKey.note + " - Correct! :)");
      correct++;
    } else {
      pressedEl.classList.add('wrong');
      const semitoneKey = taskKey.getSemitone();
      findElement(semitoneKey).classList.add('correct');
      printTask(pressedKey.note + " - Wrong! :( Correct - " + semitoneKey.note);
    }
  }
}

function showSettings() {
  document.getElementById('lesson3-tone').style.display = 'inline-block';
  document.getElementById('lesson3-semitone').style.display = 'inline-block';
}

function hideSettings() {
  document.getElementById('lesson3-tone').style.display = 'none';
  document.getElementById('lesson3-semitone').style.display = 'none';
}