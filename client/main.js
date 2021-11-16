import {
    GameInterface
} from './gameInterface/index.js'
import { initChat, populateButtons } from './chat/main.js'

var room;

const listenToKeyStrokes = (socket) => {
    document.addEventListener('keydown', (event) => {
        let code = event.keyCode;

        if(room){
        socket.emit('onKeyStroke', {
            room: room,
            keyCode: code
         })
        }

      }, false);
}

/*
const onJoinAsPlayerClicked = (socket) => {
    socket.emit('onMenuCommand', 'joinAsPlayer')
    populateButtons(true)
}
*/

const onJoinAsObserverClicked = (socket) => {
    document.getElementById('button-join-as-observer').style.visibility='hidden';

    socket.emit('onJoin')
    populateButtons(false)
}

/*
const onNewGameClicked = (socket) => {
    console.log('newGameClicked')
    socket.emit('onNewGame', {
        room: room,
        command: 'newGame'})

    //socket.emit('subscribe', 'roomOne');
}
*/


const listenToGameMenuClicks = (socket) => {
    //const joinAsPlayerButton = document.getElementById('button-join-as-player')
    //joinAsPlayerButton.onclick = () => onJoinAsPlayerClicked(socket)
    const joinAsObserverButton = document.getElementById('button-join-as-observer')
    joinAsObserverButton.onclick = () => onJoinAsObserverClicked(socket)
    //const newGameButton = document.getElementById('button-new-game')
    //newGameButton.onclick = () => onNewGameClicked(socket)
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

    socket.on('game start', function(data) {
        //$( "#connecting" ).remove();
        //$( "#connected" ).text('Connected...');
          room = data.room;

          initChat(socket,room)

          console.log(room);   
      });

    /*socket.on('timer', (time) => {
        console.log('Received: timer', time)
        gameInterface.render(time)
    })*/

    return socket
}

const socket = initSocket()
listenToGameMenuClicks(socket)
listenToKeyStrokes(socket)
