import React from 'react';
import './App.css';
import Header from "./Front/Layout/Header";
import Body, {LayoutBodyType} from "./Front/Layout/Body";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Game from "./Front/Game/Game";

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
            <Router>
                <Header onChangeBody={this.handleChangeFromHeader.bind(this)}/>
                <Body type={this.getType()} onChangeBody={this.handleChangeFromHeader.bind(this)}/>
                <Switch>
                    <Route path={'/game/:id'} component={Game}/>
                </Switch>
            </Router>
        )
    }
}
