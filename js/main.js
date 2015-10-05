//creates a unique gamespace to work with.  If this namespace is already taken, we will use a new object.
var SpaceHipster = SpaceHipster || {};

//create a new game and set the size to of the entire window.  Phaser.AUTO determines if the game will be rendered in CANVAS or using WebGL
SpaceHipster.game = new Phaser.Game(window.innerWidth, window.innerHeight, Phaser.AUTO, '');

SpaceHipster.game.state.add('Boot', SpaceHipster.Boot);
SpaceHipster.game.state.add('Preload', SpaceHipster.Preload);
SpaceHipster.game.state.add('MainMenu', SpaceHipster.MainMenu);
SpaceHipster.game.state.add('Game', SpaceHipster.Game);


//After registering all the states, we launch the boot state
SpaceHipster.game.state.start('Boot');
