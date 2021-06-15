import {useState} from 'react'
import {Form, Button} from 'react-bootstrap'

import { API } from '../../config/api'

export default function AddUser({ loadUsers }) {

    const [message, setMessage] = useState('')

    const [form, setForm] = useState({
        fullname: '',
        username: '',
        email: '',
        password: ''
    })

    const { fullname, username, email, password} = form

    const handleOnChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const handleOnSubmit = async (e) => {
        try {
            e.preventDefault()

            const config = {
                headers: {
                    "Content-type": "application/json"
                }
            }

            const body = JSON.stringify({...form})

            const response = await API.post('/register', body, config)

            console.log(response)

            if(response.data.status === 'Validation Failed'){
                setMessage(response.data.message)
            }
            if(response.data.status === 'Failed'){
                setMessage(response.data.message)
            }
            
            loadUsers()

            setForm(
                {
                    fullname: '',
                    username: '',
                    email: '',
                    password: ''
                }
            )

        } catch (error) {
            console.log(error)
        }
    }

    return (
        <Form onSubmit={handleOnSubmit}>
            <div className="h3 text-center mt-3">Add user</div>

            {message && 
                <div class="alert alert-danger" role="alert">
                    {message}
                </div>
            }

            <Form.Group className="mb-2">
                <Form.Label>Full name</Form.Label>
                <Form.Control required onChange={handleOnChange} value={fullname} name="fullname" type="text" placeholder="Full name" />
            </Form.Group>

            <Form.Group className="mb-2">
                <Form.Label>username</Form.Label>
                <Form.Control required onChange={handleOnChange} value={username} name="username" type="text" placeholder="Username" />
            </Form.Group>

            <Form.Group className="mb-2">
                <Form.Label>Email</Form.Label>
                <Form.Control required onChange={handleOnChange} value={email} name="email" type="email" placeholder="Email" />
            </Form.Group>

            <Form.Group className="mb-2">
                <Form.Label>Password</Form.Label>
                <Form.Control required onChange={handleOnChange} value={password} name="password" type="password" placeholder="Password" />
            </Form.Group>

            <Button variant="primary" type="submit" className="mt-3">
                Add user
            </Button>
        </Form>
    )
}
