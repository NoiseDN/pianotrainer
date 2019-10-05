/**
 *  Lesson: Key names
 *  Objective: learn the notes placement on a piano
 */
function runNoteNames() {
  pianoClickable = true;

  hideButtons();
  highlightRandomOctave();

  // save note globally
  taskKey = getRandomKey(selectedOctave);

  printTask(taskKey.note);
}

function hit(key) {
  if (!pianoClickable || !key) {
    return;
  }

  // save key globally
  pressedKey = key;

  const pressedEl = findElement(pressedKey);
  pressedEl.classList.remove('active');
  if (pressedKey.equals(taskKey)) {
    pressedEl.classList.add('correct');
    printTask(taskKey.note  + " - Correct! :)");
    correct++;
  } else {
    pressedEl.classList.add('wrong');
    const taskNode = findElement(taskKey);
    taskNode.classList.remove('active');
    taskNode.classList.add('correct');
    printTask(pressedKey.note + " - Wrong! :(");
  }
  total++;

  setTimeout(() => {
    startLesson(LESSON.NOTE_NAMES);
  }, 1000);
}

function highlightRandomOctave() {
  selectedOctave = getRandomOctave();

  const keys = document.getElementsByClassName("key");
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    key.classList.remove('active');
    if (key.getAttribute('id').indexOf(selectedOctave + '') !== -1) {
      key.classList.add('active');
    }
  }
}
