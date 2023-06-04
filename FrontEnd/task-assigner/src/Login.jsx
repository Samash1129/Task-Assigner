import React, { useState } from "react";
import { Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from "./api/axios";
import './index.css';

const LOGIN_URL = '/login'

export default function Login() {
    const [erp, setERP] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(LOGIN_URL, {
                erp,
                password,
            });

            // Login successful
            console.log(response.data);
            localStorage.setItem('token', response.data.Token); // set token in localStorage
            localStorage.setItem('roles', response.data.roles);
            setERP('')
            setPassword('')

            const Role = localStorage.getItem('roles')
            // eslint-disable-next-line
            { Role === 'SuperAdmin' || Role === 'Admin' ? navigate('/dashboard/getUsers') : navigate('/dashboard/tasks/getMyTasks') }
        } catch (err) {
            // Login failed
            console.error(err);
            setError('Invalid username or password');
            setERP('')
            setPassword('')
        }
    }

    const handleERPChange = (e) => {
        setERP(e.target.value);
        setError('');
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
        setError('');
    }

    return (
        <>
            <section>
                <Form className="login-form" onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="formBasicEmail" style={{ backgroundColor: '#219ebc' }}>
                        <Form.Label style={{ backgroundColor: '#219ebc' }}>ERP/Username</Form.Label>
                        <Form.Control
                            placeholder="Enter your erp/username"
                            autoComplete="off"
                            required
                            value={erp}
                            onChange={handleERPChange}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword" style={{ backgroundColor: '#219ebc' }}>
                        <Form.Label style={{ backgroundColor: '#219ebc' }}>Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Password"
                            required
                            value={password}
                            onChange={handlePasswordChange}
                        />
                    </Form.Group>
                    {error && <div className="error">{error}</div>}
                    <Button variant="primary" type="submit" className="login-btn">
                        Login
                    </Button>
                </Form>
            </section>
        </>
    )
}