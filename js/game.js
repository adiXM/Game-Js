	
		var c = document.getElementById("start");
		var ctx = c.getContext("2d");
		ctx.strokeStyle = 'black';
		ctx.strokeRect(0, 0, 750, 360);
		ctx.font="50px Arial";
		ctx.fillText("Snake Game",220,180);

		var KEYCODE_LEFT = 37;
		var KEYCODE_RIGHT = 39;
		var KEYCODE_UP = 38;
		var KEYCODE_DOWN = 40;

		scena = document.getElementById('start');
		game = scena.getContext("2d");


		score = 0, best = 0;
		snakeSize = 15, food = 0;
		width = 750, height = 360;
		snakeX = 1, snakeY = 1, dir = 'right';

		snake = [];

		var Make_Snake = function () {
			snake = [];
			snake.push({x : 1, y : 1});			
		};
	
		var Make_Food = function () {
			var found;
			do {
				found = false;
				food = {
					x: Math.floor((Math.random() * 49) + 1),
	        		y: Math.floor((Math.random() * 22) + 1)
				}
				for (var i = 0; i < snake.length && found == false; i++) {
					if(snake[i].x == food.x && snake[i].y == food.y) {
						found = true;
					}
				};
			}
			while(found == true);
		};

		var DrawCell = function(x, y) {
			game.fillStyle = '#4CAF50';
			game.fillRect(x * snakeSize, y * snakeSize, snakeSize, snakeSize);      
		};
		
		var Run_Game = function () {

			game.fillStyle = 'white';
		    game.fillRect(0, 0, width, height);
		    game.strokeStyle = 'black';
			game.strokeRect(0, 0, width, height);
			document.addEventListener('keydown', function (e) {

				var keyPressed = e.keyCode;
			    if(keyPressed == KEYCODE_LEFT) {
				   	if(dir != 'right') {
				   		dir = 'left';
				   	}
				}
				if(keyPressed == KEYCODE_RIGHT) {
				   	if(dir != 'left') {
				   		dir = 'right';
				   	}
				}
				if(keyPressed == KEYCODE_UP) {
				  	if(dir != 'down') {
				   		dir = 'up';
				   	}
				}
				if(keyPressed == KEYCODE_DOWN) {
				  	if(dir != 'up') {
				   		dir = 'down';
				   	}
				}
			});

			document.getElementById("scor").innerHTML = "Score: " + score;
			best = Math.max(best, score);
			
					if(dir == "right") {
						snakeX++;
					}
					else if(dir == 'left') {
						snakeX--;
					}
					else if(dir == 'up') {
						snakeY--;
					}
					else if(dir == 'down') {
						snakeY++;
					}
					if(Lose() == true)
					{
						document.getElementById("bestscor").innerHTML = "Best Score: " + best;
					    if (confirm("Mai joci?") == true) {
					      	game.clearRect(0,0,width,height);
          					Run = clearInterval(Run);
          					Reseteaza();
          					Init();
					    } else {
					    	ClearBoard();
					    	Run = clearInterval(Run);
					    	return;
					    }
					}
					var front = {x: snakeX, y: snakeY}
					if(snakeX == food.x && snakeY == food.y) {
						score++;
						Make_Food();
					}
					else {
						snake.pop();
						front.x = snakeX;
						front.y =  snakeY;
					}
					snake.unshift(front);
					for (var i = 0; i < snake.length; i++) {
						DrawCell(snake[i].x, snake[i].y);
					}
					DrawCell(food.x, food.y);
		}
		function Reseteaza() {
			snakeSize = 15;
			width = 750, height = 360;
			snakeX = 1, snakeY = 1;
		}				
		var Debug = function () {
			for (var i = 0; i < snake.length; i++) {
				console.log(snake[i].x);
				console.log(snake[i].y);
			};
					
		}
		var Init = function() {
			score  = 0;
			dir = "right";
			Make_Snake();
			Make_Food();
			Run = setInterval(Run_Game, 80);
		}
		function Start_Game() {
				document.getElementById("but").disabled = true;
				Init();
		};
		function Quit() {
			if (confirm("Sigur vrei sa faci asta?") == true) {
				window.close();
			}
			
		};
		function ClearBoard() {
			game.clearRect(0,0,width,height);
			game.fillStyle = 'white';
			game.fillRect(0, 0, width, height);
			game.strokeStyle = 'black';
			game.strokeRect(0, 0, width, height);
			game.font="50px Arial";
			game.fillStyle = "black"
			game.fillText("Game over!",220,180);
			document.getElementById("but").disabled = false;
			document.getElementById("scor").innerHTML = "";
		}

		var Touch = function () {
			for (let pos in snake) {
				if(snake[pos].x == snakeX  && snake[pos].y == snakeY) {
					return true;
				}
			};
			return false;
		}

		function Lose() {
			if(snakeX == -1 || snakeX == width/snakeSize || snakeY == -1 || snakeY == height/snakeSize || Touch() == true) {
				return true;
			} 
			return false;

		}