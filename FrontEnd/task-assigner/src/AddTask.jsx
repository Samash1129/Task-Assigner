import { useState } from 'react';
import { Col, Button } from 'react-bootstrap';
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

    console.log(localStorage.getItem('token'))
    const add_task = async (event) => {
        event.preventDefault();

        // get form data
        const formData = new FormData(event.target);

        try {
            // post data to backend API
            const response = await axios.post('/dashboard/tasks/addTask', formData, {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token'),
                    'Content-Type': 'multipart/form-data'
                }
            });

            console.log(response.data);
            event.target.reset();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            <div className='list'>
                <Form className='addtaskform' onSubmit={add_task}>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Task Name</Form.Label>
                        <Form.Control type="text" placeholder="Task Name" name="task_name" required />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                        <Form.Label>Description</Form.Label>
                        <Form.Control as="textarea" rows={3} name="description" required />
                    </Form.Group>

                    <Form.Group controlId="dob" style={{ marginBottom: 12 }}>
                        <Form.Label>Select Date</Form.Label>
                        <Form.Control type="date" name="end_date" required />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridState" style={{ marginBottom: 12 }}>
                        <Form.Label>Department</Form.Label>
                        <Form.Select defaultValue="Select Department" required onChange={handleDepartmentSelect} name="department">
                            <option>Select Department</option>
                            {['Marketing', 'Security', 'Guest Relation', 'Administration'].map((department) => (
                                <option key={department}>{department}</option>
                            ))}
                        </Form.Select>
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridState" style={{ marginBottom: 12 }}>
                        <Form.Label>Assigned To</Form.Label>
                        <Form.Select defaultValue="Select User" required disabled={!department} name="assigned_to">
                            <option>Select User</option>
                            {users.map((user) => (
                                <option key={user.id}>{user.name}</option>
                            ))}
                        </Form.Select>
                    </Form.Group>

                    <Form.Group controlId="formFileMultiple" className="mb-3" >
                        <Form.Label>Upload Files</Form.Label>
                        <Form.Control type="file" multiple name="files" />
                    </Form.Group>

                    <Button variant="primary" type="submit" className='add-task'>Add Task</Button>
                </Form>
            </div>
        </>
    );
}
