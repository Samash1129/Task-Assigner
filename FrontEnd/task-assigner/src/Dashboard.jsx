import React from 'react';
import { Col, Nav, Row, Tab } from 'react-bootstrap';
import { useNavigate } from 'react-router';
import axios from './api/axios';

export default function Dashboard() {
    const navigate = useNavigate()

    const handleLogout = async () => {
        try {
            const response = await axios.post('/dashboard/logout', {}, {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            });
            console.log(response.data.message);
            navigate('/')
        } catch (error) {
            console.error(error.response.data.error);
        }
    };

    return (
        <>
            <Tab.Container id="left-tabs-example" defaultActiveKey="first">
                <Row className='Row'>
                    <Col className='Col'>
                        <Nav variant="pills" className="flex-column">
                            <Nav.Item>
                                <Nav.Link eventKey="first">
                                    Show all Users
                                </Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="second">
                                    Add a User
                                </Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="third">
                                    Account Settings
                                </Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="fourth" onClick={handleLogout}>
                                    Logout
                                </Nav.Link>
                            </Nav.Item>
                        </Nav>
                    </Col>
                </Row>
            </Tab.Container>
        </>
    )
}
