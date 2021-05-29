import {Form} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import React from "react";

export default function accountManagement() {
    return (
        <Form>
            <Form.Group controlId="formUsernameLogin">
                <Form.Label>Username</Form.Label>
                <Form.Control type="text" placeholder="username" />
            </Form.Group>

            <Form.Group controlId="formEmailLogin">
                <Form.Label>Password</Form.Label>
                <Form.Control type="email" placeholder="email" />
            </Form.Group>

            <Form.Group controlId="formPasswordLogin">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" />
            </Form.Group>

            <Form.Group controlId="formPasswordLoginAgain">
                <Form.Label>Password (again)</Form.Label>
                <Form.Control type="password" placeholder="Password" />
            </Form.Group>

            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form>
    );
}
