define(function (require) {

  var tileManager, heroTile, moveBools;
  var deltaX = 16;
  var deltaY = 16;
  var ticksToJump = 6;
  var ticksJumped = 0;

  var init = function(tm) {
    tileManager = tm;
    var coords = tileManager.tileToCoords(2, 1);
    heroTile = tileManager.createTile(coords.x, coords.y, "hero");
    drawHero();
    moveBools = {
      "moveLeft": false,
      "moveRight": false,
      "jump": false,
      "fall": false,
    };
  };

  var drawHero = function() {
    tileManager.drawEntity(heroTile);
  };

  var setMoveBools = function(option, state) {
    switch(option) {
      case "jump":
        moveBools["jump"] = checkJump(state) ? true : moveBools["jump"];
        break;
      case "fall":
        moveBools["fall"] = checkFall(state) ? true : moveBools["jump"];
        break;
      default:
        moveBools[option] = state;
        break;
    }
  };

  var checkJump = function(state) {
    return state && !moveBools["fall"] && !moveBools["jump"];
  };

  var checkFall = function() {
    return state && !moveBools["fall"] && !moveBools["jump"];
  };

  var checkMoveLeft = function() {
    // TODO
  };

  var checkMoveRight = function() {
    // TODO
  };

  var resetMoveBools = function() {
    moveBools = {
      moveLeft: false,
      moveRight: false,
      jump: false,
      fall: false,
    };
  };

  /**
    Returns true if re-rendering is needed
  */
  var onTick = function() {
    var changeX = 0;
    var changeY = 0;

    if (moveBools["moveLeft"]) {
      changeX -= deltaX;
    }

    if (moveBools["moveRight"]) {
      changeX += deltaX;
    }

    if (moveBools["jump"]) {
      if (ticksJumped < ticksToJump) {
        changeY += deltaY;
        ticksJumped++;
      } else {
        moveBools["jump"] = false;
        moveBools["fall"] = true;
      }
    }

    if (moveBools["fall"]) {
      if (ticksJumped > 0) {
        changeY -= deltaY;
        ticksJumped--;
      } else {
        moveBools["fall"] = false;
      }
    }

    if (changeX !== 0 || changeY !== 0) {
      heroTile.x += changeX;
      heroTile.y -= changeY;
      return {
        change: true,
        x: changeX,
        y: changeY
      };
    } else {
      return {
        change: false
      }
    }
  };

  return {
    init: init,
    drawHero: drawHero,
    onTick: onTick,
    setMoveBools: setMoveBools
  };

});
