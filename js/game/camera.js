define(function (require) {

  // Basically the offset of the tiles currently seen

  var x, y;
  var canvas = document.getElementById("canvas");
  var ctx = canvas.getContext("2d");

  var init = function(initX, initY) {
    x = 0;
    y = 0;

    ctx.translate(initX, initY);
  };

  /**
    NOT SURE THIS WORKS
  */
  var move = function(deltaX, deltaY) {
    ctx.translate(deltaX, deltaY);
  };

  return {
    init: init,
    move: move
  };

});
