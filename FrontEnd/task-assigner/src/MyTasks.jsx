import React from "react";
import { Form, ListGroup } from 'react-bootstrap';
import './index.css';

export default function MyTasks({ tasks }) {
    const checkBox = (e) => {
        e.stopPropagation()
    }
    console.log(tasks)
    
    return (
        <>
            <div className="list">
                <ListGroup>
                    {tasks.map(task => (
                        <ListGroup.Item key={task._id} >
                            <div className="for-checkbox">
                                <Form.Check type={"checkbox"} id="checkbox" onClick={checkBox} />

                                <div>
                                    <span>Task Name: {task.task_name}</span>
                                </div>
                            </div>

                            <div>
                                <span>Assigned by: {task.assigned_by}</span>
                            </div>

                            <div>
                                <span>Deadline: {task.end_date}</span>
                            </div>

                            <div>
                                <span>Status: {task.status}</span>
                            </div>
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            </div>
        </>
    );
}