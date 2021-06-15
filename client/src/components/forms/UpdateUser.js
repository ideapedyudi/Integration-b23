import {useState, useEffect} from 'react'
import {Form, Button} from 'react-bootstrap'

import { API } from '../../config/api'

export default function UpdateUser({ userId, loadUsers, cancelUpdateUser }) {

    const [form, setForm] = useState({
        fullname: '',
        username: '',
        email: ''
    })

    const { fullname, username, email } = form

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

            const response = await API.patch(`/user/${userId}`, body, config)
            
            loadUsers()

            setForm(
                {
                    fullname: '',
                    username: '',
                    email: '',
                }
            )

            cancelUpdateUser()

        } catch (error) {
            console.log(error)
        }
    }

    const getUser = async () => {
        try {
            const response = await API.get(`user/${userId}`)
            const user = response.data.data.user
            setForm({
                fullname: user.fullname,
                username: user.username,
                email: user.email
            })
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(()=>{
        getUser()
    }, [userId])

    return (
        <Form onSubmit={handleOnSubmit}>
            <div className="h3 text-center mt-3">Update user</div>

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

            <Button variant="primary" type="submit" className="mt-3 btn-sm me-2">
                Update user
            </Button>
            <Button onClick={()=> cancelUpdateUser()} variant="danger" type="submit" className="mt-3 btn-sm">
                Cancel Update user
            </Button>
        </Form>
    )
}
