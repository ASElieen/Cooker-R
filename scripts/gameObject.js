class GameObject {
    constructor(config) {
        // console.log(this)
        this.x = config.x || 0;
        this.y = config.y || 0;
        this.usingShadow = config.usingShadow;
        this.sprites = new Sprites({
            gameObject: this,
            src: config.src || './images/characters/people/hero.png'
        })
    }
}