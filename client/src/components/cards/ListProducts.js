import { useState } from 'react'
import { Row, Col, Card, Button } from 'react-bootstrap'

import ModalUpdateProduct from '../modals/ModalUpdateProduct'

export default function ListProducts({ deleteProductById, dataProduct}) {

    const [product, setProduct] = useState({})

    const getProductById = (id) => {
        setProduct(dataProduct.find((data) => data.id == id))
    }

    return (
        <Row className="my-4">
            {dataProduct?.products?.map((product,index)=>(
                <Col lg="3" md="4" sm="6" className="mt-3">
                    <Card>
                        <Card.Img variant="top" src={product.image} style={{height: '200px'}} />
                        <Card.Body className="text-start">
                            <Card.Title>{product.name}</Card.Title>
                            <Card.Text>{product.desc}</Card.Text>
                            <Card.Text>Rp. {product.price}</Card.Text>
                            <ModalUpdateProduct onClick={() => getProductById(product.id)} product={product} />
                            <Button onClick={() => deleteProductById(product.id)} size="sm" variant="danger" style={{width: '50%'}}>Delete</Button>
                        </Card.Body>
                    </Card>
                </Col>
            ))}
        </Row>
    )
}
