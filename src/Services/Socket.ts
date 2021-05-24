import io from "socket.io-client"
const ENDPOINT = "http://localhost:4000/";
const socket = io(ENDPOINT)
export default socket;


export function createRoom(data: any) {
    socket.emit('create-game', data);
    socket.on('room-created', function(data) {
        console.log(data);
    });
}

export function leaveRoom(data: any) {
    socket.emit('leave-game', data);
    socket.on('leave-game', function(data) {
        console.log(data);
    });
}

export function readyPlayer(uuid: string, player: string) {
    socket.emit('ready', {uuid: uuid, player: player});
    socket.on('ready', function(data) {
        console.log(data);
    });
}

export function joinRoom(data: any) {
    socket.emit('join-game', data);
    socket.on('join-game', function(data) {
        console.log(data);
    });
}

export function sendData(uuid: string, gamestate: string) {
    socket.emit('player-move', { uuid: uuid, gameState: gamestate });
    socket.on('player-move', function(data) {
        console.log(data);
    });
}
