import { useState } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';

export default function AddUser() {
    const [password, setPassword] = useState('');

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
                    <Form.Group as={Col} controlId="formGridEmail" style={{marginBottom: 12}}>
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" placeholder="Enter Name" autocomplete='off' />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridPassword" style={{marginBottom: 12}}>
                        <Form.Label>Password</Form.Label>
                        <div className='password'>
                            <Form.Control type="text" placeholder="Password" autocomplete='new-password' className='password-field' value={password} disabled />
                            <Button variant="primary" type="button" onClick={generatePassword}>
                                Generate Password
                            </Button>
                        </div>
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridPassword" style={{marginBottom: 12}}>
                        <Form.Label>ERP</Form.Label>
                        <Form.Control type="text" placeholder="ERP" />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formGridAddress1" style={{marginBottom: 12}}>
                        <Form.Label>Contact Number</Form.Label>
                        <Form.Control type='' placeholder="" />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formGridAddress2" style={{marginBottom: 12}}>
                        <Form.Label>Gender</Form.Label>
                        <div key={`default-radio`} className="mb-3 gender">
                            <Form.Check className='gender-type'
                                type={`radio`}
                                id={`gender-M`}
                                label={`Male`}
                            />
                            <Form.Check
                                type={`radio`}
                                id={`gender-F`}
                                label={`Female`}
                            />
                        </div>
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridCity" style={{marginBottom: 12}}>
                        <Form.Label>Email</Form.Label>
                        <Form.Control placeholder='Email' />
                    </Form.Group>

                    <Row className="mb-3 last">
                        <Form.Group as={Col} controlId="formGridState" style={{marginBottom: 12}}>
                            <Form.Label>Department</Form.Label>
                            <div className='end'>
                                <Form.Select defaultValue="Select Department" className='department-radio'>
                                    <option>Select Department</option>
                                    {['Marketing', 'Security', 'Guest Relation', 'Administration'].map((department) => (
                                        <option key={department}>{department}</option>
                                    ))}
                                </Form.Select>
                                <Form.Group className='switch' id="formGridCheckbox" style={{marginBottom: 12}}>
                                    <Form.Check
                                        type="switch"
                                        id="custom-switch"
                                        label="Is Admin"
                                    />
                                </Form.Group>
                            </div>
                        </Form.Group>

                    </Row>

                    <Button variant="primary" type="submit" className='add-user'>Add User</Button>
                </Form>
            </div >
        </>
    );
}