class Player {
	constructor(size, position, color, move_speed, shooting_cooldown) {
		this.size = size;
        this.position = position;
        this.color = color;
		this.move_speed = move_speed;

		this.shooting_cooldown = shooting_cooldown;
		this.last_shot_time = 0;
	}
	
	movement() {
        let moveVector = createVector(0, 0);
    
        if (keyIsDown(65)) moveVector.x -= this.move_speed;
        else if (keyIsDown(68)) moveVector.x += this.move_speed;
        if (keyIsDown(87)) moveVector.y -= this.move_speed;
        else if (keyIsDown(83)) moveVector.y += this.move_speed;
    
        moveVector.normalize();
        moveVector.mult(this.move_speed);
        this.position.add(moveVector);
    }
	
	can_shoot() {
        return millis() - this.last_shot_time > this.shooting_cooldown;
    }
	
	shoot(bullet_speed) {
		if (this.can_shoot()) {
			let mouse_position = createVector(translated_mouse_x, translated_mouse_y);
	
			let target_position = p5.Vector.sub(mouse_position, this.position);
			target_position.normalize();
			let bullet_spawn_position = p5.Vector.add(this.position, target_position.mult(this.size / 2));
	
			let bullet = new Bullet(bullet_spawn_position.copy(), target_position.mult(bullet_speed));
			bullets.push(bullet);
	
			this.last_shot_time = millis();
		}
	}
	
	render() {
		fill(this.color);
		ellipse(this.position.x, this.position.y, this.size);
	}

	update() {
		this.movement();
		this.render();
	}
}