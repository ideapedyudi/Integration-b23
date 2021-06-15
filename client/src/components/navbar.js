import '../App.css';
import { useContext } from 'react';
import { Link, useHistory } from "react-router-dom";
import { UserContext } from "../contexts/userContext"

import {Navbar, Container, Nav, Button} from 'react-bootstrap'


export default function NavbarComp() {
    const [state, dispatch] = useContext(UserContext);

    console.log(state);

    const handleLogout = () => {
        dispatch({
            type: "LOGOUT",
        });
    }

    return (
        <Navbar bg="light" expand="lg">
            <Container>
                <Navbar.Brand href="#home"></Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to="/">Home</Nav.Link>
                        <Nav.Link as={Link} to="/about">About</Nav.Link>
                        <Nav.Link as={Link} to="/axios">Axios</Nav.Link>
                        <Nav.Link as={Link} to="/react-query">React Query</Nav.Link>
                    </Nav>
                    <Nav className="ms-auto">
                        <small className="mt-1 me-3">{state.user.email}</small>
                        <Button onClick={handleLogout} className="btn btn-danger btn-sm">logout</Button>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}
