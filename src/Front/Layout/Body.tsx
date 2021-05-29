import { create } from "domain";
import { Button } from "react-bootstrap";
import AccountManagement from "../AccountManagement/AccountManagement";
import GameManagement from "../GameManagement/GameManagement";
import { sendData, createRoom, leaveRoom, joinRoom, readyPlayer } from "../../Services/Socket"

enum Type {
    nothing,
    accountManagement,
    gameManagement,
    Friends
}

export default function Body(props: any) {

    function create() {
        console.log("Create")
        createRoom({username: "Mananka", color: 3})
    }

    function join() {
        console.log("Join")
        joinRoom({uuid: "87308b0a-2dde-455f-a47a-0fed6d7bad98", username: "Mananka", color: 3})
    }

    function leave() {
        console.log("Leave")
        leaveRoom({uuid: "87308b0a-2dde-455f-a47a-0fed6d7bad98", username: "Mananka", color: 3})
    }

    function move() {
        console.log("Move")
        sendData("87308b0a-2dde-455f-a47a-0fed6d7bad98", 'Mananka')
    }

    function ready() {
        console.log("Ready")
        readyPlayer("87308b0a-2dde-455f-a47a-0fed6d7bad98", "Mananka")
    }

    switch (props.type) {
        case Type.accountManagement: return(<AccountManagement/>);
        case Type.gameManagement: return(<GameManagement/>);
        case Type.Friends:
        case Type.nothing:
        default: return(<div>
            <Button onClick={create}>Create</Button>
            <Button onClick={join}>Join</Button>
            <Button onClick={leave}>Leave</Button>
            <Button onClick={move}>Move</Button>
            <Button onClick={ready}>Ready</Button>
        </div>);
    }
}
