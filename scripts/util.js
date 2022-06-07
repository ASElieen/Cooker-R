const utils = {
    withGrid(n) {
        return 16 * n;
    },

    //存储墙体位置
    asGridCoord(x, y) {
        return `${x*16},${y*16}`
    },

    //移动前判定是否为墙体
    nextPosition(initialX, initialY, direction) {
        let x = initialX;
        let y = initialY;
        const size = 16;
        switch (direction) {
            case 'left':
                x -= size;
                break;
            case 'right':
                x += size;
                break;
            case 'up':
                y -= size;
                break;
            case 'down':
                y += size;
                break
        }
        return { x, y };
    }
}