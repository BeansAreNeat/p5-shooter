// This class is still in need of testing
class Ally {
	constructor(size, position, color, shooting_cooldown) {
		this.size = size;
        this.position = position;
        this.color = color;
		this.moveVector = createVector(0, 0);
	
		// Formation information ( testing phase )
		this.player_position = p5.Vector.dist(player.position, this.position);
		this.formation_width = 4;
		this.formation_height = 2;
		
		// Shooting
		this.shooting_cooldown = shooting_cooldown;
        this.last_shot_time = 0;
	}
    
    can_shoot() {
        return millis() - this.last_shot_time > this.shooting_cooldown;
    }
	
	shoot() {
		if (this.can_shoot()) {
            let target_position = p5.Vector.sub(player.position, this.position);
			target_position.normalize();
			let bullet_spawn_position = p5.Vector.add(this.position, target_position.mult(this.size / 2));

			let bullet = new Bullet(bullet_spawn_position.copy(), target_position.mult(bullet_speed), shooting_cooldown);
			bullets.push(bullet);
			
			this.last_shot_time = millis();
		}
    }
	
	movement(player_position, formation_width, formation_height) {
	    // Calculate the direction vector from ally's position to the player's position
        let moveVector = p5.Vector.sub(playerPosition, this.position);
        moveVector.normalize();
        moveVector.mult(player_move_speed);

        // Move the ally in the direction of the player
        this.position.add(moveVector);
            
        let relative_position = p5.Vector.sub(player_position, this.position);
        // Calculate the desired position in the rectangular formation
        let targetX = player_position.x + (Math.floor(relative_position.x / formation_width)) * formation_width;
        let targetY = player_position.y + (Math.floor(relative_position.y / formation_height)) * formation_height;
        // Move towards the target position
        this.moveVector = p5.Vector.sub(createVector(targetX, targetY), this.position);
        this.moveVector.normalize();
        this.moveVector.mult(std_move_speed);
        this.position.add(this.moveVector);
    }
	
	render() {
		ellipse(this.position.x, this.position.y, this.size);
	}

    update() {
        this.movement(player.position, 150, shooting_cooldown);
        this.render();
    }
}