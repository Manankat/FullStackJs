import React, { useState } from 'react';
import './Login.css';
import Modal from 'react-bootstrap/Modal'
import { Auth } from "../../Services/Auth";
import Button from 'react-bootstrap/Button'
import { Accordion, Card, Form } from "react-bootstrap";
import UserModel from "../../Model/User";

export default function LoginComponent(props: any) {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [newusername, setNewusername] = useState("");
    const [newpassword, setNewpassword] = useState("");
    const [newemail, setNewemail] = useState("");
    const [show, setShow] = useState(props.truth);
    const handleClose = () => { setShow(false); props.onChange() };

    function login(event) {
        event.preventDefault();
        console.log(username, password);
    }
    function register(event) {
        event.preventDefault();
        console.log(newusername, newemail, newpassword);
        let user = new UserModel();
        user.email = newemail;
        user.password = newpassword;
        user.username = newusername;
        Auth.register(user);
    }

    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>LogIn</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Accordion defaultActiveKey="0">
                        <Card>
                            <Card.Header>
                                <Accordion.Toggle as={Button} variant="link" eventKey="0">
                                    Already an Account ?
                                </Accordion.Toggle>
                            </Card.Header>
                            <Accordion.Collapse eventKey="0">
                                <Card.Body>
                                    <Form onSubmit={login}>
                                        <Form.Group controlId="formUsernameLogin">
                                            <Form.Label>Username</Form.Label>
                                            <Form.Control type="text" placeholder="username" value={username} onChange={(e) => setUsername(e.target.value)}/>
                                        </Form.Group>

                                        <Form.Group controlId="formPasswordLogin">
                                            <Form.Label>Password</Form.Label>
                                            <Form.Control type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                                        </Form.Group>
                                        <Button variant="primary" type="submit">
                                            Submit
                                        </Button>
                                    </Form>
                                </Card.Body>
                            </Accordion.Collapse>
                        </Card>
                        <Card>
                            <Card.Header>
                                <Accordion.Toggle as={Button} variant="link" eventKey="1">
                                    No account ? <b>Subscribe today!</b>
                                </Accordion.Toggle>
                            </Card.Header>
                            <Accordion.Collapse eventKey="1">
                                <Card.Body>
                                    <Form onSubmit={register}>
                                        <Form.Group controlId="formUserSubscribe">
                                            <Form.Label>Username</Form.Label>
                                            <Form.Control type="text" placeholder="username" value={newusername} onChange={(e) => setNewusername(e.target.value)}/>
                                        </Form.Group>
                                        <Form.Group controlId="formEmailSubscribe">
                                            <Form.Label>Email</Form.Label>
                                            <Form.Control type="email" placeholder="email" value={newemail} onChange={(e) => setNewemail(e.target.value)}/>
                                        </Form.Group>
                                        <Form.Group controlId="formPasswordSubscribe">
                                            <Form.Label>Password</Form.Label>
                                            <Form.Control type="password" placeholder="Password" value={newpassword} onChange={(e) => setNewpassword(e.target.value)} />
                                        </Form.Group>
                                        <Button variant="primary" type="submit">
                                            Submit
                                        </Button>
                                    </Form>
                                </Card.Body>
                            </Accordion.Collapse>
                        </Card>
                    </Accordion>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}
