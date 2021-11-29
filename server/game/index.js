import { 
    Entity,
    Empty,
    Player,
    Key,
    Door,
    Object,
    HiddenObject
} from './entities/index.js'

export class Game {

    constructor({onGameScoreChanged, scenarioIndex}) {
        const scenarioOneRawData = [
            [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
            [1,2,0,0,0,0,0,8,0,0,1,0,0,0,0,1,0,0,3,0,1,0,0,0,0,1,0,0,0,0,1],
            [1,0,0,0,0,1,0,0,3,0,1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,7,0,0,0,0,1],
            [1,0,0,0,0,1,0,0,0,0,0,0,0,0,0,1,0,0,0,0,7,0,0,0,0,1,0,4,0,0,1],
            [1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],
            [1,1,1,6,1,1,1,1,1,0,1,1,7,1,1,1,1,1,1,1,1,1,1,7,1,1,1,7,1,1,1],
            [1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],
            [1,0,0,4,0,1,0,0,0,0,1,0,0,0,0,7,0,0,0,5,0,0,0,0,0,6,0,0,0,0,1],
            [1,0,0,0,0,1,5,5,5,5,1,0,0,0,0,1,0,0,0,0,1,0,4,0,0,1,0,0,0,0,1],
            [1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],
            [1,1,7,1,1,1,1,1,0,1,1,1,1,1,0,1,1,7,1,1,1,1,1,6,1,1,1,0,1,1,1],
            [1,0,0,0,0,1,9,0,0,0,1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],
            [1,0,0,0,0,7,0,0,0,0,0,0,0,0,0,1,0,0,9,0,1,0,0,0,0,6,0,4,0,0,1],
            [1,0,5,0,0,1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],
            [1,0,0,0,0,1,0,4,0,0,1,0,0,0,0,1,0,0,0,0,0,0,0,0,0,1,0,0,0,0,1],
            [1,1,1,1,0,1,1,1,7,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,7,1,1,1,1,1,1],
            [1,0,0,0,0,1,0,0,0,0,1,0,3,3,3,7,0,0,0,0,1,0,3,0,0,1,0,0,0,0,1],
            [1,0,0,0,0,7,0,0,0,8,0,0,0,0,0,1,0,0,0,0,1,0,3,0,8,0,0,0,0,0,1],
            [1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,4,0,3,0,0,1,0,0,0,0,1],
            [1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1,8,0,0,4,4,0,0,0,0,1,0,0,0,0,1],
            [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
        ]

        const scenarioTwoRawData = [
            [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
            [1,2,0,0,0,0,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1,0,0,0,3,1],
            [1,0,0,0,0,1,0,0,0,0,1,0,0,4,0,0,0,0,0,0,1,0,0,0,0,7,0,0,0,0,1],
            [1,0,0,0,0,1,0,0,0,8,0,0,5,0,0,1,0,0,0,0,6,0,0,0,0,1,0,0,0,0,1],
            [1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,0,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],
            [1,1,1,1,1,1,1,1,1,0,1,1,6,1,1,1,1,1,1,1,1,1,1,6,1,1,1,6,1,1,1],
            [1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],
            [1,3,0,0,0,1,0,0,0,0,8,0,0,0,0,7,0,0,0,0,0,8,0,0,0,6,0,0,0,0,1],
            [1,3,3,0,0,1,0,0,0,0,0,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],
            [1,3,0,0,0,1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],
            [1,1,6,1,1,1,1,1,0,1,1,1,1,1,0,1,1,7,1,1,1,1,1,6,1,1,0,1,1,1,1],
            [1,0,0,0,0,1,0,0,9,0,1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],
            [1,0,0,0,0,7,0,0,0,0,1,0,4,4,0,1,0,0,9,0,1,0,0,0,0,6,0,3,0,0,1],
            [1,0,0,0,0,1,0,0,0,0,1,0,4,4,0,1,0,0,0,0,1,0,0,0,0,1,0,3,3,0,1],
            [1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,0,0,0,0,0,1,0,0,0,0,1],
            [1,1,1,1,8,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,7,1,1,1,1,1,1],
            [1,0,0,0,0,1,0,0,0,0,1,0,0,0,5,7,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],
            [1,0,0,0,0,6,0,0,0,0,7,0,0,0,0,1,0,0,0,0,1,0,0,0,0,0,5,5,0,0,1],
            [1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1,0,0,4,0,1,0,0,0,0,1,5,4,0,0,1],
            [1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1,0,0,4,0,0,0,0,0,0,1,0,5,0,0,1],
            [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
        ]

        const scenarioThreeRawData = [
            [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
            [1,2,0,5,0,0,0,0,0,0,1,0,0,0,0,1,0,0,3,0,1,0,0,0,0,1,0,0,0,0,1],
            [1,0,5,5,0,1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,8,0,0,0,0,1],
            [1,0,0,0,0,1,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,1,0,4,0,0,1],
            [1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],
            [1,1,1,1,1,1,1,1,1,0,1,1,6,1,1,1,1,1,1,0,1,1,1,7,1,1,1,7,1,1,1],
            [1,5,0,0,0,1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],
            [1,4,5,5,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,6,0,0,0,0,1],
            [1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1,0,4,0,0,1,0,0,0,0,1],
            [1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],
            [1,1,1,1,0,1,1,1,0,1,1,1,1,1,0,1,1,6,1,1,1,1,1,6,1,1,1,0,1,1,1],
            [1,0,0,0,0,1,0,0,3,3,1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],
            [1,0,0,0,0,1,0,0,0,3,0,0,0,0,0,1,0,0,9,0,1,0,0,0,0,6,0,0,0,0,1],
            [1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1,0,3,0,0,1],
            [1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,0,0,0,0,0,1,0,4,4,0,1],
            [1,1,1,1,0,1,1,1,7,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,7,1,1,1,1,1,1],
            [1,0,0,0,0,1,0,0,0,0,1,0,0,0,9,7,0,0,0,0,1,0,3,0,0,1,0,0,0,0,1],
            [1,0,0,0,0,6,0,4,0,8,0,0,0,0,0,1,0,0,0,0,1,0,3,0,8,0,0,0,0,0,1],
            [1,0,0,0,0,1,0,4,0,0,1,0,0,0,0,1,0,0,0,0,1,0,3,0,0,1,0,0,0,0,1],
            [1,0,0,0,0,1,0,4,0,0,1,0,0,0,0,1,0,0,0,0,0,0,0,0,0,1,0,0,0,0,1],
            [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
        ]

        const endScenario = [
            [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
            [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
            [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
            [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
            [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
            [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
            [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
            [1,0,0,0,1,1,1,1,0,0,0,0,0,0,1,0,0,1,0,0,0,0,0,1,1,0,0,0,0,0,1],
            [1,0,0,0,1,0,0,0,0,0,0,0,0,0,1,1,0,1,0,0,0,0,0,1,0,1,0,0,0,0,1],
            [1,0,0,0,1,1,1,1,0,0,0,0,0,0,1,0,1,1,0,0,0,0,0,1,0,0,1,0,0,0,1],
            [1,0,0,0,1,0,0,0,0,0,0,0,0,0,1,0,0,1,0,0,0,0,0,1,0,1,0,0,0,0,1],
            [1,0,0,0,1,1,1,1,0,0,0,0,0,0,1,0,0,1,0,0,0,0,0,1,1,0,0,0,0,0,1],
            [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
            [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
            [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
            [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
            [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
            [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
            [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
            [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
            [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
        ]

        const scenarios = [scenarioOneRawData, scenarioTwoRawData, scenarioThreeRawData]
        this.player = null
        this.matrix = null
        this.onGameScoreChanged = onGameScoreChanged
        this.#rawDataToMatrix(scenarios[scenarioIndex])
    }

    getPlayerScore = () => {
        return (
            this.player.blueKeys * 15 +
            this.player.purpleKeys * (-15) +
            this.player.yellowKeys * 10
        )

    }

    isGameEnded = () => {
        if(this.getPlayerScore==230){
        return true
        }
    }



    getState = () => {
        return {
            score: this.getPlayerScore(),
            board: this.#matrixToRawData()
        }
    }

    movePlayerLeftPressed = () => {
        this.#moveEntityIfPossible(this.player, -1, 0)
    }

    movePlayerRightPressed = () => {
        this.#moveEntityIfPossible(this.player, 1, 0)
    }

    movePlayerDownPressed = () => {
        this.#moveEntityIfPossible(this.player, 0, -1)
    }

    movePlayerUpPressed = () => {
        this.#moveEntityIfPossible(this.player, 0, 1)
    }


    moveObjectPressed = () => {
        const adjacentEntities = this.#getAdjacentEntities(
            this.player.x,
            this.player.y)
        adjacentEntities.forEach(adjacentEntity => {
            if (adjacentEntity instanceof Object) {
                this.#moveEntityIfPossible(adjacentEntity, 0, 1)
                }
            })
        }

    discoverHiddenObject = () => {
        const adjacentEntities = this.#getAdjacentEntities(
            this.player.x,
            this.player.y)
        adjacentEntities.forEach(adjacentEntity => {
            if (adjacentEntity instanceof HiddenObject) {
                if (adjacentEntity.isHidden) {
                    this.#discoverHiddenObject(adjacentEntity)
                }
            }
        })
    }

    interactWithDoorPressed = () => {
        const adjacentEntities = this.#getAdjacentEntities(
            this.player.x,
            this.player.y)
        adjacentEntities.forEach(adjacentEntity => {
            if (adjacentEntity instanceof Door) {
                if (adjacentEntity.isLocked && this.player.blueKeys > 0) {
                    this.#unlockDoor(adjacentEntity)
                }

                else if (!adjacentEntity.isLocked) {
                    this.#openDoor(adjacentEntity)
                }
            }
        })
    }

    interactWithObjectPressed = () => {
        const adjacentEntities = this.#getAdjacentEntities(
            this.player.x,
            this.player.y)
        adjacentEntities.forEach(adjacentEntity => {
            if (adjacentEntity instanceof Key) {
                this.#pickUpKey(adjacentEntity)
            }
        })
    }

    #matrixWidth = () => {
        return this.matrix[0].length
    }

    #matrixHeight = () => {
        return this.matrix.length
    }

    #getEntity = (x, y) => {
        return this.matrix[y][x]
    }

    #setEntity = (x, y, entity) => {
        this.matrix[y][x] = entity
        entity.x = x
        entity.y = y
    }

    #isEmpty = (x, y) => {
        return this.#getEntity(x, y) instanceof Empty
    }

    #setEmpty = (x, y) => {
        this.#setEntity(x, y, new Empty())
    }

    #isMovePossible = (destX, destY) => {
        return (destX >= 0 && destX < this.#matrixWidth()
            && destY >= 0 && destY < this.#matrixHeight()
            && this.#isEmpty(destX, destY))
    }

    #moveEntity = (entity, destX, destY) => {
        this.#setEntity(
            entity.x,
            entity.y,
            new Empty())
        this.#setEntity(
            destX,
            destY,
            entity
        )
    }


    #moveEntityIfPossible = (entity, deltaX, deltaY) => {
        const destX = entity.x + deltaX
        const destY = entity.y + deltaY
        if (this.#isMovePossible(destX, destY)) {
            this.#moveEntity(entity, destX, destY)
        }
    }

    #rawDataToMatrix = (rawData) => {
        this.matrix = rawData.map((row, y) => {
            return row.map((entityKey, x) => {
                const newEntity = Entity.createEntityFromKey(entityKey)

                // Avoid overwriting existing Player
                if (newEntity instanceof Player) {
                    if (this.player === null) {
                        this.player = newEntity
                    }
                    this.player.x = x
                    this.player.y = y
                    return this.player
                }
                newEntity.x = x
                newEntity.y = y
                return newEntity
            })
        })
    }

    #matrixToRawData = () => {
        return this.matrix.map(row => {
            return row.map(entity => {
                return entity.getKey()
            })
        })
    }

    #pickUpKey = (key) => {
        if (key.color === 'blue') {
            this.player.blueKeys++
        }
        else if (key.color === 'yellow') {
            this.player.yellowKeys++
        }
        else if (key.color === 'purple') {
            this.player.purpleKeys++
        }
        const x = key.x
        const y = key.y
        this.#setEmpty(x, y)
        this.onGameScoreChanged(this.getPlayerScore())
    }

    #getAdjacentEntities = (x, y) => {
        return [
            [0, 1],
            [0, -1],
            [1, 0],
            [-1, 0]
        ].map(([deltaX, deltaY]) => this.#getEntity(x + deltaX, y + deltaY))
    }

    #unlockDoor = (door) => {
        door.isLocked = false
    }

    #openDoor = (door) => {
        this.#setEntity(door.x, door.y, new Empty())
    }

    #discoverHiddenObject = (object) => {
        this.#setEntity(object.x, object.y, new Key('blue'))
    }




}
