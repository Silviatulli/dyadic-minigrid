import { Controller } from './controller/index.js'
import * as http from 'http'
import express from 'express'
import * as fs from 'fs'
import { Server } from 'socket.io'
import { logEvent } from './event_logger/index.js'
// import mongoose from 'mongoose' // Remove comment if you have an online database

const app = express();

// Serve client static files
// const clientPath = `${__dirname}/../client`;
app.use(express.static('../client'));

var rooms = {};
var queue = [];
var names =[];

var games_boards = []

var controller = []

// Create server
const server = http.createServer(app);
const io = new Server(server);

//let controller = null

const emitEvent = (name, body, room) => {
    console.log('emitEvent', name)
    console.log('roomName', room)
    if (room === undefined || room === null) {
        io.emit(name, body)
    }
    else {
        console.log('XXX')
        io.in(room).emit(name, body)

    }
}

const onDisconnect = (socket, reason) => {
    console.log('disconnected')
    //controller.onUserDisconnected(socket.id)
}

const onKeyStroke = (keyCode, userId, room) => {
    console.log('onKeyStroke', keyCode, room)

    var room_aux = String(room)
    var idx = room_aux.slice(4, 5)

    if(controller[idx-1]){
        controller[idx-1].onKeyStroke(keyCode, userId, room)
    }
}

/*
const onMenuCommand = (command, userId) => {
    //controller[room].onMenuCommand(command, userId)
}
*/

const onNewGame = (command, userId, room) => {

    var room_aux = room
    var idx = room_aux.slice(4, 5)
    controller[idx-1].onNewGame(command, userId, room)
}

const onJoin = (userId, room, task) => {

    var room_aux = room
    var idx = room_aux.slice(4, 5)
    controller[idx-1].onJoin(userId, room, task)
}

/*
var findPeerForLoneSocket = function(socket) {
    if (queue.length > 0) {
        var peer= queue.pop();
        var room = socket.id + '#' + peer.id;
        peer.join(room);
        socket.join(room);
        rooms[peer.id] = room;
        rooms[socket.id] = room;
        console.log('Peer', peer);
        console.log('Socket', socket);
        peer.emit('game start', {'name': names[socket.id], 'room':room});
        socket.emit('game start', {'name': names[peer.id], 'room':room});
    } else {
        queue.push(socket);
    }
  }
*/
var player_count = 1;

var sendRoomID = function(socket, task) {

        var room = "room" + Math.floor(player_count/2);
        console.log('Player Count', player_count);
        console.log('RoomID', room);
        socket.join(room);
        console.log('Socket', socket);
        socket.emit('game start', {'room':room, 'task':task });

  }



io.on('connection', (sock) => {
    console.log('New connection')

    /*
    sock.on('subscribe', function(room) {
        console.log('joining room', room);
        sock.join(room);
     })
    */

    sock.on('disconnect', (reason) => {
        onDisconnect(sock, reason)
    })

    sock.on('onKeyStroke', (data) => {
        onKeyStroke(data.keyCode, sock.id, data.room)
        logEvent(
            'actions',
            JSON.stringify(data.keyCode+', '+sock.id))
    })

    sock.on('onMenuCommand', (command) => {
        //player_count++;
        //sendRoomID(sock);
        onMenuCommand(command, sock.id)
    })

    sock.on('onNewGame', (data) => {

        onNewGame(data.command, sock.id, data.room)
    })

    sock.on('onJoin', () => {

        player_count++;
        var room = "room" + Math.floor(player_count/2);

        var room_aux = String(room)
        var idx = room_aux.slice(4, 5)
        console.log(idx)

        if(!controller[idx-1])
            controller[idx-1] = new Controller(emitEvent);

        var task;


            if (player_count % 2 == 0)
                task = "learner";
            else
                task = "teacher";
    

        sendRoomID(sock, task);


        onJoin(sock.id, room, task)
    })

    sock.on('playerType', (selectedPlayer) => {
        sock.emit('playerType', selectedPlayer);
    });

    sock.on('chat', (data) => {
        console.log('CHAT', sock.id);
        console.log('ROOM', data.room);
        const { message } = data.message

        var room_aux = String(data.room)
        var idx = room_aux.slice(4, 5)

        controller[idx-1].onChatMessage(sock.id, data.message, data.room)
    });

    sock.on('typing', function(data) {
        sock.broadcast.emit('typing', data);
    });

    sock.emit('message', 'Hi, you are connected');
});




server.on('error', (err) => {
    console.error('Server error:', err);
});

server.listen(3000, () => {
    console.log('minigrid started on 3000');
});

/*main().catch(err => console.log(err));
async function main() {
  await mongoose.connect('mongodb://localhost:27017/test');
}*/


//controller = new Controller(emitEvent)
