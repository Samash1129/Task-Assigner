import React, { Component } from 'react';
import { Col, Nav, Row, Tab } from 'react-bootstrap';


class Menu extends Component {
    render() {
        return (
            <>
                <Tab.Container id="left-tabs-example" defaultActiveKey="first">
                    <Row className='Row'>
                        <Col className='Col'>
                            <Nav variant="pills" className="flex-column">
                                <Nav.Item>
                                    <Nav.Link eventKey="first">Show all Users</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="second">Add a User</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="third">Account Settings</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="fourth">Logout</Nav.Link>
                                </Nav.Item>
                            </Nav>
                        </Col>
                        <Col sm={9}>
                            <Tab.Content>
                                <Tab.Pane eventKey="first"></Tab.Pane>
                                <Tab.Pane eventKey="second"></Tab.Pane>
                                <Tab.Pane eventKey="third"></Tab.Pane>
                                <Tab.Pane eventKey="fourth"></Tab.Pane>
                            </Tab.Content>
                        </Col>
                    </Row>
                </Tab.Container>
            </>
        )
    }
}

export default Menu;