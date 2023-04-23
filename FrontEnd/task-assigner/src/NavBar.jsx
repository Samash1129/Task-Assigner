import React from 'react';
import { Container, Navbar } from 'react-bootstrap';

const NavBar = React.memo(() => {
  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container className='Nav-container'>
          <Navbar.Brand>
            <img
              alt=""
              src="img.png"
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
});

export default NavBar;
