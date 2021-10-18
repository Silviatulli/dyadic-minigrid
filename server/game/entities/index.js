export class Entity {
    x = null
    y = null

    static createEntityFromKey = (key) => {
        switch (key) {
            case 0:
                return new Empty()
            case 1:
                return new Wall()
            case 2:
                return new Player()
            case 3:
                return new Key('blue')
            case 4:
                return new Key('yellow')
            case 5:
                return new Key('purple')
            case 6:
                return new Door(false)
            case 7:
                return new Door(true)
            case 8:
                return new Object(true)
            case 9:
                return new HiddenObject(true)
        }
    }
}

export class Player extends Entity {

    blueKeys = 0
    yellowKeys = 0
    purpleKeys = 0

    getKey = () => {
        return 2
    }

}

export class Empty extends Entity {
    getKey = () => {
        return 0
    }
}

export class Wall extends Entity {
    getKey = () => {
        return 1
    }
}


export class Object extends Entity {
    constructor(isMovable) {
        super()
        this.isMovable = isMovable
        }
    getKey = () => {
        return this.isMovable ? 8 : 0
    }
}

export class HiddenObject extends Entity {
    constructor(isHidden) {
        super()
        this.isHidden = isHidden
        }
    getKey = () => {
        return this.isHidden ? 9 : 0
    }
}


export class Door extends Entity {
    constructor(isLocked) {
        super()
        this.isLocked = isLocked
    }
    
    getKey = () => {
        return this.isLocked ? 7 : 6
    }
}

export class Key extends Entity {
    constructor(color) {
        super()
        this.color = color
    }

    getKey = () => {
        return {
            blue: 3,
            yellow: 4,
            purple: 5
        }[this.color]
    }
}
