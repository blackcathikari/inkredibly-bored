requirejs.config({
    baseUrl: 'js',
    paths: {
        game: '../js/game',
    }
});

requirejs(["game/gameManager"], function(gm) {
    //This function is called when scripts/helper/util.js is loaded.
    //If util.js calls define(), then this function is not fired until
    //util's dependencies have loaded, and the util argument will hold
    //the module value for "helper/util".

    gm.init();
});
