class Gate {
	constructor(speed = -0.1, gwidth = 105, posy = height / 2) {
		this.posx = width;
		this.posy = posy;
		this.speed = speed;
		this.width = gwidth;
	}

	move() {
		this.posx += this.speed;
	}

	show(color = "black") {
		push()
		//translate(this.posx, this.posy)
		stroke(color);
		line(this.posx, this.posy + this.width / 2, this.posx, height);
		line(this.posx, this.posy - this.width / 2, this.posx, 0);
		pop()
	}
}