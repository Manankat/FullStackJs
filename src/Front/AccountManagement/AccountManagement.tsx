import {Form} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import React from "react";
import {Auth} from "../../Services/Auth";

export default class accountManagement extends React.Component {

    constructor(props) {
        super(props);
    }

    sendUserData(registration: boolean, data: any) {
        if (registration) {
            Auth.register(data);
        } else {
            Auth.login(data);
        }
    }

    render()
    {
        return (
            <Form>
                <Form.Group controlId="formUsernameLogin">
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="text" placeholder="username"/>
                </Form.Group>

                <Form.Group controlId="formEmailLogin">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="email" placeholder="email"/>
                </Form.Group>

                <Form.Group controlId="formPasswordLogin">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password"/>
                </Form.Group>

                <Form.Group controlId="formPasswordLoginAgain">
                    <Form.Label>Password (again)</Form.Label>
                    <Form.Control type="password" placeholder="Password"/>
                </Form.Group>

                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        );
    }
}
