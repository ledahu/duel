export class Square {
    constructor({ id, x, y, width, height }) {
        this.id = id;        
        this.x = x;          
        this.y = y;          
        this.width = width; 
        this.height = height; 
    }


    isCollision(target) {
        const onX = this.x < target.x + target.width && this.x + this.width > target.x;
        const onY = this.y < target.y + target.height && this.y + this.height > target.y;
        return onX && onY;
    }
}

