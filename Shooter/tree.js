// Details in development
class Tree {
    constructor(position, size) {
      this.position = position;
      this.size = size;
    }
      
      hit_player(player) {
      let distance = p5.Vector.dist(this.position, player.position);
      return distance < this.size + player.size / 2;
    }
      
    render() {
      fill(139, 69, 19);
      rect(this.position.x, this.position.y, this.size);
    }
  }