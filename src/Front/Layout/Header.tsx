import Navigation from "../Navigation/Navigation";
import {LayoutBodyType} from "./Body";

export default function Header(props) {
    function actualizeBody(type: LayoutBodyType) {
        props.onChangeBody(type);
    }


    return(
        // @ts-ignore
        <Navigation onRequestToChangeBody={actualizeBody}/>
    )
}
