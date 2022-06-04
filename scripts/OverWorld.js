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
            this.map.drawLowerImage(this.ctx);

            Object.values(this.map.gameObject).forEach(obj => {
                //拿到人物的new GameObject对象 然后通过sprites转入Sprites中调用draw
                obj.sprites.draw(this.ctx)
            })

            this.map.drawUpperImage(this.ctx);
            // requestAnimationFrame(() => {
            //     step();
            // })
        }

        //单次测试 
        setTimeout(() => {
            step()
        }, 200)
    }

    init() {
        this.map = new OverWorldMap(window.OverWorldMaps.DemoRoom)
        this.startGameLoop();
    }
}