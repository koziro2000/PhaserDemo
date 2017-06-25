var game = new Phaser.Game(640, 360, Phaser.AUTO);

var GameState = {
    preload: function() {
        this.load.image('background', 'assets/images/background.png');
        this.load.image('chicken', 'assets/images/chicken.png');
        this.load.image('horse', 'assets/images/horse.png');
        this.load.image('pig', 'assets/images/pig.png');
        this.load.image('sheep', 'assets/images/sheep3.png');
        this.load.image('arrow', 'assets/images/arrow.png');
        
    },
    create: function() {
        
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = true;
        this.scale.updateLayout(true);
        
        this.background = this.game.add.sprite(0, 0, 'background');
        
        var animalData = [
          {key: 'chicken', text: 'CHICKEN'},
          {key: 'horse', text: 'HORSE'},
          {key: 'pig', text: 'PIG'},
          {key: 'sheep', text: 'SHEEP'}
        ];
        
        this.animals = this.game.add.group();
        
        var self = this;
        var animal;
        
        animalData.forEach(function(element){
            animal = self.animals.create(-1000, self.game.world.centerY, element.key);
            
            animal.customParams = {text: element.text};
            animal.anchor.setTo(0.5);
            
            animal.inputEnabled = true;
            animal.input.pixelPerfectClick = true;
            animal.events.onInputDown.add(self.animateAnimal, this);
        });

        this.currentAnimal = this.animals.next();
        this.currentAnimal.position.set(this.game.world.centerX, self.game.world.centerY);
        
        this.leftArrow = this.game.add.sprite(60, this.game.world.centerY, 'arrow');
        this.leftArrow.anchor.setTo(0.5);
        this.leftArrow.scale.x = -1;
        this.leftArrow.customParams = {direction: -1};
        
        this.leftArrow.inputEnabled = true;
        this.leftArrow.input.pixelPerfectClick = true;
        this.leftArrow.events.onInputDown.add(this.switchAnimal, this);
        
        this.rightArrow = this.game.add.sprite(580, this.game.world.centerY, 'arrow');
        this.rightArrow.anchor.setTo(0.5);
        this.rightArrow.customParams = {direction: 1};

        this.rightArrow.inputEnabled = true;
        this.rightArrow.input.pixelPerfectClick = true;
        this.rightArrow.events.onInputDown.add(this.switchAnimal, this);

    },
    update: function() {
    },
    animateAnimal: function(sprite, event) {
        console.log('animate animal');
    },
    switchAnimal: function(sprite, event) {
        var newAnimal, endX;
        
        if(sprite.customParams.direction > 0) {
            newAnimal = this.animals.next();
            newAnimal.x = -newAnimal.width/2;
            endX = 640 + this.currentAnimal.width/2;
        } else {
            newAnimal = this.animals.previous();
            newAnimal.x = 640 + newAnimal.width/2;
            endX = -this.currentAnimal.width/2;
        }
        
        console.log(this.currentAnimal.customParams.text + ' ' + newAnimal.customParams.text);

        var newAnimalMovement = game.add.tween(newAnimal);
        newAnimalMovement.to({x: this.game.world.centerX}, 1000);
        newAnimalMovement.start();
        
        var currentAnimalMovement = game.add.tween(this.currentAnimal);
        currentAnimalMovement.to({x: endX}, 1000);
        currentAnimalMovement.start();
        
        this.currentAnimal = newAnimal;
        
    }
};

game.state.add('GameState', GameState);
game.state.start('GameState');