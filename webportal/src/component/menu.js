import React, { Component } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav'
import Container from 'react-bootstrap/Container';
import { Link } from 'react-router-dom';


export default class Menu extends Component {
    render() {
        return (
            <>
                <Navbar bg="info" variant="dark"  expand="lg" className='mb-5'>
                    <Container>
                        <Navbar.Brand href="/">UC Collaborative Robotic Lab​</Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                        <Nav>
                            <Link className='nav-link' to="/">Home</Link>
                            <Link className='nav-link' to="/project">Project</Link>
                            <Link className='nav-link' to="/member">Member</Link>
                            <Link className='nav-link' to="/resource">Resource</Link>
                            <Link className='nav-link' to="/partner">Partner</Link>
                        </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </>
        )
    }
}
