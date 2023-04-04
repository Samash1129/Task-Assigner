import React, { Component } from "react";
import { Button, Form } from 'react-bootstrap';
import './index.css';

class Login extends Component {
    render() {
        return (
            <Form className="login-form">
                <Form.Group className="mb-3" controlId="formBasicEmail" style={{ backgroundColor: '#219ebc' }}>
                    <Form.Label style={{ backgroundColor: '#219ebc' }}>ERP/Username</Form.Label>
                    <Form.Control type="text" placeholder="Enter your erp/username" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword" style={{ backgroundColor: '#219ebc' }}>
                    <Form.Label style={{ backgroundColor: '#219ebc' }}>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" />
                </Form.Group>

                <Button variant="primary" type="submit" className="login-btn">
                    Login
                </Button>
            </Form>
        )
    }
}

export default Login;