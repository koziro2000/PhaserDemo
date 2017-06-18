demo.state2 = function() {};
demo.state2.prototype = {
    preload: function(){},
    create:  function(){
        game.stage.backgroundColor="#3786a8";
        addChangeStateEventListeners();
    },
    update: function(){}
};