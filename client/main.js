import {
    GameInterface
} from './gameInterface/index.js'
import { initChat, populateButtons } from './chat/main.js'


const listenToKeyStrokes = (socket) => {
    document.addEventListener('keydown', (event) => {
        let code = event.keyCode;
        socket.emit('onKeyStroke', code)
      }, false);
}

const onJoinAsPlayerClicked = (socket) => {
    socket.emit('onMenuCommand', 'joinAsPlayer')
    populateButtons(true)
}

const onJoinAsObserverClicked = (socket) => {
    socket.emit('onMenuCommand', 'joinAsObserver')
    populateButtons(false)
}

const onNewGameClicked = (socket) => {
    console.log('newGameClicked')
    socket.emit('onMenuCommand', 'newGame')
}


const listenToGameMenuClicks = (socket) => {
    const joinAsPlayerButton = document.getElementById('button-join-as-player')
    joinAsPlayerButton.onclick = () => onJoinAsPlayerClicked(socket)
    const joinAsObserverButton = document.getElementById('button-join-as-observer')
    joinAsObserverButton.onclick = () => onJoinAsObserverClicked(socket)
    const newGameButton = document.getElementById('button-new-game')
    newGameButton.onclick = () => onNewGameClicked(socket)
}

const initSocket = () => {
    let gameInterface = null
    const socket = io()
    socket.on('gameState', (gameState) => {
        console.log('Received: gameState', gameState)
        if (gameInterface === null) {
            gameInterface = new GameInterface()
        }
        gameInterface.render(gameState)
    })
    socket.on('gameEnded', () => {
        console.log('Received: gameEnded')
        gameInterface.clearCanvas()
    })

    /*socket.on('timer', (time) => {
        console.log('Received: timer', time)
        gameInterface.render(time)
    })*/

    return socket
}

const socket = initSocket()
initChat(socket)
listenToGameMenuClicks(socket)
listenToKeyStrokes(socket)
