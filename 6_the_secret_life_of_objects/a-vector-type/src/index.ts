export class Vec {
    x: number;
    y: number;
    
    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    plus(vector: Vec): Vec {
        return new Vec(this.x + vector.x, this.y + vector.y);
    }

    minus(vector: Vec): Vec {
        return new Vec(this.x - vector.x, this.y - vector.y);
    }

    get length(): number {
        return Math.sqrt(this.x ** 2 + this.y ** 2);
    }
}