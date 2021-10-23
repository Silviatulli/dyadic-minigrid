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

// Create server
const server = http.createServer(app);
const io = new Server(server);

let controller = null

const emitEvent = (name, body, to) => {
    console.log('emitEvent', name)
    if (to === undefined || to === null) {
        io.emit(name, body)
    }
    else {
        console.log('XXX')
        io.to(to).emit(name, body)

    }
}

const onDisconnect = (socket, reason) => {
    console.log('disconnected')
    controller.onUserDisconnected(socket.id)
}

const onKeyStroke = (keyCode, userId) => {
    console.log('onKeyStroke', keyCode)
    controller.onKeyStroke(keyCode, userId)
}

const onMenuCommand = (command, userId) => {
    controller.onMenuCommand(command, userId)
}

io.on('connection', (sock) => {
    console.log('New connection')

    sock.on('disconnect', (reason) => {
        onDisconnect(sock, reason)
    })

    sock.on('onKeyStroke', (keyCode) => {
        onKeyStroke(keyCode, sock.id)
        logEvent(
            'actions',
            JSON.stringify(keyCode+', '+sock.id))
    })

    sock.on('onMenuCommand', (command) => {
        onMenuCommand(command, sock.id)
    })

    sock.on('playerType', (selectedPlayer) => {
        sock.emit('playerType', selectedPlayer);
    });

    sock.on('chat', function(data) {
        console.log('CHAT', sock.id);
        const { message } = data
        controller.onChatMessage(sock.id, message)
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


controller = new Controller(emitEvent)
