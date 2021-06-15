import { Modal } from 'react-bootstrap'

import Login from '../forms/Login'
import Register from '../forms/Register'

export default function ModalAuth({ handleClose, show, title}) {
    return (
        <>
            <Modal size="sm" show={show} onHide={handleClose} centered>
                <Modal.Header className="py-2">
                    <Modal.Title id="example-modal-sizes-title-sm">
                        {title === 'login' ? 'Login' : 'Register'}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {title === 'login' ? <Login /> : <Register />}
                </Modal.Body>
            </Modal>
        </>
    );
}
