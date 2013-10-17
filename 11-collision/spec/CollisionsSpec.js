describe("collisionSpec",function(){

	beforeEach(function(){
	
			loadFixtures('index.html');
		
			canvas = $('#game')[0];
			expect(canvas).toExist();

			ctx = canvas.getContext('2d');
			expect(ctx).toBeDefined();
			
			SpriteSheet = {
				draw : function () {},
				map : {ship: { sx: 0, sy: 0, w: 37, h: 42, frames: 1 },
    				missile: { sx: 0, sy: 30, w: 2, h: 10, frames: 1 },
    				enemy_purple: { sx: 37, sy: 0, w: 42, h: 43, frames: 1 },
    				enemy_bee: { sx: 79, sy: 0, w: 37, h: 43, frames: 1 },
    				enemy_ship: { sx: 116, sy: 0, w: 42, h: 43, frames: 1 },
    				enemy_circle: { sx: 158, sy: 0, w: 32, h: 33, frames: 1 },
    				explosion: { sx: 0, sy: 64, w: 64, h: 64, frames: 12 },
    				fireball: { sx: 0, sy: 64, w: 64, h: 64, frames: 12 }}
			}	
			newboard = new GameBoard();
	});
	
	it("misil nave contra enemiga",function(){
			
			var misil= new PlayerMissile(100,-100);
			misil.x=100;
			misil.y=-100;
			misil.damage = 10;
			var enemigo = new Enemy(enemies.basic);
			enemigo.x=100;
			enemigo.y=-100;
		
			newboard.add(misil);
			newboard.add(enemigo);
			newboard.step(0.000000001);
			
			var collision =newboard.collide(misil,OBJECT_ENEMY);
			
			expect(collision).toBe(enemigo);
			expect(newboard.objects.length).toBe(1);
	});
	
	it("bola fuego contra enemigo", function(){
		var ballfire = new FireBall(100,-100,1);
		ballfire.x=100;
		ballfire.y=-100;
		var enemigo = new Enemy(enemies.basic);
		enemigo.x=100;
		enemigo.y=-100;
		
		newboard.add(ballfire);
		newboard.add(enemigo);
		newboard.step(0.000000001);
			
		var collision =newboard.collide(ballfire,OBJECT_ENEMY);
			
		expect(collision).toBe(enemigo);
		
	});
	
	/*
	it("nave enemiga contra ship",function(){
	
		var mship= new PlayerShip();
		mship.x=100;
		mship.y=-100;
		mship.vx=0;
		
		var enemigo = new Enemy(enemies.basic);
		enemigo.x=100;
		enemigo.y=-100;
	
		newboard.add(mship);
		newboard.add(enemigo);
		newboard.step(0.000000001);
			
		var collision =newboard.collide(mship,OBJECT_ENEMY);
			
		expect(collision).toBe(enemigo);
	
	});*/
	
	it("misil que no destruye nave",function(){
	
		var misil= new PlayerMissile(100,-100);
		misil.x=100;
		misil.y=-100;
		misil.damage = 5;
		var enemigo = new Enemy(enemies.basic);
		enemigo.x=100;
		enemigo.y=-100;
		enemigo.health=10;
		
		newboard.add(misil);
		newboard.add(enemigo);
		newboard.step(0.000000001);
		
		var collision =newboard.collide(misil,OBJECT_ENEMY);
			
		expect(collision).toBe(enemigo);
		expect(enemigo.health).toBe(5);
		
		
	});

});














/*

  Requisitos:

  El objetivo de este prototipo es que se detecten colisiones entre
  varios tipos de sprites:
  
  - Los misiles tienen ahora una nueva propiedad: el daño (damage) que
    producen cuando colisionan con una nave enemiga. Cuando un misil
    colisione con una nave enemiga le infligirá un daño de cierta
    cuantía a la nave enemiga con la que impacta, y desaparecerá.

  - Las naves enemigas tienen ahora una nueva propiedad: su salud
    (health).  El daño ocasionado a una nave enemiga por un misil hará
    que disminuya la salud de la nave enemiga, y cuando llegue a cero,
    la nave enemiga desaparecerá.

  - cuando una nave enemiga colisione con la nave del jugador, deberá
    desaparecer tanto la nave enemiga como la nave del jugador.



  Especificación:

  En el prototipo 07-gameboard se añadió el constructor GameBoard. El
  método overlap() de los objetos creados con GameBoard() ofrece
  funcionalidad para comprobar si los rectángulos que circunscriben a
  los sprites que se le pasan como parámetros tienen intersección no
  nula. El método collide() de GameBoard utiliza overlap() para
  detectar si el objeto que se le pasa como primer parámetro ha
  colisionado con algún objeto del tipo que se le pasa como segundo
  parámetro.

  En este prototipo se utilizará el método collide() para detectar los
  siguientes tipos de colisiones:

    a) detectar si un misil disparado por la nave del jugador
       colisiona con una nave enemiga

    b) detectar si una nave enemiga colisiona con la nave del jugador


  En el método step() de los objetos creados con PlayerMissile() y
  Enemy(), tras "moverse" a su nueva posición calculada, se comprobará
  si han colisionado con algún objeto del tipo correspondiente. 

  No interesa comprobar si se colisiona con cualquier otro objeto,
  sino sólo con los de ciertos tipos. El misil tiene que comprobar si
  colisiona con enemigos. El enemigo tiene que comprobar si colisiona
  con la nave del jugador. Para ello cada sprite tiene un tipo y
  cuando se comprueba si un sprite ha colisionado con otros, se pasa
  como segundo argumento a collide() el tipo de sprites con los que se
  quiere ver si ha colisionado el objeto que se pasa como primer
  argumento.

  Cuando un objeto detecta que ha colisionado con otro llama al método
  hit() del objeto con el que ha colisionado. El misil cuando llama a
  hit() de una nave enemiga pasa como parámetro el daño que provoca
  para que la nave enemiga pueda calcular la reducción de salud que
  conlleva la colisión.


  Efectos de las colisiones:

  Cuando una nave enemiga recibe la llamada .hit() realizada por un
  misil que ha detectado la colisión, recalcula su salud reduciéndola
  en tantas unidades como el daño del misil indique, y si su salud
  llega a 0 desaparece del tablero de juegos, produciéndose en su
  lugar la animación de una explosión.

  Cuando la nave del jugador recibe la llamada .hit() realizada por
  una nave enemiga que ha detectado la colisión, desaparece.

  El misil, tras informar llamando al métod hit() de la nave enemiga
  con la que ha detectado colisión, desaparece.

  La nave enemiga, tras informar llamando a hit() de la nave del
  jugador, desaparece.

*/
