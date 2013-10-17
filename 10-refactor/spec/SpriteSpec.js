describe("class Sprite", function(){
	
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


	it("Sprite.step()", function(){
		
		var obj = new Sprite();
		
		spyOn(obj, "merge");
		obj.setup('fireball', {vx: -100})
		
		expect(obj.sprite).toBe("fireball");
		expect(obj.merge).toHaveBeenCalled();
		expect(obj.w).toBe(64);
		expect(obj.h).toBe(64);
		expect(obj.frame).toBe(0);
		
  		
	})
 		
		
			
});

