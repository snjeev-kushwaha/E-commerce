import React from 'react';
import { Navbar, Container, Nav, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { AiOutlineSearch, AiOutlineShoppingCart } from "react-icons/ai";
import { BiUserCircle } from "react-icons/bi";
import Image from '../../../images/logo.png';

const Header1 = () => {
    return (
        <div>
            <Navbar bg="light" expand="lg">
                <Container fluid>
                    <Navbar.Brand><Link to='/'><img src={Image} style={{height:"70px", width:"200px"}} alt="logo image" /></Link></Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">
                        <Nav
                            className="me-auto my-2 my-lg-0"
                            style={{ maxHeight: '100px' }}
                            navbarScroll
                        >
                            <Nav.Link><Link to='/' style={{textDecoration:"none", color:'black'}}>Home</Link></Nav.Link>
                            <Nav.Link><Link to='/products' style={{textDecoration:"none", color:'black'}}>Product</Link></Nav.Link>
                            <Nav.Link><Link to='/contact' style={{textDecoration:"none", color:'black'}}>Contact</Link></Nav.Link>
                            <Nav.Link><Link to='/about' style={{textDecoration:"none", color:'black'}}>About</Link></Nav.Link>
                            {/* <NavDropdown title="Link" id="navbarScrollingDropdown">
                                <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
                                <NavDropdown.Item href="#action4">
                                    Another action
                                </NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="#action5">
                                    Something else here
                                </NavDropdown.Item>
                            </NavDropdown> */}
                            {/* <Nav.Link href="#" disabled>
                                Link
                            </Nav.Link> */}
                        </Nav>
                        <Form className="d-flex">
                            <Nav.Link><Link to='/search' style={{textDecoration:"none", color:'black', fontSize:"25px"}}><AiOutlineSearch /></Link></Nav.Link>&nbsp;&nbsp;&nbsp;
                            <Nav.Link><Link to='/cart' style={{textDecoration:"none", color:'black', fontSize:"25px"}}><AiOutlineShoppingCart /></Link></Nav.Link>&nbsp;&nbsp;&nbsp;
                            <Nav.Link><Link to='/login' style={{textDecoration:"none", color:'black', fontSize:"25px"}}><BiUserCircle /></Link></Nav.Link>
                        </Form>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    )
}

export default Header1