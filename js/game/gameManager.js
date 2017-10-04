define(function (require) {
  var tileManager = require("./tileManager");
  var camera = require("./camera");
  var hero = require("./hero");
  var keyHandler = require("./handlers/keyHandler")

  var canvas = document.getElementById("canvas");
  var ctx = canvas.getContext("2d");

  var tileSize = 64;
  var tilesHigh = 8;
  var tilesWide = 12;

  var init = function() {
    camera.init(0, tileSize * (tilesHigh - 1));
    keyHandler.init(hero.setMoveBools);

    tileManager.init()
    .then(function() {
      hero.init(tileManager, keyHandler);
    });

    setInterval(onTick, 100);
  };

  var onTick = function() {
    var heroTick = hero.onTick();

    if (heroTick.change) {
      console.log("move");
      // clear the canvas
      ctx.clearRect(0,0,canvas.width,canvas.height);

      tileManager.drawMapTiles();
      camera.move(-heroTick.x, heroTick.y);

      hero.drawHero();
    }
  };



  return {
    init: init,
  };
});
