import {useState} from "react";
import AccountManagement from "../AccountManagement/AccountManagement";
import GameManagement from "../GameManagement/GameManagement";

enum Type {
    nothing,
    accountManagement,
    gameManagement,
    Friends
}

export default function Body() {
    const [type, setType] = useState(Type.nothing);
    switch (type) {
        case Type.accountManagement: return(<AccountManagement></AccountManagement>);
        case Type.gameManagement: return(<GameManagement></GameManagement>);
        case Type.Friends:
        case Type.nothing:
        default: return(<div></div>);
    }
}
