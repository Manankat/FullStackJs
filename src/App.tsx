import React from 'react';
import './App.css';
import Header from "./Front/Layout/Header";
import Body, {LayoutBodyType} from "./Front/Layout/Body";

export default class App extends React.Component{
    private bodyType: LayoutBodyType;

    constructor(props) {
        super(props);
        this.bodyType = LayoutBodyType.nothing;
    }

    handleChangeFromHeader(type: LayoutBodyType) {
        this.bodyType = type;
    }

    getType(): LayoutBodyType {
        return this.bodyType;
    }

    render() {
        return (
            <>
                <Header onChangeBody={this.handleChangeFromHeader}/>
                <Body type={this.getType()}/>
            </>
        )
    }
}
