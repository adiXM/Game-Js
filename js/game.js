	
		var c=document.getElementById("start");
		var ctx=c.getContext("2d");
		ctx.strokeStyle = 'black';
		ctx.strokeRect(0, 0, 750, 360);
		ctx.font="50px Arial";
		ctx.fillText("Snake Game",220,180);
	
		function Start_Game() {
				document.getElementById("but").disabled = true;
				var scena = document.getElementById('start');
				var game = scena.getContext("2d");
				var snake, score = 0;
				var snakeSize = 15, food;
				var width = 750, height = 360;
				var snakex = 1, snakey = 1, dir, best = 0;
				var Celula = function(x, y) {
				        game.fillStyle = '#4CAF50';
				        game.fillRect(x*snakeSize, y*snakeSize, snakeSize, snakeSize);      
				};
				var Make_Snake = function () {
					snake = [];
					snake.push({x : 1, y : 1});
				};
				function Reseteaza() {
					snakeSize = 15;
					width = 750, height = 360;
					snakex = 1, snakey = 1;
				}
				var Make_Food = function () {
					food = {
						x: Math.floor((Math.random() * 49) + 1),
        				y: Math.floor((Math.random() * 22) + 1)
					}
					for (var i = 0; i < snake.length; i++) {
						if(snake[i].x == food.x && snake[i].y == food.y) {
							food.x = Math.floor((Math.random() * 49) + 1);
        					food.y = Math.floor((Math.random() * 22) + 1);
						}
					};
				};
				
				var Debug = function () {
					for (var i = 0; i < snake.length; i++) {
						console.log(snake[i].x);
						console.log(snake[i].y);
					};
					
				}
				var Touch = function (x, y, a) {
					for (var i = 0; i < a.length; i++) {
						if(a[i].x == x  && a[i].y == y) {
							return 1;
						}
					};
					return 0;
				}
				var Run_Game = function () {

					game.fillStyle = 'white';
				    game.fillRect(0, 0, width, height);
				    game.strokeStyle = 'black';
				    game.strokeRect(0, 0, width, height);
				    document.addEventListener('keydown', Miscari);
				   	document.getElementById("scor").innerHTML = "Score: " + score;
				   	if(score > best) {
					   	best = score;
					}
					function Miscari(e) {
					  var x = e.keyCode;
		
					    if(x == 37) {
					    	if(dir != 'right') {
					    		dir = 'left';
					    	}
					    }
					    if(x == 39) {
					    	if(dir != 'left') {
					    		dir = 'right';
					    	}
					    }
					    if(x == 38) {
					    	if(dir != 'down') {
					    		dir = 'up';
					    	}
					    }
					    if(x == 40) {
					    	if(dir != 'up') {
					    		dir = 'down';
					    	}
					    }
					  //console.log(x);
					}

					if(dir == "right") {
						snakex++;
					}
					else if(dir == 'left') {
						snakex--;
					}
					else if(dir == 'up') {
						snakey--;
					}
					else if(dir == 'down') {
						snakey++;
					}
					if(snakex == -1 || snakex == width/snakeSize || snakey == -1 || snakey == height/snakeSize || Touch(snakex, snakey, snake) ) {
						document.getElementById("bestscor").innerHTML = "Best Score: " + best;
					    if (confirm("Mai joci?") == true) {
					      	game.clearRect(0,0,width,height);
          					Run = clearInterval(Run);
          					Reseteaza();
          					Init();
					    } else {
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
					    	Run = clearInterval(Run);
					    	return;
					    }
					}
					var front = {x: snakex, y: snakey}
					if(snakex == food.x && snakey == food.y) {
						score++;
						Make_Food();
					}
					else {
						snake.pop();
						front.x = snakex;
						front.y =  snakey;
					}
					snake.unshift(front);
					for (var i = 0; i < snake.length; i++) {
						Celula(snake[i].x, snake[i].y);
					}
					Celula(food.x, food.y);
				}

				var Init = function() {
					score  = 0;
					dir = "right";
					Make_Snake();
					Make_Food();
					Run = setInterval(Run_Game, 80);
				}
				Init();
		};