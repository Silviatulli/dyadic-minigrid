import {
    GameInterface
} from './gameInterface/index.js'
import {
	CANVAS_STYLE,
	OBJECT_STYLES,
	CELL_STYLE,
	BOARD_STYLE,
	TITLE_SECTION_STYLE,
	SCORE_STYLE,
	TIME_STYLE
} from './gameInterface/canvasStyles.js'

import { initChat, populateButtons, teacherinfo } from './chat/main.js'

var room;

const listenToKeyStrokes = (socket) => {
    document.addEventListener('keydown', (event) => {
        let code = event.keyCode;

        socket.emit('onKeyStroke', {
            room: room,
            keyCode: code
         })

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

const showScore = () => {
          SCORE_STYLE.textColor = 'white';
          SCORE_STYLE.font = '12px Source Sans Pro';
}


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
        teacherinfo(true)
    })

    socket.on('game start', function(data) {
        //$( "#connecting" ).remove();
        //$( "#connected" ).text('Connected...');
          room = data.room;

          initChat(socket,room)

          if(data.task == "learner"){
            populateButtons(true)
            teacherinfo(true)
          }

          else{
            populateButtons(false)
            teacherinfo(false)
            showScore()
          }
          

          console.log(room);   
      });
/*
       console.log('Received: timer', time)
       gameInterface.render(time)
    })*/

    return socket
}

const socket = initSocket()
listenToGameMenuClicks(socket)
listenToKeyStrokes(socket)
