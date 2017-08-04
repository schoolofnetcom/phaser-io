var game = new Phaser.Game(800,600,Phaser.AUTO,'',{
	preload: preload,
	create: create,
	update: update
});

var plataformas;
var personagem;
var tecla;
var estrelas;
var pontuacao = 0 ;
var pontuacaoTexto;

function preload(){
 game.load.image('ceu','sprites/sky.png');
 game.load.image('chao','sprites/platform.png');
 game.load.image('estrela', 'sprites/star.png');
 game.load.spritesheet('personagem', 'sprites/dude.png', 32, 48);
 tecla = game.input.keyboard.createCursorKeys();
}

function create(){

 game.physics.startSystem(Phaser.Physics.ARCADE);

 game.add.sprite(0,0,'ceu');

 pontuacaoTexto = game.add.text(10,10,'Pontos: 0',{'fontSize':'24px', 'fill':'#fff'});

 plataformas = game.add.group();

 plataformas.enableBody = true;

 var chao = plataformas.create(0,game.world.height - 64, 'chao');

 chao.scale.setTo(2,2);

 chao.body.immovable = true;

 var chaoAlto = plataformas.create(400,400,'chao');

 chaoAlto.body.immovable = true;

 chaoAlto = plataformas.create(-100,300,'chao');
 chaoAlto.body.immovable = true;

  personagem = game.add.sprite(15,game.world.height - 150,'personagem');

  game.physics.arcade.enable(personagem);
  personagem.body.bounce.y = 0.02;
  personagem.body.gravity.y = 300;
  personagem.body.collideWorldBounds = true;

  personagem.animations.add('esquerda', [0,1,2,3], 10, true);
  personagem.animations.add('direita', [5,6,7,8], 10, true);

   estrelas = game.add.group();
   estrelas.enableBody = true;

   for (var i = 0; i < 25; i++) {
   	var estrela =  estrelas.create(i * 50,0,'estrela');

	  estrela.body.gravity.y = 12;
	  estrela.body.bounce.y = 0.3 + Math.random() * 0.2;
   }
}

function update(){

 var noChao = game.physics.arcade.collide(personagem, plataformas);
 
 game.physics.arcade.collide(estrelas, plataformas);

 game.physics.arcade.overlap(personagem, estrelas, coleta, null,this);

  personagem.body.velocity.x = 0;

  if(tecla.right.isDown){
  	personagem.body.velocity.x = 300;
  	personagem.animations.play('direita');

  }else if(tecla.left.isDown){
  	personagem.body.velocity.x = -300;
  	personagem.animations.play('esquerda');
  }else{
  	personagem.animations.stop();
  	personagem.frame = 4;
  }

  if(tecla.up.isDown && noChao && personagem.body.touching.down){
  	personagem.body.velocity.y = -400;
  }

}


function coleta(personagem, estrela){

	estrela.kill();
	pontuacao += 10;
	pontuacaoTexto.text = "Pontos: " + pontuacao;

}