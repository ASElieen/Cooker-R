const $ = (doc, ele) => {
    return doc.querySelector(ele);
}


class OverWorld {
    constructor(config) {
        this.element = config.element;
        this.canvas = $(this.element, '.game-canvas');
        this.ctx = this.canvas.getContext('2d');
        this.map = null;
    }

    startGameLoop() {
        const step = () => {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.map.drawLowerImage(this.ctx);

            Object.values(this.map.gameObject).forEach(obj => {
                obj.update({
                    arrow: this.directionInput.direction //get
                })

                //拿到人物的new GameObject对象 然后通过sprites转入Sprites中调用draw
                obj.sprites.draw(this.ctx);
            })

            this.map.drawUpperImage(this.ctx);
            requestAnimationFrame(() => {
                step();
            })
        }
        step();

        //单次测试 
        // setTimeout(() => {
        //     step()
        // }, 200)
    }

    init() {
        this.map = new OverWorldMap(window.OverWorldMaps.DemoRoom)
        this.directionInput = new DirectionInput();
        this.directionInput.init();
        this.startGameLoop();
    }
}