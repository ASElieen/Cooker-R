const $ = (doc, ele) => {
    return doc.querySelector(ele);
}

class OverWorld {
    constructor(config) {
        this.element = config.element;
        this.canvas = $(this.element, '.game-canvas');
        this.ctx = this.canvas.getContext('2d');
    }

    init() {
        const image = new Image();
        image.src = './images/maps/DemoLower.png';
        image.onload = () => {
            this.ctx.drawImage(image, 0, 0)
        }

        const hero = new GameObject({
            x: 5,
            y: 6,
        })

        const npc1 = new GameObject({
            x: 7,
            y: 9,
            src: './images/characters/people/npc1.png'
        })

        setTimeout(() => {
            hero.sprites.draw(this.ctx);
            npc1.sprites.draw(this.ctx);
        }, 200)


        // const shadow = new Image();
        // shadow.src = './images/characters/shadow.png';
        // shadow.onload = () => {
        //     this.ctx.drawImage(shadow, 0, 0, 32, 32, x * 16 - 8, y * 16 - 18, 32, 32)
        // }

        // const x = 2;
        // const y = 4;
        // const hero = new Image();
        // hero.src = './images/characters/people/hero.png'
        // hero.onload = () => {
        //     //在画布上定位图像，并规定图像的宽度和高度：
        //     //context.drawImage(img,x,y,width,height);
        //     //剪切图像，并在画布上定位被剪切的部分：
        //     //context.drawImage(img,sx,sy,swidth,sheight,x,y,width,height);
        //     this.ctx.drawImage(hero, 0, 0, 32, 32, x * 16 - 8, y * 16 - 18, 32, 32)
        // }
    }
}