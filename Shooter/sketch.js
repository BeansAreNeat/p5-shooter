let player;
let player_color = "grey";
let player_hp = 10;

let enemies = [];
let enemy_count = 10;
let enemy_color = "red";
// spawn radius
let max_enemy_distance = 2000;
let min_enemy_distance = 300;
// More like power ups when enemies die
let trees = [];
let tree_count = 0;
let tree_size = 25;
// Currently not used
let allies = []; 
let ally_count = 0;
let ally_color = "blue";

let bullets = [];
let bullet_speed = 1;
// in milliseconds
let shooting_cooldown = 500;
// mouse positions after player movement
let translated_mouse_x;
let translated_mouse_y;
let hpCounter_x;
let hpCounter_y;
let game_over = false;

let STD_SIZE = 100;
let STD_MOVE_SPEED = 10;
let WORLD_CENTER;

// **************************************************************************************************** \\

function setup() {
	createCanvas(1500, 750);
	WORLD_CENTER = createVector(width/2, height/2);
	
	//---------------------------------------------------------------------------------------------\\
	
	// Spawns player
	player = new Player(STD_SIZE, WORLD_CENTER, player_color, STD_MOVE_SPEED, shooting_cooldown);
	
	//---------------------------------------------------------------------------------------------\\
	
	// Spawns Enemies with different starting positions
	for (let i = 0; i < enemy_count; i++) {
		let enemey_spawn_position = get_enemy_start_position();
		let enemy = new Enemy(STD_SIZE, enemey_spawn_position, enemy_color, shooting_cooldown);
		enemies.push(enemy);
	}

//---------------------------------------------------------------------------------------------\\

  // Spawn Allies
	for (let i = 0; i < ally_count; i++) {
		let startPosition = createVector((i % 2) * 200, floor(i / 2) * 200);
		let ally = new Ally(STD_SIZE, startPosition, ally_color, shooting_cooldown);
		allies.push(ally);
	}
}

function draw() {
	background(220);
	// Manual camera system
	translate(width / 2 - player.position.x, height / 2 - player.position.y);
	translated_mouse_x = mouseX + player.position.x - width / 2;
    translated_mouse_y = mouseY + player.position.y - height / 2;

	// Player functions
	player.update();
	if (mouseIsPressed) { 
    	player.shoot(bullet_speed); 
  	}
	
	//hp_counter();

	// Enemy Functions
	for (let i = enemies.length - 1; i >= 0; i--) {
		enemies[i].update();
		// Check if the enemy is within a certain shooting range
		let distance_to_player = dist(player.position.x, player.position.y, enemies[i].position.x, enemies[i].position.y);
		if (distance_to_player < 1000) { 
			enemies[i].shoot(bullet_speed); 
		}
	}

    // Ally Functions
	for (let i = allies.length - 1; i >= 0; i--) {
    	allies[i].update();
  	}
	
	// Bullet Functions
	for (let i = bullets.length - 1; i >= 0; i--) {
    	bullets[i].update();

		// Check for collision with player
		if (bullets[i].hit_NPC(player)) {
			bullets.splice(i, 1);
			if(player_hp > 0) {
				player_hp--;
			}
			else if(player_hp === 0) {
				game_over === true;
			}
			break;
		}

		// Check for collision with enemies
		for (let j = enemies.length - 1; j >= 0; j--) {
			if (bullets[i].hit_NPC(enemies[j])) {
				bullets.splice(i, 1);
				spawn_tree(j);
				enemies.splice(j, 1);
				break;
			}
		}
			
		// Check for collision with allies (currently not used)
		for (let k = allies.length - 1; k >= 0; k--) {
			if (bullets[i].hit_NPC(allies[k])) {
				bullets.splice(i, 1);
				spawn_tree(k);
				allies.splice(k, 1);
				break;
			}
		}
    }

	// Tree functions
	for (let i = trees.length - 1; i >= 0; i--) {
		trees[i].render();
			
		if(trees[i].hit_player(player)) {
			trees.splice(i, 1);
			if(player_hp < 10) {
				player_hp++;
			}
			else if(player_hp === 10) {

			}
		}
	}
}

function spawn_tree(j) {
	// Trees slightly offset.. fix later
	let tree_start_position = createVector(enemies[j].position.x, enemies[j].position.y);
	let tree = new Tree(tree_start_position, tree_size);
	trees.push(tree);
}

function get_enemy_start_position() {
	let radius = random() * (max_enemy_distance - min_enemy_distance) + min_enemy_distance;
	let angle = random() * TWO_PI;
	let offset_x = cos(angle) * radius;
	let offset_y = sin(angle) * radius;
	let start_x = player.position.x + offset_x;
	let start_y = player.position.y + offset_y;
	return createVector(start_x, start_y);
}

function hp_counter() {
	hpCounter_x = player.position.x - width / 2 + 10;
	hpCounter_y = player.position.y - height / 2 + 30;
    textSize(20);
    text("HP: " + player_hp, 10, 30);
}
/* 
	Issues / To do:
		trees spawn slightly in wrong spot
		enemy spawn location
		make enemies less accurate
		contructors order of values should be standardized
		bullet funcitoning is a mystery. bullet_speed isnt a variable, yet is in the code
*/

/*
	Ideas:
		make npc groups using inheiritance
		make allies a power up?
		collect trees for hp
		10% tree is power up
*/

