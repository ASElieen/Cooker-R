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

    //OverWorld调用
    update(state) {
        if (this.movingProgressRemaining > 0) {
            this.updatePosition();
        } else {
            if (this.isPlayer && state.arrow) {
                this.startBehavior(state, {
                    type: 'walk',
                    direction: state.arrow
                })
            }
        }
        this.updateSprite(state);
    }

    startBehavior(state, behavior) {
        this.direction = behavior.direction;
        if (behavior.type === 'walk') {
            if (state.map.isSpaceTaken(this.x, this.y, this.direction)) return;

            //防止把人物初始占位视为墙体
            state.map.moveWall(this.x, this.y, this.direction)
            this.movingProgressRemaining = 16;
        }
    }

    updatePosition() {
        //从GameObject拿到this.direction 
        const [property, change] = this.directionUpdate[this.direction];
        //对应的x或者y值+-1 同时移动余量-1
        this[property] += change;
        this.movingProgressRemaining -= 1;
    }

    //更新对应动画
    updateSprite(state) {
        if (this.isPlayer && this.movingProgressRemaining === 0 && !state.arrow) {
            this.sprites.setAnimation('idle-' + this.direction);
        }
        if (this.movingProgressRemaining > 0) {
            this.sprites.setAnimation('walk-' + this.direction);
        }
    }
}