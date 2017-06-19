var demo = {}, centerX = 1500/2, centerY = 1000/2, adam, speed = 6;
var isSwingSowrd = false, swingTime = 0, swingDuration = 10;
var scaleSetVal = 1;
demo.state0 = function() {};
demo.state0.prototype = {
    preload: function(){
        game.load.spritesheet('adam', 'assets/spritesheets/Daddy.png', 320, 320);
        game.load.image('tree', 'assets/backgrounds/treeBG.png');
    },
    create:  function(){        
        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.stage.backgroundColor="#ea1985";
        addChangeStateEventListeners();
        game.world.setBounds(0, 0, 2813, 1000);
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        
        var treeBG = game.add.sprite(0, 0, 'tree');
        adam = game.add.sprite(centerX, centerY, 'adam');
        adam.anchor.setTo(0.5, 0.5);
        adam.scale.setTo(scaleSetVal, scaleSetVal);
        
        game.physics.enable(adam);
        adam.body.collideWorldBounds = true;
        adam.animations.add('walk', [0, 1, 2, 3]);
        adam.animations.add('punch', [4, 5, 6]);
        game.camera.follow(adam);
        game.camera.deadzone = new Phaser.Rectangle(centerX - 300, 0, 600, 1000);
    },
    update: function(){
        if(game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
            adam.scale.setTo(scaleSetVal, scaleSetVal);
            adam.x += speed;
            adam.animations.play('walk', 14, true);
        } 
        else if(game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
            adam.scale.setTo(-scaleSetVal, scaleSetVal);
            adam.x -= speed;
            adam.animations.play('walk', 14, true);
        }
        else {
            adam.animations.stop('walk');
            if(!isSwingSowrd) adam.frame = 0;
        }

        if(game.input.keyboard.isDown(Phaser.Keyboard.UP)) {
            adam.y -= speed;
            if (adam.y < 395) {
                adam.y = 395;
            }            
        } 
        else if(game.input.keyboard.isDown(Phaser.Keyboard.DOWN)) {
            adam.y += speed;            
        }
        
        if((game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR))) {
            if(!isSwingSowrd && swingTime == 0) {
                adam.animations.play('punch');
                isSwingSowrd = true;
            } else {
                console.log('Already Swinging');
            }
        }
        
        if (isSwingSowrd && swingTime >= swingDuration) {
            isSwingSowrd = false;
            swingTime = 0;
            adam.animations.stop('punch');
            adam.frame = 0;
        } else if (isSwingSowrd && swingTime < swingDuration) {
            swingTime += 1;
        }
    }
};

function changeState(i, stateNum) {
    console.log('state' + stateNum);
    game.state.start('state' + stateNum);
}

function addKeyCallback(key, fn, args) {              
    game.input.keyboard.addKey(key).onDown.add(fn, null, null, args);  
}

function addChangeStateEventListeners() {
    addKeyCallback(Phaser.Keyboard.ZERO, changeState, 0);
    addKeyCallback(Phaser.Keyboard.ONE, changeState, 1);
    addKeyCallback(Phaser.Keyboard.TWO, changeState, 2);
    addKeyCallback(Phaser.Keyboard.THREE, changeState, 3);
    addKeyCallback(Phaser.Keyboard.FOUR, changeState, 4);
    addKeyCallback(Phaser.Keyboard.FIVE, changeState, 5);
    addKeyCallback(Phaser.Keyboard.SIX, changeState, 6);
    addKeyCallback(Phaser.Keyboard.SEVEN, changeState, 7);
    addKeyCallback(Phaser.Keyboard.EIGHT, changeState, 8);
    addKeyCallback(Phaser.Keyboard.NINE, changeState, 9);    
}