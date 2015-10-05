var SpaceHipster = SpaceHipster || {};

//title screen
SpaceHipster.Game = function(){};

generateCollectables: function() {
    this.collectables = this.game.add.group();

    //enable physics for the collectables
    this.collectables.enableBody = true;
    this.collectables.physicsBodyType = Phaser.Physics.ARCADE;

    //phasers random number generator
    var numCollectables = this.game.rnd.integerInRange(100, 150)
    var collectable;

    for (var i =0; i < numCollectables; i++) {
        //add sprite
        collectable = this.collectables.create(this.game.world.randomX, this.game.world.randomY, 'power');
        collectable.animations.add('fly', [0,1,2,3], 5, true);
        collectable.animations.play('fly');
    }
};

collect: function(player, collectable) {
    //play collect sound
    this.collectSound.play();

    //update score
    this.playerScore++;
    this.scoreLabel.text = this.playerScore;

    //remove collectable sprite
    collectable.kill()
}

//function to create asteroids
generateAsteroids: function() {
    //groups asteroids so they say the same properies
    this.asteroids = this.game.add.group()

    //enable physics for the asteroids
    this.asteroids.enableBody = true;
    this.asteroids.physicsBodyType = Phaser.Physics.ARCADE;

    //phasers random number generator creates a random number of asteroids
    var numberOfAsteroids = this.game.rnd.integerInRange(150, 200)
    var asteroid;

    for (var i =0; i<numberOfAsteroids; i++) {
        //add asteroid sprite
        asteroid = this.asteroids.create(this.game.world.randomX, this.game.world.randomY, 'rock');
        asteroid.scale.setTo(this.game.rnd.integerInRange(10, 40)/10);

        //physics for asteroids
        asteroid.body.velocity.x = this.game.rnd.integerInRange(-20,20);
        asteroid.body.velocity.y = this.game.rnd.integerInRange(-20,20);
        //trajectories are not affected when colliding with player
        asteroid.body.immovable = true;
        //keeps asteroids restricted within the world bounds
        asteroid.body.collideWorldBounds = true;
    }
};

//event -> hit asteroid
hitAsteroid: function(player, asteroid) {
    //play explosion sound
    this.explosionSound.play();

    //explode animation
    var emitter = this.game.add.emitter(this.player.x, this.player.y, 100);
    emitter.makeParticles('playerParticle');
    emitter.minParticleSpeed.setTo(-200, -200);
    emitter.maxParticleSpeed.setTo(200, 200);
    emitter.gravity = 0;
    //true creates a single explosion, which will last 1000 milliseconds.  Null defines how many per emission, and we will send 100 particles per explosion
    emitter.start(true, 1000, null, 100);
    this.player.kill();

    //call gameOver() in 800 milliseconds
    this.game.time.events.add(800, this.gameOver, this);
};

showLabels: function() {
    //score text
    var text = '0';
    var style = { font: '20px Arial', fill: '#fff', align: 'center'};
    this.scoreLabel = this.game.add.text(this.game.width-50, this.game.height - 50, text, style);
    //prevent the score from moving as the player's camera moves around the map
    this.scoreLabel.fixedToCamera = true;
}

SpaceHipster.Game.prototype = {
    create: function() {
        //set world dimensions
        this.game.world.setBounds(0,0,1920,1920);

        //set background
        this.background = this.game.add.tileSprite(0,0,this.game.world.width,this.game.world.height, 'space');

        //create player
        this.player = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'playership');
            //enlarges the player sprite
            this.player.scale.setTo(2);
            //repeats animations throughout the game.  Goes through each frame(array), and then calls the frequency of the animation
            //more documentation on animation(http://phaser.io/docs/2.4.3/Phaser.Animation.html)
            this.player.animations.add('fly', [0,1,2,3], 5, true);
            this.player.animations.play('fly');

        //sets initial score to 0
        this.playerScore = 0;

        //enable player physics
        this.game.physics.arcade.enable(this.player);
        this.playerSpeed=120;
        this.player.body.collideWorldBounds = true;

        this.generateCollectables();

        //create Asteroids
        this.generateAsteroids();

        //show score
        this.showLabels();
    },
    update: function() {
        if(this.game.input.activePointer.justPressed()) {

            //move towards the direction of the input
            this.game.physics.arcade.moveToPointer(this.player, this.playerSpeed);

            //collision between player and asteroids (stops player)
            this.game.physics.arcade.collide(this.player, this.asteroids, this.hitAsteroid, null, this);

            //overlap between player and collectable (does not affect player speed)
            this.game.physics.arcade.overlap(this.player, this.collectables, this.collect, null, this);
        }
    },

    //the camera will follow the player in the world
    this.game.camera.follow(this.player);

    //collision between player and asteroids
    this.game.physics.arcade.collide(this.player, this.asteroids, this.hitAsteroid, null, this);

    //sounds
    this.explosionSound = this.game.add.audio('explosion');
    this.collectSound = this.game.add.audio('collect');
}
