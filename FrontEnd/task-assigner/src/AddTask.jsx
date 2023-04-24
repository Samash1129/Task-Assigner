import { useState } from 'react';
import { Col } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import axios from './api/axios';

export default function AddTask() {
    const [department, setDepartment] = useState('');
    const [users, setUsers] = useState([]);

    const handleDepartmentSelect = async (event) => {
        const selectedDepartment = event.target.value;
        setDepartment(selectedDepartment);

        try {
            const response = await axios.get(`/dashboard/addTask?department=${selectedDepartment}`, {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token'),
                }
            });
            console.log(selectedDepartment)
            setUsers(response.data);
        } catch (error) {
            console.log(selectedDepartment)
            console.error(error);
        }
    };

    return (
        <>
            <div className='list'>
                <Form>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="name@example.com" />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                        <Form.Label>Example textarea</Form.Label>
                        <Form.Control as="textarea" rows={3} />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridState">
                        <Form.Label>Department</Form.Label>
                        <Form.Select defaultValue="Select Department" required onChange={handleDepartmentSelect}>
                            <option>Select Department</option>
                            {['Marketing', 'Security', 'Guest Relation', 'Administration'].map((department) => (
                                <option key={department}>{department}</option>
                            ))}
                        </Form.Select>
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridState">
                        <Form.Label>Assigned To</Form.Label>
                        <Form.Select defaultValue="Select User" required disabled={!department}>
                            <option>Select User</option>
                            {users.map((user) => (
                                <option key={user.id}>{user.name}</option>
                            ))}
                        </Form.Select>
                    </Form.Group>
                </Form>
            </div>
        </>
    );
}
