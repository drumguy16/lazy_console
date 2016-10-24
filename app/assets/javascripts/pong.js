

$(document).ready(function() {
	var $pongIcon = $('#pong-widget-icon');
	var $pongWidget = $('#pong_board');
	var pieceColors = [
		"#40e331",
		"#2033c1",
		"#18da8d",
		"#ae1857",
		"#ff0a9c",
	]
	
	class Vec 
	{
		constructor(x = 0, y = 0)
		{
			this.x = x;
			this.y = y;
		}
		get len()
		{
			return Math.sqrt(this.x * this.x + this.y * this.y);
		}
		set len(value)
		{
			const fact = value / this.len;
			this.x *= fact;
			this.y *= fact;
		}
	}

	class Rect 
	{
		constructor(w, h)
		{
			this.pos = new Vec;
			this.size = new Vec(w, h);
		}
		get left() {
			return this.pos.x - this.size.x / 2;
		}
		get right() {
			return this.pos.x + this.size.x / 2;
		}
		get top() {
			return this.pos.y - this.size.y / 2;
		}
		get bottom() {
			return this.pos.y + this.size.y / 2;
		}

		changeColor(){
			this.pieceColor = pieceColors[Math.floor(Math.random()*pieceColors.length)];
		}
	}

	class Ball extends Rect 
	{
		constructor()
		{
			super(10, 10);
			this.vel = new Vec;
			this.pieceColor = "#fff"
		}
	}

	class Player extends Rect
	{
		constructor()
		{
			super(20, 100);
			this.score = 0;
			this.pieceColor = "#fff"
		}
	}

	class Pong
	{
		constructor(pongBoard) 
		{
			this._pongBoard = pongBoard;
			this._pongContext = pongBoard.getContext('2d');

			this.ball = new Ball;

			this.players = [
				new Player,
				new Player,
			];

			this.players[0].pos.x = 40;
			this.players[1].pos.x = this._pongBoard.width - 40;
			this.players.forEach(player => {
					player.pos.y = this._pongBoard.height / 2
				});

			this.fudgeFactor = (Math.random()* 0.8) + -0.8;

			this.fudgeIncrement = 0;

			let lastTime;
			const callback = (ms) => {

				if (lastTime) {
					this.update((ms - lastTime) / 1000);
				}
				lastTime = ms;
				requestAnimationFrame(callback);
			};
			callback();

			this.reset();
		}

		collide(player, ball) {
			if (player.left < ball.right && player.right > ball.left && player.top < ball.bottom && player.bottom > ball.top) {
				const len = ball.vel.len;
				ball.vel.x = -ball.vel.x;
				ball.vel.y += 100 * (Math.random() - 0.5);
				ball.vel.len = len * 1.03;
				ball.changeColor();
				player.changeColor();
				if(this.fudgeFactor > 0.8) {
					this.fudgeFactor = (Math.random()* 0.8) + -0.8;
				} else {
					this.fudgeFactor = this.fudgeFactor + .02;
				};
				console.log(this.fudgeFactor);
			} // end if		
		} // end collide

		player1ScoreUpdate(){
			this._pongContext.font = '20pt Josefin Sans';
			this._pongContext.textAlign = 'center';
			this._pongContext.fillStyle = 'white';
			this._pongContext.fillText("Player 1: " + this.players[0].score, 100, 30);
		}
		player2ScoreUpdate(){
			this._pongContext.font = '20pt Josefin Sans';
			this._pongContext.textAlign = 'center';
			this._pongContext.fillStyle = 'white';
			this._pongContext.fillText("Player 2: " + this.players[1].score, this._pongBoard.width - 100, 30);
		}
		draw(){
			this._pongContext.fillStyle = "rgba(29, 29, 29, .1)";
			this._pongContext.fillRect(0, 0, this._pongBoard.width, this._pongBoard.height);

			this.drawRect(this.ball);
			this.players.forEach(player => this.drawRect(player))
		}
		drawRect(rect) {
			this._pongContext.fillStyle = rect.pieceColor;
			this._pongContext.fillRect(rect.left, rect.top, rect.size.x, rect.size.y);
		}

		reset() {
			this.ball.pos.x = 300;
			this.ball.pos.y = 200;

			this.ball.vel.x = 0;
			this.ball.vel.y = 0;

			this.fudgeFactor =  (Math.random()* 0.8) + -0.8;
			this.fudgeIncrement = 0;
		}
		start()
		{
			if (this.ball.vel.x === 0 && this.ball.vel.y === 0) {
				this.ball.vel.x = 200 * (Math.random() > 0.5 ? 1 : -1);
				this.ball.vel.y = 200 * (Math.random() * 2 - 1);
				this.ball.vel.len = 200;
			}
		}
		update(dt) {
			this.ball.pos.x += this.ball.vel.x * dt;
			this.ball.pos.y += this.ball.vel.y * dt;

			if (this.ball.left < 0 || this.ball.right > this._pongBoard.width) {
				let playerId;
				if (this.ball.vel.x < 0) {
					playerId = 1;
				} else {
					playerId = 0;
				}
				this.players[playerId].score++;
				this.reset();
			}

			if (this.ball.top < 0 || this.ball.bottom > this._pongBoard.height) {
				this.ball.vel.y = -this.ball.vel.y
			}

			if (this.ball.vel.x === 0 && this.ball.vel.y === 0) {
				this.fudgeIncrement += 0;
			} else {
				this.fudgeIncrement += .02;
			}

			this.players[1].pos.y = this.ball.pos.y - (this.fudgeFactor * this.fudgeIncrement);
			this.players.forEach(player => this.collide(player, this.ball));

			this.draw();
			this.player1ScoreUpdate();
			this.player2ScoreUpdate();
		}
	}

	const pongBoard = document.getElementById("pong_board");
	const pong = new Pong(pongBoard);

	pongBoard.addEventListener('mousemove', event => {
		pong.players[0].pos.y = event.offsetY;
	});

	pongBoard.addEventListener('click', event => {
		pong.start();
	})
	
	
});

