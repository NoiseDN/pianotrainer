/**
 *  Lesson: Key names
 *  Objective: learn the notes placement on a piano
 */
function runNoteNames() {
  enablePiano();
  hideButtons();
  selectRandomOctave();
  highlightSelectedOctave();

  setRandomKey();
  debug && console.log('task key: ', taskKey);
  debug && findElement(taskKey).classList.add('debug');

  setTask(taskKey.note);
}

function lesson1_verifyPressed() {
  const pressedEl = findElement(pressedKey);
  addClass(pressedEl, 'active');

  debug && console.log('pressed key: ', pressedKey);

  if (pressedKey.equals(taskKey)) {
    addClass(pressedEl,'correct');
    setTask(taskKey.note  + " - Correct! :)");
    correctAnswer();
  } else {
    addClass(pressedEl,'wrong');
    const taskEl = findElement(taskKey);
    removeClass(taskEl, 'active');
    addClass(taskEl,'correct');
    setTask(pressedKey.note + " - Wrong! :(");
  }
}
