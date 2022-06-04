class Sprites {
    constructor(config) {
        this.img = new Image();
        this.img.src = config.src;
        this.img.onload = () => {
            this.isLoaded = true;
        }

        //动画和初始状态
        this.animations = config.animations || {
            idleDown: [
                [0, 0]
            ]
        }
        this.currentAnimation = config.currentAnimation || 'idleDown';
        this.currentAnimationFrame = 0;

        //挂给gameObject
        this.gameObject = config.gameObject
    }

    draw(ctx) {
        const x = this.gameObject.x * 16 - 8;
        const y = this.gameObject.y * 16 - 18;

        this.isLoaded && ctx.drawImage(
            this.img,
            0, 0,
            32, 32,
            x, y,
            32, 32
        )
    }
}