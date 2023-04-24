/* eslint-disable no-lone-blocks */
import React, { useEffect, useState } from 'react';
import { Col, Nav, Row, Tab } from 'react-bootstrap';
import { useNavigate } from 'react-router';
import axios from './api/axios';
import ShowUsers from './ShowUser';
import AddUser from './AddUser';
import AddTask from './AddTask';

export default function Dashboard() {
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const [activeTab, setActiveTab] = useState(localStorage.getItem('activeTab') || 'first');

    useEffect(() => {
        getUsers();
    }, []);

    //For Showing all the Users
    const getUsers = async () => {
        try {
            const response = await axios.get('/dashboard/getUsers', {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token'),
                }
            });
            console.log(response.data);
            setUsers(response.data);
        } catch (err) {
            console.error(err.response.data.error);
        }
    };

    
    const handleTabSelect = (key) => {
        setActiveTab(key);
        localStorage.setItem('activeTab', key);
        // Update the URL
        switch (key) {
            case 'first':
                navigate('/dashboard/getUsers');
                break;
                case 'second':
                    navigate('/dashboard/register');
                break;
            case 'third':
                navigate('/dashboard/addTask');
                break;
            case 'fourth':
                navigate('/dashboard/accountSettings');
                break;
            default:
                break;
        }
    };
    
    useEffect(() => {
        if (users.length === 0) {
            setActiveTab('first');
        }
    }, [users]);
    
    //For Logout
    const handleLogout = async () => {
        try {
            const response = await axios.post(
                '/dashboard/logout',
                {},
                {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem('token'),
                    },
                }
            );
            console.log(response.data.message);
            navigate('/');
        } catch (error) {
            console.error(error.response.data.error);
        }
    };

    return (
        <>
            <Tab.Container id="left-tabs-example" activeKey={activeTab} onSelect={handleTabSelect}>
                <Row className="Row">
                    <Col className="Col">
                        <Nav variant="pills" className="flex-column">
                            <Nav.Item>
                                <Nav.Link eventKey="first" onClick={getUsers}>
                                    Show all Users
                                </Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="second">Add a User</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="third">Add Task</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="fourth">Account Settings</Nav.Link>
                            </Nav.Item>
                            <Nav.Item className="logout">
                                <Nav.Link eventKey="fifth" onClick={handleLogout}>
                                    Logout
                                </Nav.Link>
                            </Nav.Item>
                        </Nav>
                    </Col>
                    <Col className="content">
                        <Tab.Content>
                            <Tab.Pane eventKey="first">
                                <ShowUsers users={users} />
                            </Tab.Pane>
                            <Tab.Pane eventKey="second">
                                <AddUser />
                            </Tab.Pane>
                            <Tab.Pane eventKey="third">
                                <AddTask />
                            </Tab.Pane>
                            <Tab.Pane eventKey="fourth">Account Settings</Tab.Pane>
                            <Tab.Pane eventKey="fifth">Logout</Tab.Pane>
                        </Tab.Content>
                    </Col>
                </Row>
            </Tab.Container>
        </>
    );
}
