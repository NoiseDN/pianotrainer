let mode = 'TONE';

function setTone() {
  mode = 'TONE';
  initialize();
}
function setSemitone() {
  mode = 'SEMITONE';
  initialize();
}

/**
 *  Lesson: Build tone / semitone
 *  Objective: learn tones and semitones
 */
function runToneSemitone() {
  pianoClickable = true;
  hideButtons();
  showSettings();

  // save note globally
  taskKey = getRandomKey(getRandomOctave());

  printDescription(getSelectedLesson().displayName +
      (mode === 'TONE' ? " - Build tone" : " - Build semitone"));

  printTask(taskKey.note);
  findElement(taskKey).classList.add("selected");
}

function verifyPressed() {
  const pressedEl = findElement(pressedKey);
  pressedEl.classList.remove('active');

  if (mode === 'TONE') {
    if (taskKey.isToneFor(pressedKey)) {
      pressedEl.classList.add('correct');
      printTask(pressedKey.note + " - Correct! :)");
      correct++;
    } else {
      pressedEl.classList.add('wrong');
      //TODO make tone key green
      printTask(pressedKey.note + " - Wrong! :(");
    }
  } else {
    if (taskKey.isSemitoneFor(pressedKey)) {
      pressedEl.classList.add('correct');
      printTask(pressedKey.note + " - Correct! :)");
      correct++;
    } else {
      pressedEl.classList.add('wrong');
      //TODO make tone key green
      printTask(pressedKey.note + " - Wrong! :(");
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