import { create } from "domain";
import { Button } from "react-bootstrap";
import AccountManagement from "../AccountManagement/AccountManagement";
import GameManagement from "../GameManagement/GameManagement";
import { sendData, createRoom, leaveRoom, joinRoom, readyPlayer } from "../../Services/Socket"
import Game from "../Game/Game";

export enum LayoutBodyType {
    nothing,
    accountManagement,
    gameManagement,
    game,
    Friends
}

export default function Body(props: any) {
    function changeBody(type: LayoutBodyType) {
        props.onChangeBody(type);
    }

    switch (props.type) {
        case LayoutBodyType.accountManagement: return(<AccountManagement/>);
        case LayoutBodyType.gameManagement: return(<GameManagement onChangeBody={changeBody}/>);
        case LayoutBodyType.game: return(<Game />)
        case LayoutBodyType.Friends:
        case LayoutBodyType.nothing:
        default: return(<div>
        </div>);
    }
}
