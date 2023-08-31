import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';

function GuestNav() {
    return (
        <Navbar bg="light" expand="lg">
            <Container>
                <Link className='navbar-brand fw-bold' to="/">Online <span style={{ color: "#66ffff" }}>Shop</span></Link>

                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto fw-bold">
                        <Link className='nav-link' to="/" style={{ color: "black" }}>HOME</Link>
                        <Link className='nav-link' to="/products" style={{ color: "black" }}>PRODUCTS</Link>
                        <Link to="/login"><button className="btn btn-outline-dark fw-bold">LOGIN</button></Link>
                        <Link to="/signup"><button className="btn btn-outline-dark fw-bold mx-1">SIGNUP</button></Link>    
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default GuestNav