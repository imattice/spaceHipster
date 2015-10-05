//the boot state defines the screen size and other game configurations, such as deterimining the physics engine and load assests that will be shown in the Preload state

var SpaceHipster = SpaceHipster || {};

SpaceHipster.Boot = function(){};

//setting game configuration and loading the assets for the loading screen
SpaceHipster.Boot.prototype = {
    preload: function() {
        //assets we will use in the loading screen
        this.load.image('logo', 'assets/images/logo.png');
        this.load.image('preloader', 'assets/images/preloader-bar.png');
    },
    create: function () {
        //loading screen will have a white background
        this.game.state.backgroundColor = '#fff';

        //scaling options
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.scale.minWidth = 240;
        this.scale.minHeight = 170;
        this.scale.maxWidth = 2880;
        this.scale.maxHeight = 1920;

        //centers the game horizontally
        this.scale.pageAlignHOrizontally = true;

        //screen size will be set automatically
        // this.scale.setScreenSize(true);

        //physics for movement
        this.game.physics.startSystem(Phaser.Physics.ARCADE),

            this.state.start('Preload');
    }
};
