/* eslint-disable no-lone-blocks */
import React, { useEffect, useState } from 'react';
import { Col, Nav, Row, Tab } from 'react-bootstrap';
import { useNavigate } from 'react-router';
import axios from './api/axios';
import ShowUsers from './ShowUser';
import ShowTasks from './ShowTasks';
import MyTasks from './MyTasks';
import AddUser from './AddUser';
import AddTask from './AddTask';

export default function Dashboard() {
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const [tasks, setTasks] = useState([]);
    const [activeTab, setActiveTab] = useState(localStorage.getItem('activeTab') || 'first');
    const Role = localStorage.getItem('roles')

    console.log(activeTab)

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

    useEffect(() => {
        getTasks();
    }, []);

    const getTasks = async () => {
        try {
            const response = await axios.get('/dashboard/tasks/getAssignedTasks', {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                }
            });
            console.log(response.data)
            setTasks(response.data)
        } catch (err) {
            console.error(err.response.data.error)
            console.log(localStorage.getItem('token'))
        }
    };

    useEffect(() => {
        getMyTask();
    }, []);

    const getMyTask = async () => {
        try {
            const response = await axios.get('/dashboard/tasks/getMyTasks', {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                }
            });

            console.log(response.data)
            setTasks(response.data)
        } catch (error) {
            console.error(error.response.data.error)
            console.log(localStorage.getItem('token'))
        }
    }

    const handleTabSelect = (key) => {
        setActiveTab(key);
        localStorage.setItem('activeTab', key);
        if (Role === 'SuperAdmin' || Role === 'Admin') {
            console.log(Role)
            switch (key) {
                case 'first':
                    navigate('/dashboard/getUsers');
                    break;
                case 'second':
                    navigate('/dashboard/register');
                    break;
                case 'third':
                    navigate('/dashboard/tasks/addTask');
                    break;
                case 'fourth':
                    navigate('/dashboard/tasks/getAssignedTasks');
                    break;
                case 'fifth':
                    navigate('/dashboard/accountSettings');
                    break;
                default:
                    break;
            }
        } else if (Role === 'User') {
            console.log(Role)
            // setActiveTab(key);
            // localStorage.setItem('activeTab', key);
            switch (key) {
                case 'first':
                    navigate('/dashboard/tasks/getMyTasks');
                    break;
                case 'second':
                    navigate('/dashboard/accountSettings');
                    break;
                default:
                    break;
            }
        }
    };


    useEffect(() => {
        if (users.length === 0) {
            setActiveTab('first');
        }
    }, [users]);

    useEffect(() => {
        if (tasks.length === 0) {
            setActiveTab('first');
        }
    }, [tasks]);

    //For Logout
    const handleLogout = async () => {
        try {
            const response = await axios.post('/dashboard/logout', {}, {
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
                            {Role === 'SuperAdmin' || Role === 'Admin' ? (
                                <>
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
                                        <Nav.Link eventKey="fourth" onClick={getTasks}>
                                            Show Tasks
                                        </Nav.Link>
                                    </Nav.Item>
                                    {/* 
                                    <Nav.Item>
                                        <Nav.Link eventKey="fifth">Account Settings</Nav.Link>
                                    </Nav.Item> */}
                                </>
                            ) :
                                <>
                                    <Nav.Item>
                                        <Nav.Link eventKey="first" onClick={getMyTask}>
                                            My Tasks
                                        </Nav.Link>
                                    </Nav.Item>
                                </>
                            }

                            <Nav.Item>
                                <Nav.Link eventKey="fifth">Account Settings</Nav.Link>
                            </Nav.Item>

                            <Nav.Item className="logout">
                                <Nav.Link onClick={handleLogout}>
                                    Logout
                                </Nav.Link>
                            </Nav.Item>
                        </Nav>
                    </Col>

                    <Col className="content">
                        <Tab.Content>
                            {Role === 'SuperAdmin' || Role === 'Admin' ? (
                                <>
                                    <Tab.Pane eventKey="first">
                                        <ShowUsers users={users} />
                                    </Tab.Pane>

                                    <Tab.Pane eventKey="second">
                                        <AddUser />
                                    </Tab.Pane>

                                    <Tab.Pane eventKey="third">
                                        <AddTask />
                                    </Tab.Pane>

                                    <Tab.Pane eventKey="fourth">
                                        <ShowTasks tasks={tasks} />
                                    </Tab.Pane>
                                </>
                            ) : (
                                <>
                                    <Tab.Pane eventKey="first">
                                        <MyTasks tasks={tasks} />
                                    </Tab.Pane>
                                </>
                            )}

                            <Tab.Pane eventKey="fifth">Account Settings</Tab.Pane>

                            {/* <Tab.Pane eventKey="sixth">Logout</Tab.Pane> */}
                        </Tab.Content>
                    </Col>
                </Row>
            </Tab.Container >
        </>
    );
}