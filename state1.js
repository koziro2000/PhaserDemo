demo.state1 = function() {};
demo.state1.prototype = {
    preload: function(){},
    create:  function(){
        game.stage.backgroundColor="#a35869";
        addChangeStateEventListeners();
    },
    update: function(){}
};