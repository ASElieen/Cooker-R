class Person extends GameObject {
    constructor(config) {
        super(config);

        this.movingProgressRemaining = 0;
        this.isPlayer = config.isPlayer || false;

        this.directionUpdate = {
            'up': ['y', -1],
            'down': ['y', 1],
            'left': ['x', -1],
            'right': ['x', 1],
        }
    }

    update(state) {
        this.updatePosition();
        if (this.isPlayer && this.movingProgressRemaining === 0 && state.arrow) {
            this.direction = state.arrow;
            this.movingProgressRemaining = 16;
        }
    }

    updatePosition() {
        if (this.movingProgressRemaining > 0) {
            //从GameObject拿到this.direction 
            const [property, change] = this.directionUpdate[this.direction];
            //对应的x或者y值+-1 同时移动余量-1
            this[property] += change;
            this.movingProgressRemaining -= 1;
        }
    }
}