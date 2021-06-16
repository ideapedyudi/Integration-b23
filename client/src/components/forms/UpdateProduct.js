import { useState, useEffect } from 'react'
import { Form, Button } from 'react-bootstrap'

export default function UpdateProduct({product}) {

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
        }
    }

    useEffect(()=>{
        setForm({
            name: product.name,
            desc: product.desc,
            image: product.image,
            price: product.price
        })
    },[])

    return (
        <Form onSubmit={(e)=> e.preventDefault()}>
            <Form.Group className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" onChange={onChange} value={name} name="name" placeholder="Enter product name" />
            </Form.Group>
            
            <Form.Group className="mb-3">
                <Form.Label>Description</Form.Label>
                <Form.Control type="text" onChange={onChange} value={desc} name="desc" placeholder="Enter product Description" />
            </Form.Group>
            
            <Form.Group className="mb-3">
                <Form.Label>Price</Form.Label>
                <Form.Control type="number" onChange={onChange} value={price} name="price" placeholder="Enter product price" />
            </Form.Group>

            <label className="mb-1">Upload</label>
            <div class="input-group mb-3">
                <input type="file" name="fileImage" onChange={onChange} name="image" class="form-control" id="inputGroupFile01" />
            </div>

            {preview || image && <img src={image} className="img-fluid rounded"/>}
            
            <div className="d-grid gap-2 mt-5">
                <Button variant="primary" type="submit" size="sm">
                    Submit
                </Button>
            </div>
        </Form>
    )
}
