//loads the game assets.  These could, in theory, be handled in the Boot state, but are not because game assets usually take longer than the Preload assests, which are designed to be lightweight.
var SpaceHipster = SpaceHipster || {};

//loads game assets
SpaceHipster.Preload = function(){};

SpaceHipster.Preload.prototype = {
    preload: function () {
        //display logo on loading screen
        this.splash = this.add.sprite(this.game.world.centerX, this.game.world.centerY +128, 'logo');
            this.splash.anchor.setTo(0.5);

            //load sprites into the screen.  Their coordinates are defined and the name of the asset.
            this.preloadBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY +128, 'preloadbar');
            this.preloadBar.anchor.setTo(0.5);

            //grabs the sprite and makes it into a loading bar (more info: http://phaser.io/docs/2.4.3/Phaser.Loader.html#setPreloadSprite)
            this.load.setPreloadSprite(this.preloadBar);

            //load game assets
            this.load.image('space', 'assets/images/space.png');
            this.load.image('rock', 'assets/images/rock.png');
                this.load.spritesheet('playership', 'assets/images/player.png', 12, 12);
                this.load.spritesheet('power', 'assets/images/power.png', 12, 12);
            this.load.image('playerParticle', 'assets/images/player-particle.png');
                this.load.audio('collect', 'assets/audio/collect.ogg');
                this.load.audio('explosion', 'assets/audio/explosion.ogg');
    },

    create: function() {
        this.state.start('MainMenu');
    }
};
