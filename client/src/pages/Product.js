import React from 'react'

import { Modal, Button } from 'react-bootstrap'

import ModalAddProduct from '../components/modals/ModalAddProduct'
import ListProducts from '../components/cards/ListProducts'

import dataProduct from '../fakeData/product'

import { useQuery, useMutation } from 'react-query'
import { API } from '../config/api'


export default function Product() {

    // Load Data
    let { data: products, refetch} = useQuery("productsCache", 
        async () => {
            const response = await API.get('/products')
            return response.data.data
        }
    )

    const deleteProductById = async (id) => {
        try {
            await API.delete(`product/${id}`)

            refetch()

        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <div className="text-end mt-4">
                <ModalAddProduct refetch={refetch} />
                <ListProducts dataProduct={products} deleteProductById={deleteProductById} />
            </div>
        </>
    )
}
