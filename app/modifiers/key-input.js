import { modifier } from 'ember-modifier';

export default modifier(function keyInput(element, [callback]) {
  const keyInputs = {
    37: 'left',
    38: 'up',
    39: 'right',
  };

  function keyHandler(ev) {
    const { keyCode } = ev;
    const pressedKey = keyInputs[keyCode];
    if (pressedKey) {
      callback(pressedKey);
    }
  }

  document.addEventListener('keydown', keyHandler);

  // remove event after it's no longer in use
  return () => {
    document.removeEventListener('keydown', keyHandler);
  };
});
