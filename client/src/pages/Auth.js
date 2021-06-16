import {Container,Button} from 'react-bootstrap'
import { useHistory } from "react-router-dom";
import { useState } from 'react';

import ModalAuth from '../components/modals/ModalAuth'

import img from '../assets/auth.svg'

export default function Auth() {
    const [show, setShow] = useState(false);
    const [title, setTitle] = useState('');

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleLogin = () => {
        handleShow()
        setTitle('login')
    }

    const handleRegister = () => {
        handleShow()
        setTitle('register')
    }

    return (
        <div style={{backgroundColor: '#f0efeb'}}>
            <Container>
                <div style={{height: '100vh'}} className="d-flex justify-content-center align-items-center">
                    <img src={img} className="w-50 me-4"/>
                    <Button onClick={handleLogin} className="btn btn-sm me-2">Login</Button>
                    <Button onClick={handleRegister} className="btn btn-sm btn-info text-light">Register</Button>
                    <ModalAuth title={title} show={show} handleClose={handleClose}/>
                </div>
            </Container>
        </div>
    )
}
