import './Navigation.css'
import {Nav, Navbar, NavDropdown} from "react-bootstrap";
import {Auth} from "../../Services/Auth";
import Login from "../Login/Login";
import React from "react";
import {LayoutBodyType} from "../Layout/Body";

export default class Navigation extends React.Component<any> {

    constructor(props) {
        super(props);
        this.state = {modal: false};
        this.handleClick = this.handleClick.bind(this);

    }

    handleClick() {
        // @ts-ignore
        this.setState({modal: !this.state.modal});
    }

    handleError(message: String) {
        console.warn(message);
    }

    requestBodyUpdate(type: LayoutBodyType) {
        this.props.onRequestToChangeBody(type);
    }

    handleConnexionSuccess() {
    }

    getModalComponent() {
        // @ts-ignore
        if (this.state.modal) {
            return <Login truth={true} onChange={this.handleClick} onConnectSuccess={this.handleConnexionSuccess} onErrorMessage={this.handleError}/>
        }
        return null;
    }

    componentDidUpdate(prevProps: Readonly<{}>, prevState: Readonly<{}>, snapshot?: any) {
        console.log(prevProps);
    }

    logout() {
        Auth.logout();
        window.location.reload();
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
                            <NavDropdown title="Actions" id="basic-nav-dropdown"
                                         style={{display: Auth.isLogged() ? '' : 'none'}}>
                                <NavDropdown.Item href="" onClick={() => {this.requestBodyUpdate(LayoutBodyType.accountManagement)}}>Account Management</NavDropdown.Item>
                                <NavDropdown.Item href="" onClick={() => {this.requestBodyUpdate(LayoutBodyType.gameManagement)}}>Game Management</NavDropdown.Item>
                                <NavDropdown.Item href="" onClick={() => {this.requestBodyUpdate(LayoutBodyType.accountManagement)}}>Friends</NavDropdown.Item>
                                <NavDropdown.Divider/>
                                <NavDropdown.Item href="" onClick={this.logout}>Logout</NavDropdown.Item>
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
