class Enemy {
	constructor(size, position, color, shooting_cooldown) {
		// Movement and traits
		this.size = size;
        this.position = position;
        this.color = color;
		
		this.moveVector = createVector(0, 0);
		
		// Shooting
		this.shooting_cooldown = shooting_cooldown;
        this.last_shot_time = 0;
	}
	
	can_shoot() {
    return millis() - this.last_shot_time > this.shooting_cooldown;
  }
	
	shoot(bullet_speed) {
		if (this.can_shoot()) {
			let target_position = p5.Vector.sub(player.position, this.position);
			target_position.normalize();
			let bullet_spawn_position = p5.Vector.add(this.position, target_position.mult(this.size / 2));

			let bullet = new Bullet(bullet_spawn_position.copy(), target_position.mult(bullet_speed), shooting_cooldown);
			bullets.push(bullet);
			
			this.last_shot_time = millis();
		}
  }
	
	movement() {
		let player_position = p5.Vector.dist(player.position, this.position);
		
		if (player_position < this.size)
		{
			this.moveVector = p5.Vector.sub(this.position, player.position);
			this.moveVector.normalize();
			this.moveVector.mult(STD_MOVE_SPEED);
			this.position.add(this.moveVector);
		}
	}
	
	render() {
		fill(0, 0, 0);
		ellipse(this.position.x, this.position.y, this.size);
	}

    update() {
        this.movement();
        this.render();
    }
}