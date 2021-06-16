import { useState } from 'react'
import { Modal, Button } from 'react-bootstrap'

import UpdateProduct from '../forms/UpdateProduct';

export default function ModalUpdateProduct({product}) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <Button size="sm" onClick={handleShow} variant="info" className="text-light me-1" style={{width: '47%'}}>Update</Button>
            <Modal show={show} onHide={handleClose} centered>
                <Modal.Header className="py-1 justify-content-center">
                    <Modal.Title center>Update Product</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <UpdateProduct product={product} />
                </Modal.Body>
            </Modal>
        </>
    )
}
