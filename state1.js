var demo = {};
demo.state1 = function() {};
demo.state1.prototype = {
    preload: function(){},
    create:  function(){
        game.stage.backgroundColor="#4c80d3";
        console.log('state1');
    },
    update: function(){}
};