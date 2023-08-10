class Bullet {
  constructor(position, bullet_speed) {
    this.position = position;
    this.bullet_speed = bullet_speed;
    this.size = 5;
    this.creation_time = millis(); // Initialize to zero (the bullet can shoot immediately)
  }
  
  render() {
    fill(255, 0, 0); // Adjust the fill color for bullets
    ellipse(this.position.x, this.position.y, this.size * 2);
  }
	
  hit_NPC(npc) {
    let distance = p5.Vector.dist(this.position, npc.position);
    return distance < this.size + npc.size / 2;
  }
	
  movement() {
	this.position.add(this.bullet_speed);
  }

  update() {
    this.render();
    this.movement();
  }
}