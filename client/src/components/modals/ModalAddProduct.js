import { useState } from 'react'
import { Modal, Button } from 'react-bootstrap'

import AddProduct from '../forms/AddProduct';

export default function ModalAddProduct({refetch}) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <Button size="sm" onClick={handleShow}>Add Product</Button>
            <Modal show={show} onHide={handleClose} centered>
                <Modal.Header className="py-1 justify-content-center">
                    <Modal.Title center>Add Product</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <AddProduct refetch={refetch} handleClose={handleClose} />
                </Modal.Body>
            </Modal>
        </>
    )
}
