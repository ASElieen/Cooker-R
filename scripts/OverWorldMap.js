class OverWorldMap {
    constructor(config) {
        this.gameObject = config.gameObject;

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