class Player {
    constructor(x, y) {
        this._x = x;
        this._y = y;
    }

    get x() {
        return this._x;
    }

    set x(value) {
        const maxX = window.innerWidth - 50;
        this._x = Math.max(0, Math.min(value, maxX));
    }

    get y() {
        return this._y;
    }

    set y(value) {
        const maxY = window.innerHeight - 50;
        this._y = Math.max(0, Math.min(value, maxY));
    }
}


class KeyboardController {
    constructor(target, speed = 5) {
        this.target = target;
        this.speed = speed;
        this.keys = {};

        this.handleKeyDown = this.handleKeyDown.bind(this);
        this.handleKeyUp = this.handleKeyUp.bind(this);
        this.update = this.update.bind(this);

        window.addEventListener("keydown", this.handleKeyDown);
        window.addEventListener("keyup", this.handleKeyUp);
    }

    handleKeyDown(event) {
        this.keys[event.key] = true;
    }

    handleKeyUp(event) {
        this.keys[event.key] = false;
    }

    update() {
        if (this.keys["ArrowUp"] || this.keys["z"]) this.target.y -= this.speed;
        if (this.keys["ArrowDown"] || this.keys["s"]) this.target.y += this.speed;
        if (this.keys["ArrowLeft"] || this.keys["q"]) this.target.x -= this.speed;
        if (this.keys["ArrowRight"] || this.keys["d"]) this.target.x += this.speed;
    }
}


const player = new Player(100, 100);
const movement = new KeyboardController(player, 10);

function gameLoop() {
    movement.update();
    console.log(`Position: (${player.x}, ${player.y})`);
    requestAnimationFrame(gameLoop);
}

gameLoop();