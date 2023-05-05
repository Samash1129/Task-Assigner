import React, { useState } from "react";
import ListGroup from 'react-bootstrap/ListGroup';
import './index.css';
import UserPopup from "./UserPopup";
import { Form } from "react-bootstrap";

export default function ShowUsers({ users }) {
    const [selectedUser, setSelectedUser] = useState(null)

    const showSelectedUser = (user) => {
        setSelectedUser(user)
    }

    const closeSelectedUser = () => {
        setSelectedUser(null)
    }

    const checkBox = (e) => {
        e.stopPropagation()
    }

    return (
        <>
            <div className="list">
                <ListGroup>
                    {users.map(user => (
                        <ListGroup.Item key={user._id} onClick={() => showSelectedUser(user)}>
                            <div className="for-checkbox">
                                <Form.Check type={"checkbox"} id="checkbox" onClick={checkBox}/>

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
                        </ListGroup.Item>
                    ))}
                </ListGroup>
                {selectedUser && (<UserPopup user={selectedUser} onClose={closeSelectedUser} />)}
            </div>
        </>
    );
}