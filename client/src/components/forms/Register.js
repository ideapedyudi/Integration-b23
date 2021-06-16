import { useContext, useState } from 'react';
import { UserContext } from "../../contexts/userContext"

import {Button, Form} from 'react-bootstrap'

import { useMutation } from 'react-query'
import { API } from '../../config/api'


export default function Register() {
    const [message, setMessage] = useState('')

    const [form, setForm] = useState({ 
        fullname: '',
        username: '',
        email: '',
        password: ''
    })

    const {fullname, username, email, password} = form;

    const onChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleOnSubmit = useMutation(async (e) => {
        e.preventDefault()

        const config = {
            headers: {
                "Content-type": "application/json"
            }
        }

        const body = JSON.stringify({...form})

        const response = await API.post('/register', body, config)

        if(response.data.status === 'Validation Failed'){
            setMessage(response.data.message)
        }
        if(response.data.status === 'Failed'){
            setMessage(response.data.message)
        }

        setForm(
            {
                fullname: '',
                username: '',
                email: '',
                password: ''
            }
        )
})

    return (
        <Form onSubmit={(e) => handleOnSubmit.mutate(e)}>
            <Form.Group className="mb-3">
                <Form.Control type="text" onChange={onChange} value={fullname} name="fullname" placeholder="Full Name" />
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Control type="text" onChange={onChange} value={username} name="username" placeholder="username" />
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Control type="email" onChange={onChange} value={email} name="email" placeholder="Email" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Control type="password" onChange={onChange} value={password} name="password" placeholder="Password" />
            </Form.Group>

            <div className="d-grid gap-2 mt-5">
                <Button type="submit" className="btn btn-sm">
                    Register
                </Button>
            </div>
        </Form>
    )
}
