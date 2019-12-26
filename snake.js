function init() {
  var canvas = document.getElementById("canvas");
  var ctx = canvas.getContext("2d");
  var cw = 10;
  var direction = "right";
  var appleX, appleY;
  var score = 0;
  var time = 0;

  var snake = [[0, 0]];

  createBoard();
  createApple();
  paintSnake();

  var i1 = setInterval(paint, 60);
  var i2 = setInterval(snakeFunction, 100);
  var i3 = setInterval(updateTime, 1000);

  function updateTime() {
    time++;
    document.getElementById("time").innerHTML = "time: " + time;
  }

  function paintSnake(X = 'C') {
    snake.forEach(([snakeX, snakeY]) => {
      board[snakeX][snakeY] = X;
    });
  }

  function colisao() {
    document.writeln("GAME OVER");

    clearInterval(i1);
    clearInterval(i2);
    clearInterval(i3);
  }

  function snakeFunction() {
    var [snakeX, snakeY] = snake[0];

    paintSnake('')

    const boardLength = board.length - 1;

    if (snake.find(([x, y]) => x === snakeX && y === snakeY)) {
      return colisao()
    }

    switch (direction) {
      case "right":
        if (snakeX === boardLength) {
          colisao();
          snakeX = 0;
        } else {
          snakeX += 1;
        }
        break;

      case "left":
        if (snakeX === 0) {
          colisao();
          snakeX = boardLength;
        } else {
          snakeX -= 1;
        }
        break;

      case "up":
        if (snakeY === 0) {
          colisao();
          snakeY = boardLength;
        } else {
          snakeY -= 1;
        }
        break;

      case "down":
        if (snakeY === boardLength) {
          colisao();
          snakeY = 0;
        } else {
          snakeY += 1;
          break;
        }
    }

    snake.pop();
    snake.unshift([snakeX, snakeY ]);

    if (appleX == snakeX && appleY == snakeY) {
      increaseSnake(appleX, appleY);
      createApple();
    }
  }

  function increaseSnake(x, y) {
    var newX = x;
    var newY = y;

    if (direction === "right") {
      newX = x + 1;
    }

    if (direction === "top") {
      newY = y - 1;
    }

    if (direction === "left") {
      newX = x - 1;
    }

    if (direction === "bottom") {
      newY = y + 1;
    }

    snake.push([newX, newY]);
  }

  onkeydown = function(e) {
    var key = e.keyCode;
    if (key == 37 && direction != "right") direction = "left";
    else if (key == 38 && direction != "down") direction = "up";
    else if (key == 39 && direction != "left") direction = "right";
    else if (key == 40 && direction != "up") direction = "down";
  };

  function createBoard() {
    board = new Array(50);
    for (var i = 0; i < 50; i++) {
      board[i] = new Array(50);
    }
  }

  function createApple() {

    const boardLength = board.length - 1;

    do {
      appleX = Math.floor(Math.random() * (boardLength));
      appleY = Math.floor(Math.random() * (boardLength));
    } while(snake.find(([x, y]) => x === appleX && y === appleY))

    score++;
    document.getElementById("score").innerHTML = "score: " + score;
  }

  function paintCell(x, y, color) {
    ctx.fillStyle = color || "white";
    ctx.fillRect(x * cw, y * cw, cw, cw);
    ctx.strokeStyle = "#f5f5f5";
    ctx.strokeRect(x * cw, y * cw, cw, cw);
  }

  function paint() {
    paintSnake();
    board[appleX][appleY] = "M";

    for (var i = 0; i < board.length; ++i) {
      for (var j = 0; j < board.length; ++j) {
        switch (board[i][j]) {
          case "M":
            paintCell(i, j, "red");
            break;
          case "C":
            paintCell(i, j, "green");
            break;
          default:
            paintCell(i, j);
            break;
        }
      }
    }
  }
}
