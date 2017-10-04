define(function (require) {

  // Canvas is 64*12 wide and 64*8 high so
  var canvas = document.getElementById("canvas");
  var ctx = canvas.getContext("2d");
  var tileSize = 64;
  var tilesHigh = 8;
  var tilesWide = 12;

  var defaultMap = require("./maps/defaultMap");

  var tilesCache = {};
  var tilePromises = [];

  var mapTiles = [];

  var init = function() {
    return new Promise(function(resolve, reject) {
      loadTiles();

      Promise.all(tilePromises).then(function() {
        parseMap(defaultMap);
        drawMapTiles();
        resolve();
      });
    });
  };

  var loadTiles = function() {
    var tileBaseSrc = "resources/tiles/";
    var tilesData = [
      {
        src: "base.png",
        name: "base"
      },
      {
        src: "hero.png",
        name: "hero"
      }
    ];

    tilePromises = tilesData.map(function(tile) {
      return createImg(tileBaseSrc + tile.src, tile.name);
    });
  };

  var createImg = function(src, name) {
    return new Promise(function(resolve, reject) {
      var img = new Image();
      img.src = src;

      img.onload = function() {
        tilesCache[name] = img;
        resolve();
      };
      img.onerror = function(e) {
        console.error("ERROR: image failed to load");
        reject(e);
      };
    });
  };

  var drawMapTiles = function() {
    console.log("drawing");
    for (var i = 0; i < mapTiles.length; i++) {
      drawTile(mapTiles[i]);
    }
  };

  var parseMap = function(map) {
    var tiles = map.tileMap;
    for (var tileType in tiles) {
      if (tiles.hasOwnProperty(tileType) && tiles.hasOwnProperty(tileType)) {
        parseMapTiles(tiles[tileType], tileType);
      }
    }
  };

  var parseMapTiles = function(tiles, tileType) {
    for (var r = 0; r < tiles.length; r++) {
      for (var c = 0; c < tiles[r].length; c++) {
        if (tiles[r][c] === 1) {
          var tile = createTile(c, r, tileType);
          mapTiles.push(tile);
          // drawTile(tile);
        }
      }
    }
  };

  var drawTile = function(tile) {
    var coords = tileToCoords(tile.x, tile.y);
    ctx.drawImage(tilesCache[tile.type], coords.x, coords.y);
  };

  var drawEntity = function(entity) {
    ctx.drawImage(tilesCache[entity.type], entity.x, entity.y);
  };

  var tileToCoords = function(tileX, tileY) {
    if (tileX < 0 || tileY < 0 || tileY > tilesHigh) {
      // do nothing
      return null;
    } else {
      var coordX = tileSize * tileX;
      var coordY = -(tileSize * tileY);

      return {
        x: coordX,
        y: coordY
      };
    }
  };

  var createTile = function(x, y, type) {
    return {
      x: x,
      y: y,
      type: type
    };
  };

  return {
    init: init,
    tileToCoords: tileToCoords,
    createTile: createTile,
    drawTile: drawTile,
    drawEntity: drawEntity,
    drawMapTiles: drawMapTiles
  };

});
