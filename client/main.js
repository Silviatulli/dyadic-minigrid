import {
    GameInterface
} from './gameInterface/index.js'
import { initChat } from './chat/main.js'


const listenToKeyStrokes = (socket) => {
    document.addEventListener('keydown', (event) => {
        let code = event.keyCode;
        socket.emit('onKeyStroke', code)
      }, false);
}

const onJoinAsPlayerClicked = (socket) => {
    socket.emit('onMenuCommand', 'joinAsPlayer')
}

const onJoinAsObserverClicked = (socket) => {
    socket.emit('onMenuCommand', 'joinAsObserver')
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

    return socket
}

const socket = initSocket()
initChat(socket)
listenToGameMenuClicks(socket)
listenToKeyStrokes(socket)
