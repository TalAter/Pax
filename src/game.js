import renderer from './renderer';

/**
 * Initialize the game
 */
const init = function() {
  renderer.init();
  requestAnimationFrame(update);
};

/**
 * Update the state of the game at the beggining of each frame
 */
const update = function() {
  render();
};

/**
 * Render the current state of the game to the view
 */
const render = function() {
  renderer.render();
  requestAnimationFrame(update);
};

/**
 * Expose functionality
 */
export default {
  init
};
