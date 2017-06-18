demo.state3 = function() {};
demo.state3.prototype = {
    preload: function(){},
    create:  function(){
        game.stage.backgroundColor="#3cd880";
        addChangeStateEventListeners();
    },
    update: function(){}
};