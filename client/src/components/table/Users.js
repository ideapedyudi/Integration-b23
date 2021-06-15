import React from 'react'
import {Table, Button} from 'react-bootstrap'

export default function Users({users, deleteById, getUserById}) {
    return (
        <div>
            <Table striped bordered hover className="mt-5">
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Full Name</th>
                        <th>Username</th>
                        <th>Email</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {users?.map((user,index) => (
                        <tr>
                            <td>{index+1}</td>
                            <td>{user.fullname}</td>
                            <td>{user.username}</td>
                            <td>{user.email}</td>
                            <td>
                                <Button onClick={()=> getUserById(user.id)} size="sm" variant="info" className="text-light me-2">Edit</Button>
                                <Button onClick={()=> deleteById(user.id)} size="sm" variant="danger">Delete</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
                </Table>
        </div>
    )
}
