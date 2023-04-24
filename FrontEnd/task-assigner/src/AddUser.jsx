import { useState } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import axios from './api/axios';

export default function AddUser() {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [erp, setErp] = useState('');
    const [contactNumber, setContactNumber] = useState('');
    const [gender, setGender] = useState('');
    const [email, setEmail] = useState('');
    const [department, setDepartment] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);

    const addUser = async (event) => {
        event.preventDefault()

        try {
            const response = await axios.post('/dashboard/register', {
                name,
                password,
                erp,
                contact_number: contactNumber,
                gender,
                email,
                department,
                roles: isAdmin ? 'Admin' : 'User'
            }, {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token'),
                }
            });

            console.log(response.data); // User Created

            setName('');
            setPassword('');
            setErp('');
            setContactNumber('');
            setGender('');
            setEmail('');
            setDepartment('');
            setIsAdmin(false);

        } catch (error) {
            console.log(localStorage.getItem('token'))
            console.error(error);
            alert('An error occurred while creating the user.');
        }
    }

    const generatePassword = () => {
        let newPassword = '';
        const lowercase = 'abcdefghijklmnopqrstuvwxyz';
        const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const numbers = '0123456789';

        const combined = lowercase + uppercase + numbers

        for (let i = 0; i < 7; i++) {
            const randomIndex = Math.floor(Math.random() * combined.length);
            newPassword += combined[randomIndex];
        }
        setPassword(newPassword);
    }

    return (
        <>
            <div className='list'>
                <Form className='adduserform'>
                    <Form.Group as={Col} controlId="formGridEmail" style={{ marginBottom: 12 }}>
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" placeholder="Enter Name" autoComplete='off' value={name} onChange={(event) => { setName(event.target.value) }} required />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridPassword" style={{ marginBottom: 12 }}>
                        <Form.Label>Password</Form.Label>
                        <div className='password'>
                            <Form.Control type="text" placeholder="Password" autoComplete='new-password' className='password-field' value={password} disabled />
                            <Button variant="primary" type="button" onClick={generatePassword}>
                                Generate Password
                            </Button>
                        </div>
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridPassword" style={{ marginBottom: 12 }}>
                        <Form.Label>ERP</Form.Label>
                        <Form.Control type="text" placeholder="ERP" value={erp} onChange={(event) => { setErp(event.target.value) }} required />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formGridAddress1" style={{ marginBottom: 12 }}>
                        <Form.Label>Contact Number</Form.Label>
                        <Form.Control type='tel' placeholder="Enter Contact Info" value={contactNumber} onChange={(event) => { setContactNumber(event.target.value) }} required />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formGridAddress2" style={{ marginBottom: 12 }}>
                        <Form.Label>Gender</Form.Label>
                        <div key={`default-radio`} className="mb-3 gender">
                            <Form.Check className='gender-type'
                                type={`radio`}
                                id={`gender-M`}
                                label={`Male`}
                                checked={gender === 'Male'}
                                onChange={(event) => { setGender('Male') }}
                                required
                            />
                            <Form.Check
                                type={`radio`}
                                id={`gender-F`}
                                label={`Female`}
                                checked={gender === 'Female'}
                                onChange={(event) => { setGender('Female') }}
                                required
                            />
                        </div>
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridCity" style={{ marginBottom: 12 }}>
                        <Form.Label>Email</Form.Label>
                        <Form.Control placeholder='Email' value={email} onChange={(event) => { setEmail(event.target.value) }} required />
                    </Form.Group>

                    <Row className="mb-3 last">
                        <Form.Group as={Col} controlId="formGridState" style={{ marginBottom: 12 }}>
                            <Form.Label>Department</Form.Label>
                            <div className='end'>
                                <Form.Select defaultValue="Select Department" className='department-radio' value={department} onChange={(event) => { setDepartment(event.target.value) }} required>
                                    <option>Select Department</option>
                                    {['Marketing', 'Security', 'Guest Relation', 'Administration'].map((department) => (
                                        <option key={department}>{department}</option>
                                    ))}
                                </Form.Select>
                                <Form.Group className='switch' id="formGridCheckbox" value={isAdmin} onChange={(event) => { setIsAdmin(event.target.value) }} required>
                                    <Form.Check
                                        type="switch"
                                        id="custom-switch"
                                        label="Is Admin"
                                    />
                                </Form.Group>
                            </div>
                        </Form.Group>
                    </Row>

                    <Button variant="primary" type="submit" className='add-user' onClick={addUser}>Add User</Button>
                </Form>
            </div >
        </>
    );
}