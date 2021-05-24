import './Navigation.css'
import {Navbar, Nav, NavDropdown} from "react-bootstrap";
import {Auth} from "../../Services/Auth";
import Login from "../Login/Login";
import React from "react";
import { sendData, createRoom } from "../../Services/Socket"


export default class Navigation extends React.Component {

    constructor(props: any) {
        super(props);
        this.state = {modal: false};
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        // @ts-ignore
        this.setState({modal: !this.state.modal});
    }

    getModalComponent() {
        // @ts-ignore
        if (this.state.modal) {
            return <Login truth={true} onChange={this.handleClick}/>
        }
        return null;
    }

    render() {
        return (
            <>
                <Navbar bg="light" expand="lg">
                    <Navbar.Brand href="#home">Chinese Checker</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                            <Nav.Link href="#home">Home</Nav.Link>
                            <Nav.Link href="#link">Link</Nav.Link>
                            <Nav.Link href="#link">Play a Game Now !</Nav.Link>
                            <NavDropdown title="Account" id="basic-nav-dropdown"
                                         style={{display: Auth.isLogged() ? '' : 'none'}}>
                                <NavDropdown.Item href="#action/3.1">Management</NavDropdown.Item>Sa
                                <NavDropdown.Item href="#action/3.2">Game Saved</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.3">Friends</NavDropdown.Item>
                                <NavDropdown.Divider/>
                                <NavDropdown.Item href="#action/3.4">Logout</NavDropdown.Item>
                            </NavDropdown>
                            <Nav.Link href="#" style={{display: Auth.isLogged() ? 'none' : ''}} onClick={this.handleClick}>Sign
                                In !</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
                {this.getModalComponent()}
            </>
        );
    };
};
