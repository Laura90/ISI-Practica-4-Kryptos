describe("class SpriteShip",function(){

	beforeEach(function(){
			loadFixtures('index.html');
		
			canvas = $('#game')[0];
			expect(canvas).toExist();

			ctx = canvas.getContext('2d');

			expect(ctx).toBeDefined();
			
		
		});



	it("Sprite.draw()",function(){
	
		var s= new Sprite();
		
		
		SpriteSheet.draw = function(){};
		s.sprite ="fireball";
		spyOn(SpriteSheet, "draw");
		
		s.draw(ctx);
		
		expect(SpriteSheet.draw).toHaveBeenCalled();
		expect(SpriteSheet.draw.calls[0].args[0]).toEqual(ctx);
		expect(SpriteSheet.draw.calls[0].args[1]).toEqual("fireball");
 		expect(SpriteSheet.draw.calls[0].args[2]).toEqual(s.x);
 		expect(SpriteSheet.draw.calls[0].args[3]).toEqual(s.y);
	
	});
	
	it("Sprite.merge()", function(){
	
		var s = new Sprite();
		
		s.sprite ="fireball";
		
		
		s.merge({vx:-100});
		
		expect(s.vx).toBe(-100);
	
	
	
	
	
	
	
	
	});



});
