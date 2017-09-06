function init() {
	var canvas = document.getElementById("canvas");
	var ctx = canvas.getContext("2d");
	var cw = 10;
	var direction = 'right';
	var snakeX = 1, snakeY = 1, appleX, appleY;
	var score = 0;
	var time = 0;

	createBoard();
	createApple();
	createSnake();

	var i1 = setInterval(paint, 60);
	var i2 = setInterval(snake, 100);
	var i3 = setInterval(updateTime, 1000);

	function updateTime()
	{
		time ++;
		document.getElementById('time').innerHTML = "time: " + time;
	}

	function createSnake()
	{
		board[snakeX][snakeY] = 'C';
	}

	function colisao()
	{
		document.writeln('GAME OVER');
		
		clearInterval(i1);
		clearInterval(i2);
		clearInterval(i3);
		
	}

	function snake()
	{
		board[snakeX][snakeY] = '';

		switch (direction) {
			case 'right':
				if (snakeX === 19) {	
					colisao();
					snakeX = 0;
				}else{
					snakeX += 1;	
				}
				break;

			case 'left':
				if (snakeX === 0){
					colisao();
					snakeX = 19;
				}else 	{
			 		snakeX -= 1;	
				}
			 	break;

			case 'up': 	
				if (snakeY === 0){ 	
					colisao();
					snakeY = 19;
				}else{
					snakeY -= 1;	
				}
				break;
			
			case 'down': 	
				if (snakeY === 19) {	
					colisao();
					snakeY = 0;
				}else{
					snakeY += 1;	break;
				}
		}		


		board[snakeX][snakeY] = 'C';

		if (appleX == snakeX && appleY == snakeY){
			createApple();
		}
	}

	onkeydown = function(e) {
		var key = e.keyCode;
		if (key == 37 && direction != "right")	direction = "left";
		else if (key == 38 && direction != "down")	direction = "up";
		else if (key == 39 && direction != "left")	direction = "right";
		else if (key == 40 && direction != "up")	direction = "down";
	}

	function createBoard()
	{
		board = new Array(20);
		for (var i = 0; i < 20; i++) {
			board[i] = new Array(20);
		}
	}

	function createApple()
	{
		appleX = Math.floor(Math.random() * (19 - 0 + 1));
		appleY = Math.floor(Math.random() * (19 - 0 + 1));
		board[appleX][appleY] = 'M';
		score ++;
		document.getElementById('score').innerHTML = "score: " + score;
	}

	function paintCell(x, y, color) 
	{
		ctx.fillStyle = color || "white";
		ctx.fillRect(x * cw, y * cw, cw, cw);
		ctx.strokeStyle = "#f5f5f5";
		ctx.strokeRect(x * cw, y * cw, cw, cw);
	}

	function paint()
	{
		for (var i = 0; i < board.length; ++i) {
			for (var j = 0; j < board.length; ++j) {
				switch(board[i][j]) {
					case 'M': 	paintCell(i, j, 'red'); 		break;
					case 'C': 	paintCell(i, j, 'green'); 		break;
					default: 	paintCell(i, j);				break;
				}
			}
		}

	}
}