import React, { useState } from "react";
import { Accordion, Form, ListGroup, Spinner } from "react-bootstrap";
import './index.css';

export default function ShowUsers({ users }) {
    const [selectedUser, setSelectedUser] = useState(null)

    const showSelectedUser = (user) => {
        setSelectedUser(user)
    }

    const checkBox = (e) => {
        e.stopPropagation()
    }

    return (
        <>
            <div className="list">
                <Accordion className="accordian">
                    <ListGroup>
                        {users.map(user => (
                            <Accordion.Item key={user._id} eventKey={user.erp}>
                                <Accordion.Header onClick={() => showSelectedUser(user)}>
                                    <div className="accordianheader">
                                        <div className="for-checkbox">
                                            <Form.Check type={"checkbox"} id="checkbox" onClick={checkBox} />

                                            <div>
                                                <span>Name: {user.name}</span>
                                            </div>
                                        </div>

                                        <div>
                                            <span>ERP: {user.erp}</span>
                                        </div>

                                        <div>
                                            <span>Department: {user.department}</span>
                                        </div>
                                    </div>
                                </Accordion.Header>
                                <Accordion.Body>
                                    {selectedUser && user.erp ? (
                                        <>
                                            <p>Email: {user.email}</p>
                                            <p>Contact Number: {user.contact_number}</p>
                                            <p>Roles: {user.roles}</p>
                                        </>
                                    ) : (
                                        <div className="loading-icon">
                                            <Spinner animation="grow" role="status" variant="primary">
                                                <span className="visually-hidden">Loading...</span>
                                            </Spinner>
                                        </div>
                                    )}
                                </Accordion.Body>
                            </Accordion.Item>
                        ))}
                    </ListGroup>
                </Accordion>
            </div>
        </>
    );
}