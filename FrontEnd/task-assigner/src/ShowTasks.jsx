import React from "react";
import { Form, ListGroup } from 'react-bootstrap';
import './index.css';

export default function showTasks({ tasks }) {
    const checkBox = (e) => {
        e.stopPropagation()
    }
    
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
                                <span>Assigned to: {task.assigned_to}</span>
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