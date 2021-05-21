const io = require("socket.io")({
    serveClient: false
});

export default class Socket {
    private socket = io("ws://localhost:4000");

    constructor() {
        this.socket.on("connect", () => {
        });
    }

    disconnect() {
        this.socket.on("disconnect", () => {

        });
    }

    isConnected(): boolean {
        return this.socket.connected;
    }

    id(): string {
        return this.socket.id;
    }

    sendData(eventName: string, data: any) {
        this.socket.emit(eventName, data);
    }
}

