import { useState, useEffect } from 'react'

import AddUser from '../components/forms/AddUser'
import UpdateUser from '../components/forms/UpdateUser'
import Users from '../components/table/Users'

import { API } from '../config/api'

export default function Axios() {

    const [users, setUsers] = useState([])
    const [isUpdate, setIsUpdate] = useState(false)
    const [userId, setUserId] = useState('')

    // LOAD
    const loadUsers = async () => {
        try {
            const response = await API.get('users')
            setUsers(response.data.data.users)
        } catch (error) {
            console.log(error)
        }
    }

    // Load data ketika pertama kali
    useEffect(()=>{
        loadUsers()
    },[])

    // DELETE
    const deleteById = async (id) => {
        try {
            await API.delete(`/user/${id}`)

            loadUsers()
        } catch (error) {
            console.log(error)
        }
    }

    const getUserById = (id) => {
        setIsUpdate(true)
        setUserId(id)
    }

    const cancelUpdateUser = () => {
        setIsUpdate(false)
        setUserId('')
    }

    console.log(userId)

    return (
        <div>
            {isUpdate ? 
            <UpdateUser loadUsers={loadUsers} userId={userId} cancelUpdateUser={cancelUpdateUser} /> : 
                <AddUser loadUsers={loadUsers} />
            }
            <Users users={users} deleteById={deleteById} getUserById={getUserById} />
        </div>
    )
}
