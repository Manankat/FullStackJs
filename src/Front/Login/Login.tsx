import React, {useState} from 'react';
import './Login.css';
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import {Accordion, Card, Form} from "react-bootstrap";

export default function LoginComponent(props: any) {
    const [show, setShow] = useState(props.truth);
    const handleClose = () => {setShow(false); props.onChange()};
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
                                    <Form>
                                        <Form.Group controlId="formUsernameLogin">
                                            <Form.Label>Username</Form.Label>
                                            <Form.Control type="text" placeholder="username" />
                                        </Form.Group>

                                        <Form.Group controlId="formPasswordLogin">
                                            <Form.Label>Password</Form.Label>
                                            <Form.Control type="password" placeholder="Password" />
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
                                    <Form>
                                        <Form.Group controlId="formUserSubscribe">
                                            <Form.Label>Username</Form.Label>
                                            <Form.Control type="text" placeholder="username" />
                                        </Form.Group>
                                        <Form.Group controlId="formEmailSubscribe">
                                            <Form.Label>Username</Form.Label>
                                            <Form.Control type="email" placeholder="email" />
                                        </Form.Group>
                                        <Form.Group controlId="formPasswordSubscribe">
                                            <Form.Label>Password</Form.Label>
                                            <Form.Control type="password" placeholder="Password" />
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
