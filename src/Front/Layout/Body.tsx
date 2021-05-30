import { create } from "domain";
import { Button } from "react-bootstrap";
import AccountManagement from "../AccountManagement/AccountManagement";
import GameManagement from "../GameManagement/GameManagement";
import { sendData, createRoom, leaveRoom, joinRoom, readyPlayer } from "../../Services/Socket"

export enum LayoutBodyType {
    nothing,
    accountManagement,
    gameManagement,
    Friends
}

export default function Body(props: any) {
    switch (props.type) {
        case LayoutBodyType.accountManagement: return(<AccountManagement/>);
        case LayoutBodyType.gameManagement: return(<GameManagement/>);
        case LayoutBodyType.Friends:
        case LayoutBodyType.nothing:
        default: return(<div>
        </div>);
    }
}
