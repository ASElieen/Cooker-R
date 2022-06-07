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

            //视角跟随
            const cameraPerson = this.map.gameObject.hero
            Object.values(this.map.gameObject).forEach(obj => {
                obj.update({
                    arrow: this.directionInput.direction, //get
                    map: this.map
                })
            });

            this.map.drawLowerImage(this.ctx, cameraPerson);

            Object.values(this.map.gameObject).forEach(obj => {
                //拿到人物的new GameObject对象 然后通过sprites转入Sprites中调用draw
                obj.sprites.draw(this.ctx, cameraPerson);
            })

            this.map.drawUpperImage(this.ctx, cameraPerson);
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
        this.map.mountObjects();
        this.directionInput = new DirectionInput();
        this.directionInput.init();
        this.startGameLoop();
    }
}