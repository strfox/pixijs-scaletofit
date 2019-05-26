"use strict";

var WIDTH = 600;
var HEIGHT = 650;

var app = new PIXI.Application({
  width: WIDTH,
  height: HEIGHT
});

app.renderer.backgroundColor = 0xffffff;

/**
 * @param {PIXI.Application} app
 * @returns {Function}
 */
function resize(app) {
  return function() {
    const vpw = window.innerWidth; // Width of the viewport
    const vph = window.innerHeight; // Height of the viewport
    let nvw; // New game width
    let nvh; // New game height

    // The aspect ratio is the ratio of the screen's sizes in different dimensions.
    // The height-to-width aspect ratio of the game is HEIGHT / WIDTH.

    if (vph / vpw < HEIGHT / WIDTH) {
      // If height-to-width ratio of the viewport is less than the height-to-width ratio
      // of the game, then the height will be equal to the height of the viewport, and
      // the width will be scaled.
      nvh = vph;
      nvw = (nvh * WIDTH) / HEIGHT;
    } else {
      // In the else case, the opposite is happening.
      nvw = vpw;
      nvh = (nvw * HEIGHT) / WIDTH;
    }

    // Set the game screen size to the new values.
    // This command only makes the screen bigger --- it does not scale the contents of the game.
    // There will be a lot of extra room --- or missing room --- if we don't scale the stage.
    app.renderer.resize(nvw, nvh);

    // This command scales the stage to fit the new size of the game.
    app.stage.scale.set(nvw / WIDTH, nvh / HEIGHT);
  };
}

// Perform initial resizing
resize(app)();
// Add event listener so that our resize function runs every time the
// browser window is resized.
window.addEventListener("resize", resize(app));

// Add our cat image
PIXI.Loader.shared.add("cat", "cat.jpeg").load(onLoad);

function onLoad() {
  console.log("Done loading resources!");
  document.body.appendChild(app.view);

  const cat = PIXI.Sprite.from("cat");
  app.stage.addChild(cat);
}
