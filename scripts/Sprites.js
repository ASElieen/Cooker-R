class Sprites {
    constructor(config) {
        this.img = new Image();
        this.img.src = config.src;
        this.img.onload = () => {
            this.isLoaded = true;
        }

        //动画和初始状态
        this.animations = config.animations || {
            'idle-down': [
                [0, 0]
            ],
            'idle-right': [
                [0, 1]
            ],
            'idle-up': [
                [0, 2]
            ],
            'idle-left': [
                [0, 3]
            ],
            'walk-down': [
                [1, 0],
                [0, 0],
                [3, 0],
                [0, 0]
            ],
            'walk-right': [
                [1, 1],
                [0, 1],
                [3, 1],
                [0, 1]
            ],
            'walk-left': [
                [1, 3],
                [0, 3],
                [3, 3],
                [0, 3]
            ],
            'walk-up': [
                [1, 2],
                [0, 2],
                [3, 2],
                [0, 2]
            ],
        }
        this.currentAnimation = config.currentAnimation || 'idle-down';
        this.currentAnimationFrame = 0;

        this.animationsFrameLimit = config.animationFrameLimit || 16;
        this.animationFrameProgress = this.animationsFrameLimit;

        //和GameObject挂钩
        this.gameObject = config.gameObject

        //阴影 默认为F
        this.shadow = new Image();
        this.usingShadow = this.gameObject.usingShadow || false;
        if (this.usingShadow) this.shadow.src = './images/characters/shadow.png';

        this.shadow.onload = () => {
            this.isShadowLoaded = true;
        }
    }

    //get
    get frame() {
        return this.animations[this.currentAnimation][this.currentAnimationFrame]
    }

    setAnimation(key) {
        if (this.currentAnimation !== key) {
            this.currentAnimation = key;
            this.currentAnimationFrame = 0;
            this.animationFrameProgress = this.animationsFrameLimit;
        }

    }

    updateAnimationProgress() {
        if (this.animationFrameProgress > 0) {
            this.animationFrameProgress -= 1;
            return
        }
        this.animationFrameProgress = this.animationsFrameLimit;
        this.currentAnimationFrame += 1;

        if (this.frame == undefined) {
            this.currentAnimationFrame = 0;
        }
    }

    draw(ctx) {
        const x = this.gameObject.x - 8;
        const y = this.gameObject.y - 18;

        const [frameX, frameY] = this.frame;

        this.isShadowLoaded && this.usingShadow && ctx.drawImage(
            this.shadow,
            x, y,
        )

        this.isLoaded && ctx.drawImage(
            this.img,
            frameX * 32, frameY * 32,
            32, 32,
            x, y,
            32, 32
        )
        this.updateAnimationProgress();
    }
}