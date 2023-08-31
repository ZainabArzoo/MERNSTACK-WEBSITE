import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';


function OrderModal() {
    const [show, setShow] = useState(false);
    const [status, setStatus] = useState("")
    const [messagestatus, setMessageStatus] = useState("")



    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    const UpdateOrder = (e) => {
        e.preventDefault();

    }




    return (
        <>
            <Button variant="dark" onClick={handleShow}>
            UPDATE ORDER
            </Button>

            <Modal show={show} onHide={handleClose} centered backdrop="static" size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>UPDATE ORDER</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <form onSubmit={UpdateOrder}>
                        <div className="row">
                            <div className="col-md-4">
                                <FloatingLabel controlId="Customername" label="Customername" className="mb-3 text-secondary">
                                    <Form.Control type="text" placeholder="Customername" value={status} onChange={(e) => setStatus(e.target.value)} />
                                </FloatingLabel>
                            </div>
                            <div className="col-md-4">
                                <FloatingLabel controlId="Customername" label="Customername" className="mb-3 text-secondary">
                                    <Form.Control type="text" placeholder="Customername" value={messagestatus} onChange={(e) => setMessageStatus(e.target.value)} />
                                </FloatingLabel>
                            </div>
                            </div>
  

                        <button type="submit" className="btn btn-primary">
                            Done
                        </button>
                    </form>
                </Modal.Body>

            </Modal>
        </>
    );
}

export default OrderModal;