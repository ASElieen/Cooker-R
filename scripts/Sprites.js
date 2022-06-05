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

        //当前移动方向对应的动画组
        this.currentAnimation = config.currentAnimation || 'idle-down';
        //当前帧
        this.currentAnimationFrame = 0;
        //帧数限制 因为之前移动是一次16 这个和移动对应 越小每一步的动作就越多
        this.animationsFrameLimit = config.animationFrameLimit || 16;
        //动画帧进度
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

    //设置当前对应按键动画
    setAnimation(key) {
        if (this.currentAnimation !== key) {
            this.currentAnimation = key;
            this.currentAnimationFrame = 0;
            this.animationFrameProgress = this.animationsFrameLimit;
        }

    }

    //控制动画进度
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

    draw(ctx, cameraPerson) {
        const x = this.gameObject.x - 8 + utils.withGrid(10.5) - cameraPerson.x;
        const y = this.gameObject.y - 18 + utils.withGrid(6) - cameraPerson.y;

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