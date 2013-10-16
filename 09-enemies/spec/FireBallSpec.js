
describe("class FireBall", function(){
	
		beforeEach(function(){
			loadFixtures('index.html');
		
			canvas = $('#game')[0];
			expect(canvas).toExist();

			ctx = canvas.getContext('2d');

			expect(ctx).toBeDefined();
			
			SpriteSheet = {
			draw : function () {},
			map : {fireball: { sx: 0, sy: 64, w: 64, h: 64, frames: 12 }}
		}
			
		});


it("Fireball.step()", function(){
		
		
		fire1 = new FireBall(200,420,1);
		fire2 = new FireBall(250,480,-1);

		var dummyFireb = function () {
  			this.remove= function(obj) {}	
  		};

  		fire1.board = new dummyFireb();
  		fire2.board = new dummyFireb();
  		
  		spyOn(fire1.board, "remove")
  		spyOn(fire2.board, "remove")
  		
		var dt = 1;
		fire1.step(dt);
		expect(fire1.x).toBe(200 - fire1.w/2 +fire1.vx * dt);
		fire1.step(dt);
		expect(fire1.bajada).toBe(true);
		expect(fire1.board.remove).toHaveBeenCalled();
		
		fire2.step(dt);
		expect(fire2.x).toBe(250 - fire2.w/2 + fire2.vx * dt);
		fire2.step(dt);
		expect(fire2.bajada).toBe(true);
		expect(fire2.board.remove).toHaveBeenCalled();
		
  	
 		
		
			
		});

	it("fireBall.draw()",function() {	
	
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
