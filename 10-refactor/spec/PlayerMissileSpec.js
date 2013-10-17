/*

  Requisitos: 

  La nave del usuario disparar� 2 misiles si est� pulsada la tecla de
  espacio y ha pasado el tiempo de recarga del arma.

  El arma tendr� un tiempo de recarga de 0,25s, no pudi�ndose enviar
  dos nuevos misiles antes de que pasen 0,25s desde que se enviaron
  los anteriores



  Especificaci�n:

  - Hay que a�adir a la variable sprites la especificaci�n del sprite
    missile

  - Cada vez que el usuario presione la tecla de espacio se a�adir�n
    misiles al tablero de juego en la posici�n en la que est� la nave
    del usuario. En el c�digo de la clase PlayerSip es donde tienen
    que a�adirse los misiles

  - La clase PlayerMissile es la que implementa los misiles. Es
    importante que la creaci�n de los misiles sea poco costosa pues va
    a haber muchos disparos, para lo cual se declarar�n los m�todos de
    la clase en el prototipo

*/

describe("Clase PlayerMissile", function(){

	var canvas, ctx;
	
	beforeEach(function(){
		loadFixtures('index.html');
		
		canvas = $('#game')[0];
		expect(canvas).toExist();

		ctx = canvas.getContext('2d');
		expect(ctx).toBeDefined();
	});
	
	

	it("PlayerMissile.draw()", function(){
	
		SpriteSheet = {
			draw : function () {},
			map : {missile: { sx: 0, sy: 30, w: 2, h: 10, frames: 1 }}
		}
		m = new PlayerMissile(10,10);
		
		spyOn(SpriteSheet, "draw");
		
		m.draw(ctx)
		
		expect(SpriteSheet.draw).toHaveBeenCalled();
		expect(SpriteSheet.draw.calls[0].args[0]).toEqual(ctx);
		expect(SpriteSheet.draw.calls[0].args[1]).toEqual("missile");
 		expect(SpriteSheet.draw.calls[0].args[2]).toEqual(m.x);
 		expect(SpriteSheet.draw.calls[0].args[3]).toEqual(m.y);
 		
		

	});
	
	it("PlayerMissile.step()", function(){
	
		m = new PlayerMissile(10,90);
		m2 = new PlayerMissile(10,20);

		var dummyBoard = {
  			remove: function(obj) {}	
  		};
  		
  		m2.board = dummyBoard;
  		
		var dt = 0.1
		m.step(dt)
		
		expect(m.y).toEqual(90 - 10 + m.vy * dt);
		
  		spyOn(m2.board, "remove")
  		
		m2.step(dt)
		expect(m2.board.remove).toHaveBeenCalled();
 		
		

	});
	



})
