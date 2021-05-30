import React from 'react';
import './App.css';
import Header from "./Front/Layout/Header";
import Body, {LayoutBodyType} from "./Front/Layout/Body";

export default class App extends React.Component{
    constructor(props) {
        super(props);
        this.state = {type: LayoutBodyType.nothing};
    }

    handleChangeFromHeader(type: LayoutBodyType) {
        this.setState({type: type});
    }

    getType(): LayoutBodyType {
        // @ts-ignore
        return this.state.type;
    }

    render() {
        return (
            <>
                <Header onChangeBody={this.handleChangeFromHeader.bind(this)}/>
                <Body type={this.getType()}/>
            </>
        )
    }
}
