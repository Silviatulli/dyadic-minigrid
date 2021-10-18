import { Game } from '../game/index.js'
import { logEvent } from '../event_logger/index.js'

export class Controller {

    game = null
    learner = null
    teacher = null
    gameTimerId = null

    constructor(emitEvent) {
        this.emitEvent = emitEvent
    }

    onChatMessage = (userId, message) => {
        console.log('onChatMessage', userId, message)
        const handle = this.#getHandle(userId)
        const event = {
            message: message,
            handle: handle
        }
        logEvent(
            'explanations',
            JSON.stringify(event))
        this.sendMessage(event)
    }

    #getHandle = (userId) => {
        if (userId === this.learner?.id) {
            return 'learner'
        }
        else if (userId === this.teacher?.id) {
            return 'teacher'
        }
        return ''
    }

    #sendMessageAsServer = (text, to) => {
        this.sendMessage({
            message: text,
            handle: 'minigrid',
        }, to)
    }

    onGameScoreChanged = (newScore) => {
        //this.#sendMessageAsServer(`New score: ${newScore}`)
        logEvent(
            'scores',
            parseInt(newScore))
    }


    sendMessage = (message, to) => {
        this.emitEvent('chat', message, to);
    }

    emitScore = () => {
        this.emitEvent('gameScore', this.game.getPlayerScore())
        console.log('game score is:', parseInt(this.game.getPlayerScore()))

    }

    newGame = () => {
        this.game = new Game({
            onGameScoreChanged: this.onGameScoreChanged
        })
        this.emitGameState()
        this.#sendMessageAsServer('A new game has started!')
        this.#clearGameTimer()
        this.#startGameTimer()
    }

    onGameTimeout = () => {
        this.#sendMessageAsServer('Timeout reached! The game is over.')
        this.newGame()
    }

    #clearGameTimer = () => {
        if (this.gameTimerId !== null) {
            clearTimeout(this.gameTimerId)
            this.gameTimerId = null
        }
    }

    #startGameTimer = () => {
        this.gameTimerId = setTimeout(this.onGameTimeout, 1000*200)
    }

    emitGameState = () => {
       this.emitEvent('gameState', this.game.getState())
       logEvent(
            'states',
            //(this.game.getState().board))
            (this.game.getState()))
        }

    onKeyStroke = (keyCode, userId) => {
        console.log('onKeyStroke', keyCode, userId)
        if (this.game !== null
            && userId === this.learner?.id) {
            // Left arrow
            if (keyCode === 37) {
                this.game.movePlayerLeftPressed()
            }
            // Right arrow
            else if (keyCode === 39) {
                this.game.movePlayerRightPressed()
            }
            // Down arrow
            else if (keyCode === 38) {
                this.game.movePlayerDownPressed()
            }
            // Up arrow
            else if (keyCode === 40) {
                this.game.movePlayerUpPressed()
            }
            // Shift
            else if (keyCode === 16) {
                this.game.interactWithObjectPressed()
            }
            // Spacebar
            else if (keyCode === 32) {
                this.game.interactWithDoorPressed()
            }
            // Enter
            else if (keyCode === 13) {
                this.game.discoverHiddenObject()
            }
            // M
            else if (keyCode === 77) {
                this.game.moveObjectPressed()
            }
            this.emitGameState()
        }
    }

    onNewGameCommand = () => {
        let canStart = true
        if (this.learner === null) {
            canStart = false
            this.#sendMessageAsServer('The game cannot start without a player')
        }
        if (this.teacher === null) {
            canStart = false
            this.#sendMessageAsServer('The game cannot start without a teacher')
        }
        if (canStart) {
            this.newGame()
        }
    }



    onMenuCommand = (command, userId) => {
        console.log('onMenuCommand', command, userId)
        if (command === 'joinAsPlayer'
            && this.learner === null
            && this.teacher?.id !== userId) {
            this.learner = {
                id: userId,
            }
            this.#sendMessageAsServer('A learner has joined the game')
            this.#sendMessageAsServer('Welcome! Here are some additional tips for you. Follow the teacher\'s explanations and do not hesitate to ask "why" if you need further information. Now it\'s time to play! Wait for the teacher to start a "New Game" and have fun!', userId)
        }
        else if (command === 'joinAsObserver'
                && this.teacher === null
                && this.learner?.id !== userId) {
            this.teacher = {
                id: userId
            }
            this.#sendMessageAsServer('A teacher has joined the game')
            this.#sendMessageAsServer('Welcome! Here are some additional tips for you. Plan ahead to provide informative explanations on how to achieve the mission in the minimum number of steps. You can click on the words "because" "instead" "better" and "worse" to add them in your explanations and compare the outcomes of two possible actions in the game. Now it\'s time to play! Click on "New Game" and have fun! ', userId)
        }
        else if (command === 'newGame') {
            this.onNewGameCommand()
        }
    }

    onUserDisconnected = (userId) => {
        if (this.learner?.id === userId) {
            this.learner = null
        }
        else if (this.teacher?.id === userId) {
            this.teacher = null
        }
    }
}