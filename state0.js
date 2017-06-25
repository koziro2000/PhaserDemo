var demo = {}, centerX = 1500/2, centerY = 1000/2, adam, speed = 6;
var isSwingSowrd = false, swingTime = 0, swingDuration = 10;
var scaleSetVal = 1;
demo.state0 = function() {};
demo.state0.prototype = {
    preload: function(){
        game.load.spritesheet('adam', 'assets/spritesheets/Daddy.png', 320, 320);
        game.load.image('tree', 'assets/backgrounds/streetBG.png');
    },
    create:  function(){        
        game.physics.startSystem(Phaser.Physics.ARCADE);
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
        adam.animations.add('punch', [4, 5, 6, 7, 8]);
        game.camera.follow(adam);
        game.camera.deadzone = new Phaser.Rectangle(centerX - 300, 0, 600, 1000);
        
        this.leftKey = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
        this.rightKey = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
        this.downKey = game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
        this.upKey = game.input.keyboard.addKey(Phaser.Keyboard.UP);
        this.spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        
        this.spaceKey.onDown.add(throwPunch, this);

        //  Stop the following keys from propagating up to the browser
        game.input.keyboard.addKeyCapture([ Phaser.Keyboard.LEFT, Phaser.Keyboard.RIGHT, Phaser.Keyboard.SPACEBAR, Phaser.Keyboard.UP, Phaser.Keyboard.DOWN]);
    },
    update: function(){
/*
        if (this.spaceKey.isDown) {
            throwPunch();
            return;
        }
*/
        
        if(this.rightKey.isDown) {
            adam.scale.setTo(scaleSetVal, scaleSetVal);
            adam.x += speed;
        } 
        else if(this.leftKey.isDown) {
            adam.scale.setTo(-scaleSetVal, scaleSetVal);
            adam.x -= speed;
        }

        if(this.upKey.isDown) {
            adam.y -= speed;
            if (adam.y < 395) {
                adam.y = 395;
            }            
        } 
        else if(this.downKey.isDown) {
            adam.y += speed;            
        }
        
        if (this.leftKey.isDown || this.rightKey.isDown || this.upKey.isDown || this.downKey.isDown){
            adam.animations.play('walk', 12, true);    
        } else {
            if (!isSwingSowrd) {
                adam.animations.stop();
                adam.frame = 0;            
            }
        }
    }
};

function throwPunch() {
    if (this.leftKey.isDown || this.rightKey.isDown || this.upKey.isDown || this.downKey.isDown){
        return;
    }
    isSwingSowrd = true;
    adam.animations.play('punch', 12, false).onComplete.add(
        function() {
            console.log("throw punch!");
            isSwingSowrd = false;
        }
    );
}

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