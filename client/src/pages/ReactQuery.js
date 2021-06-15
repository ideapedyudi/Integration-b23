import React from 'react'

import { useQuery, useMutation } from 'react-query'
// useQuery => LOAD DATA
// useMutation => ADD, DELETE, UPDATE DATA

import Users from '../components/table/Users'
import AddUserReactQuery from '../components/forms/AddUserReactQuery'

import { API } from '../config/api'


export default function ReactQuery() {

    // Load Data
    let { data: users, refetch} = useQuery("usersCache", 
        async () => {
            const response = await API.get('/users')
            return response.data.data.users
        }
    )

    const deleteById = (id) => {
        deleteUser.mutate(id)
    }

    const deleteUser = useMutation(async (id) => {
        await API.delete(`user/${id}`)
        refetch()
    })

    const getUserById = () => {
        
    }

    return (
        <div>
            <AddUserReactQuery refetch={refetch} />
            <Users users={users} deleteById={deleteById} getUserById={getUserById} />
        </div>
    )
}
