class GameObject {
    constructor(config) {
        // console.log(this)
        this.isMounted = false;
        this.x = config.x || 0;
        this.y = config.y || 0;
        this.usingShadow = config.usingShadow;
        this.direction = config.direction || 'down'
        this.sprites = new Sprites({
            gameObject: this,
            src: config.src || './images/characters/people/hero.png'
        })
    }
    mount(map) {
        this.isMounted = true;
        map.addWall(this.x, this.y);
    }

    update() {

    }
}