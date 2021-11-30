import { Game } from '../game/index.js'
import { logEvent } from '../event_logger/index.js'

export class Controller {

    game = null
    learner = null
    teacher = null
    gameTimerId = null
    gamesCounter = 0
    totalScore = 0

    constructor(emitEvent) {
        this.emitEvent = emitEvent
    }


    onChatMessage = (userId, message, room) => {
        console.log('onChatMessage', userId, message)
        const handle = this.#getHandle(userId)
        const event = {
            message: message,
            handle: handle,
        }
        logEvent(
            'explanations',
            JSON.stringify(event))
        this.sendMessage(event,room)
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

    onGameScoreChanged = (newScore, room) => {
        //this.#sendMessageAsServer(`New score: ${newScore}`)
        this.totalScore = this.totalScore + newScore
        logEvent(
            'scores',
            parseInt(newScore))
        if(newScore >= 90){
            this.newGame(room)
        }
    }


    sendMessage = (message, room) => {
        this.emitEvent('chat', message, room);
    }

    emitScore = () => {
        this.emitEvent('gameScore', this.game.getPlayerScore())
        console.log('game score is:', parseInt(this.game.getPlayerScore()))

    }



    newGame = (room) => {
        this.game = new Game({
            onGameScoreChanged: this.onGameScoreChanged,
            scenarioIndex: this.gamesCounter
        })
        this.gamesCounter++
        console.log(this.gamesCounter)
        this.emitGameState(room)
        this.#clearGameTimer()
        this.#startGameTimer()
    }


    onGameTimeout = () => {
            this.#sendMessageAsServer('The game is over!')
            if(this.gamesCounter <= 2){
            this.newGame()
            }
            else {
             this.endGame()
            }

    }


    #clearGameTimer = () => {
        if (this.gameTimerId !== null) {
            clearTimeout(this.gameTimerId)
            this.gameTimerId = null
        }
    }

    #startGameTimer = () => {
        this.gameTimerId = setTimeout(this.onGameTimeout, 1000*300)
        //this.emitEvent('timer', this.gameTimerId)
        console.log(this.gameTimerId)
    }

    emitGameState = (room) => {
       this.emitEvent('gameState', this.game.getState(), room)
       logEvent(
            'states',
            JSON.stringify(this.game.getState()))
        }

    onKeyStroke = (keyCode, userId, room) => {
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
            // 9 (instead of 13 - enter, as it was previously)
            else if (keyCode === 57) {
                this.game.discoverHiddenObject()
            }
            // 0 (instead of 'm' as previously)
            else if (keyCode === 48) {
                this.game.moveObjectPressed()
            }
            this.emitGameState(room)
        }
    }

    onNewGameCommand = (room) => {
        let canStart = true
        if (this.learner === null) {
            canStart = false
            this.#sendMessageAsServer('The game cannot start without a learner', room)
        }
        if (this.teacher === null) {
            canStart = false
            this.#sendMessageAsServer('The game cannot start without a teacher', room)
        }
        if (canStart) {
           if(this.gamesCounter<=2){
                this.newGame(room)
                this.#sendMessageAsServer('A new game has started!', room)
            }
           }
         }

    endGame = () => {
        this.emitEvent('gameEnded', {})
        this.#sendMessageAsServer('Congrats! You finished the game! You got ' + this.totalScore + ' points.\n Please learner got to this link to end: https://forms.gle/dmoYD35xbhTHiiyD7', this.learner.id)
        this.#sendMessageAsServer('Congrats! You finished the game! You got ' + this.totalScore + ' points.\n Please teacher go to this link to end: https://forms.gle/Wueor5rEaCWcxrhw5', this.teacher.id)
    }

    /*
    onMenuCommand = (command, userId) => {
        console.log('onMenuCommand', command, userId)
        /*
        else if (command === 'newGame') {
            if(this.gamesCounter<=2){
                this.onNewGameCommand()
            }
            else {
                this.endGame()
            }
        }
    }
    */


    onJoin = (userId, room, task) => {
        console.log('onJoin', userId)

        if (task == "learner") {
        this.learner = {
            id: userId,
        }
        this.gamesCounter = 0
        this.#sendMessageAsServer('A learner has joined the game',room)
        this.#sendMessageAsServer('Welcome! Here are some additional tips for you. Follow the teacher\'s explanations and do not hesitate to ask and use the "Why" button if you need further information. Now it\'s time to play! Wait for the teacher to start a "New Game" and have fun!', userId)
        this.#sendMessageAsServer('Waiting for a teacher to start the game..',room)
    }
        else if (task == "teacher") {
            this.teacher = {
                id: userId
        }
            this.gamesCounter = 0
            this.#sendMessageAsServer('A teacher has joined the game',room)
            //this.#sendMessageAsServer('Waiting for a learn to start the game..',room)
            this.#sendMessageAsServer('Welcome! Here are some additional tips for you. Plan ahead to provide informative explanations on how to achieve the mission in the minimum number of steps. You can click on the words "because" "instead" "better" and "worse" to add them in your explanations and compare the outcomes of two possible actions in the game. Now it\'s time to play! Click on "New Game" and have fun! ', userId)
            this.onNewGameCommand(room)
        }
 

        }

    onNewGame = (command, userId, room, task) => {
        console.log('onNewGame', command, userId)
            this.onNewGameCommand(room)

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