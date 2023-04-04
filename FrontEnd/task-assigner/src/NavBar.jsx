import React, { Component } from 'react';
import { Container, Navbar } from 'react-bootstrap';


class NavBar extends Component {
    render() {
        return (
            <>
                <Navbar bg="dark" variant="dark">
                    <Container className='Nav-container'>
                        <Navbar.Brand href="#home">
                            <img
                                alt=""
                                src="assignment.png"
                                width="30"
                                height="30"
                                className="d-inline-block align-top logo"
                            />
                            Task Assigner
                        </Navbar.Brand>
                    </Container>
                </Navbar>
            </>
        );
    }
}

export default NavBar;