import './Navigation.css'
import {Navbar, Nav, NavDropdown, Form, Button, FormControl} from "react-bootstrap";

export default function Navigation() {
    return(
        <>
            <Navbar bg="light" expand="lg">
                <Navbar.Brand href="#home">Chinese Checker</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link href="#home">Home</Nav.Link>
                        <Nav.Link href="#link">Link</Nav.Link>
                        <NavDropdown title="Account" id="basic-nav-dropdown">
                            <NavDropdown.Item href="#action/3.1">Management</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.2">Game Saved</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.3">Friends</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#action/3.4">Logout</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </>
    );
};
