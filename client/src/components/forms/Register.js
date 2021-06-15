import { useContext, useState } from 'react';
import { UserContext } from "../../contexts/userContext"

import {Button, Form} from 'react-bootstrap'

export default function Register() {

    const [state, dispatch] = useContext(UserContext);

    const [form, setForm] = useState({ 
        fullname: '',
        username: '',
        email: '',
        password: ''
    })

    const {fullname, username, email,password} = form;

    const onChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(form)

        dispatch({
            type: "LOGIN_SUCCESS", 
            payload: form
        })

    }

    return (
        <Form>
            <Form.Group className="mb-3">
                <Form.Control type="text" placeholder="Full Name" />
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Control type="text" placeholder="username" />
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Control type="email" placeholder="Email" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Control type="password" placeholder="Password" />
            </Form.Group>

            <div className="d-grid gap-2 mt-5">
                <Button type="submit" className="btn btn-sm">
                    Register
                </Button>
            </div>
        </Form>
    )
}
