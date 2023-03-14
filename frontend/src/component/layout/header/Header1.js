import React from 'react';
import { Navbar, Container, Nav, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { AiOutlineSearch, AiOutlineShoppingCart } from "react-icons/ai";
import { BiUserCircle } from "react-icons/bi";

const Header1 = () => {
    return (
        <div>
            <Navbar bg="light" expand="lg">
                <Container fluid>
                    <Navbar.Brand href="#">ECOMMERCE</Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">
                        <Nav
                            className="me-auto my-2 my-lg-0"
                            style={{ maxHeight: '100px' }}
                            navbarScroll
                        >
                            <Nav.Link><Link to='/'>Home</Link></Nav.Link>
                            <Nav.Link><Link to='/products'>Product</Link></Nav.Link>
                            <Nav.Link><Link to='/contact'>Contact</Link></Nav.Link>
                            <Nav.Link><Link to='/about'>About</Link></Nav.Link>
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
                        <Nav.Link><Link to='/search'><AiOutlineSearch /></Link></Nav.Link>&nbsp;&nbsp;&nbsp;
                        <Nav.Link><Link to='/cart'><AiOutlineShoppingCart /></Link></Nav.Link>&nbsp;&nbsp;&nbsp;
                        <Nav.Link><Link to='/login'><BiUserCircle /></Link></Nav.Link>
                        </Form>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    )
}

export default Header1