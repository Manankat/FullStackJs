import './GameManagement.css'
import React from "react";
import Button from 'react-bootstrap/Button';
import {LayoutBodyType} from "../Layout/Body";

export default class GameManagement extends React.Component<any> {

    constructor(props) {
        super(props);
    }

    createNewGame() {
        this.props.onChangeBody(LayoutBodyType.game);
    }

    joinGame() {
        console.log('salut');
    }

    getSavedGamesList(): JSX.Element {
        return React.createElement('tr', null);
    }

    render() {
        return (
            <>
                <Button variant="primary" onClick={this.createNewGame.bind(this)}>Create a New Game</Button>
                <Button variant="secondary" onClick={this.joinGame.bind(this)}>Join a game</Button>
                <table>
                    <thead><tr><th>List of Saved Games</th></tr></thead>
                    <tbody>
                        {this.getSavedGamesList()}
                    </tbody>
                </table>
            </>
        );
    }
}
