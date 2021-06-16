import { useState } from 'react'
import { Form, Button } from 'react-bootstrap'

import { API } from '../../config/api'

export default function AddProduct({refetch, handleClose}) {

    const [form, setForm] = useState({
        name: '',
        desc: '',
        image: '',
        price: ''
    })

    const [preview, setPreview] = useState('')

    const {name, desc, image, price} = form

    const onChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.type === "file" ? e.target.files : e.target.value
        })

        if(e.target.type === "file"){
            let url = URL.createObjectURL(e.target.files[0])
            setPreview(url)
            console.log(url)
        }
    }

    const handleOnSubmit = async () => {
        try {

            const config = {
                headers: {
                    "Content-type": "multipart/form-data"
                }
            }

            const formData = new FormData()
            formData.set("name", form.name)
            formData.set("desc", form.desc)
            formData.set("price", form.price)
            formData.set("imageFile", form.image[0], form.image[0].name)

            await API.post('/product', formData, config)

            refetch()
            handleClose()
            
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <Form onSubmit={(e)=> {
            e.preventDefault()
            handleOnSubmit()
            }}>
            <Form.Group className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" onChange={onChange} name="name" placeholder="Enter product name" />
            </Form.Group>
            
            <Form.Group className="mb-3">
                <Form.Label>Description</Form.Label>
                <Form.Control type="text" onChange={onChange} name="desc" placeholder="Enter product Description" />
            </Form.Group>
            
            <Form.Group className="mb-3">
                <Form.Label>Price</Form.Label>
                <Form.Control type="number" onChange={onChange} name="price" placeholder="Enter product price" />
            </Form.Group>

            <label className="mb-1">Upload</label>
            <div class="input-group mb-3">
                <input type="file" name="fileImage" onChange={onChange} name="image" class="form-control" id="inputGroupFile01" />
            </div>

            {preview && <img src={preview} className="img-fluid rounded"/>}
            
            <div className="d-grid gap-2 mt-5">
                <Button variant="primary" type="submit" size="sm">
                    Submit
                </Button>
            </div>
        </Form>
    )
}
