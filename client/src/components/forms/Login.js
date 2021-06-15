import { useContext, useState } from 'react';
import {Button, Form} from 'react-bootstrap'

import { UserContext } from "../../contexts/userContext"

import { API, setAuthToken } from '../../config/api'

export default function Login() {
    const [state, dispatch] = useContext(UserContext);
    const [message, setMessage] = useState('')
    const [form, setForm] = useState({  
        email: '',
        password: ''
    })

    const {email,password} = form;

    const onChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();

            const config = {
                headers: {
                    "Content-type": "application/json"
                }
            }

            const body = JSON.stringify({
                email,
                password
            })

            const response = await API.post("/login", body, config)

            setMessage(response.data.message)

            setAuthToken(response.data.data.user.token)

            dispatch({
                type: "LOGIN_SUCCESS", 
                payload: response.data.data.user
            })

        } catch (error) {
            console.log(error)    
        }

    }


    return (
        <Form onSubmit={handleSubmit}>
            {message &&
                <div class="alert alert-danger" role="alert">
                    {message}
                </div>
            }
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Control 
                    onChange={onChange} 
                    value={email} 
                    name="email"
                    type="email" 
                    placeholder="Email" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Control 
                    onChange={onChange} 
                    value={password} 
                    name="password"
                    type="password" 
                    placeholder="Password" />
            </Form.Group>
            <div className="d-grid gap-2 mt-5">
                <Button type="submit" className="btn btn-sm">
                    Sign in
                </Button>
            </div>
        </Form>
    )
}
