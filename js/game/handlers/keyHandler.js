define(function() {

  var heroMoveFun;

  var init = function(hmf) {
    heroMoveFun = hmf;
    window.addEventListener("keydown", handleKeyDown, true);
    window.addEventListener("keyup", handleKeyUp, true);
  };

  var handleKeyDown = function(event) {
    var key = event.keyCode;
    parseKey(key, true);
  };

  var handleKeyUp = function(event) {
    var key = event.keyCode;
    parseKey(key, false);
  };

  var parseKey = function(key, state) {
    switch (key) {
      case 37: // left
        heroMoveFun("moveLeft", state);
        break;
      case 38: // up
        heroMoveFun("jump", state);
        break;
      case 39: // right
        heroMoveFun("moveRight", state);
        break;
    }
  };

  return {
    init: init
  };
});
