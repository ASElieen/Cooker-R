class OverWorldMap {
    constructor(config) {
        this.gameObject = config.gameObject;

        //墙体碰撞
        this.walls = config.walls || {};

        this.lowerImage = new Image();
        this.lowerImage.src = config.lowerImageSrc;

        this.upperImage = new Image();
        this.upperImage.src = config.upperImageSrc;
    }
    drawLowerImage(ctx, cameraPerson) {
        ctx.drawImage(this.lowerImage,
            utils.withGrid(10.5) - cameraPerson.x,
            utils.withGrid(6) - cameraPerson.y)
    }

    drawUpperImage(ctx, cameraPerson) {
        ctx.drawImage(this.upperImage,
            utils.withGrid(10.5) - cameraPerson.x,
            utils.withGrid(6) - cameraPerson.y)
    }

    //碰撞部分
    //如果有墙则返回T
    isSpaceTaken(currentX, currentY, direction) {
        const { x, y } = utils.nextPosition(currentX, currentY, direction);
        return this.walls[`${x},${y}`] || false;
    }

    //地图挂载
    mountObjects() {
        Object.values(this.gameObject).forEach(obj => {
            obj.mount(this)
        })
    }

    //-----------人物的占位碰撞部分------------------------
    //把人物当前位置视作墙体 移动后删除原来位置的墙体并添加新的碰撞
    addWall(x, y) {
        this.walls[`${x},${y}`] = true;
    }

    removeWall(x, y) {
        delete this.walls[`${x},${y}`]
    }

    //人物移动后移走原来占位
    moveWall(wasX, wasY, direction) {
        this.removeWall(wasX, wasY);
        const { x, y } = utils.nextPosition(wasX, wasY, direction);
        this.addWall(x, y)
    }
}

window.OverWorldMaps = {
    DemoRoom: {
        lowerImageSrc: './images/maps/DemoLower.png',
        upperImageSrc: './images/maps/DemoUpper.png',
        gameObject: {
            hero: new Person({
                isPlayer: true,
                x: utils.withGrid(5),
                y: utils.withGrid(6),
                usingShadow: true
            }),
            npc1: new Person({
                x: utils.withGrid(7),
                y: utils.withGrid(9),
                usingShadow: true,
                src: './images/characters/people/npc1.png'
            })
        },
        walls: {
            [utils.asGridCoord(7, 6)]: true,
            [utils.asGridCoord(8, 6)]: true,
            [utils.asGridCoord(7, 7)]: true,
            [utils.asGridCoord(8, 7)]: true
        }
    },
    Kitchen: {
        lowerImageSrc: './images/maps/KitchenLower.png',
        upperImageSrc: './images/maps/KitchenUpper.png',
        gameObject: {
            hero: new GameObject({
                x: 5,
                y: 6,
            }),
            npcA: new GameObject({
                x: 9,
                y: 2,
                src: './images/characters/people/npc2.png'
            }),
            npcB: new GameObject({
                x: 10,
                y: 4,
                src: './images/characters/people/npc3.png'
            })
        }
    }
}