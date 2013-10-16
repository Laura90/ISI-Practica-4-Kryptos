describe("class FireBall", function(){


	
		beforeEach(function(){
			loadFixtures('index.html');
		
			canvas = $('#game')[0];
			expect(canvas).toExist();

			ctx = canvas.getContext('2d');
			expect(ctx).toBeDefined();			
	});
	
	it("fireBall.draw()",function(){
		SpriteSheet = {
				draw : function () {},
				map : {fireball: { sx: 0, sy: 0, w: 42, h: 43, frames: 2 }}
			}
					
	
		ball= new FireBall(10,10);
		
		spyOn(SpriteSheet, "draw");
		
		ball.draw(ctx)
		
		expect(SpriteSheet.draw).toHaveBeenCalled();
		expect(SpriteSheet.draw.calls[0].args[0]).toEqual(ctx);
		expect(SpriteSheet.draw.calls[0].args[1]).toEqual("fireball");
 		expect(SpriteSheet.draw.calls[0].args[2]).toEqual(ball.x);
 		expect(SpriteSheet.draw.calls[0].args[3]).toEqual(ball.y);
	
	});
	








});
