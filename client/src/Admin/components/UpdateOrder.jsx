import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { storage } from '../utils/Firebase';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import axios from 'axios';
import { PiNotePencilLight } from 'react-icons/pi'




function UpdateOrder(props) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  const [Order, setOrder] = useState([])
  const [Status, setStatus] = useState(props.Status)
  const [Message, setMessage] = useState(props.Message)
  const [id, setid] = useState(props.id)



  const UpdOrder = (e) => {
    e.preventDefault();
    const payload = {
      _id: id,
      Status: Status
      // Message: Message
    }
    console.log(payload)
    axios.put("/api/updateorder", payload)
      .then((json) => {
        setOrder(json.data.orders);
        setShow(false);
      })
      .catch((error) => console.log(error))
  }




  return (
    <>
      <Button variant="dark" onClick={handleShow}>
        <PiNotePencilLight />
      </Button>

      <Modal show={show} onHide={handleClose} centered backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>UPDATE ORDER</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={UpdOrder}>
            <div className="mb-3">
              <label htmlFor="CategoryName" className="form-label">
                STATUS
              </label>
              <input
                type="text"
                className="form-control"
                id="CategoryName"
                defaultValue={Status}
                onChange={(e) => setStatus(e.target.value)}
              />

            </div>

            <div className="mb-3">
              <label htmlFor="CategoryName" className="form-label">
                MESSAGE
              </label>
              <input
                type="text"
                className="form-control"
                id="CategoryName"
                defaultValue={Message}
                onChange={(e) => setMessage(e.target.value)}
              />

            </div>

            {/* <div className="mb-3">
                            <label htmlFor="formFile" className="form-label">
                                Category Image
                            </label>
                            <input className="form-control" onChange={(e) => setBrandimage(e.target.files[0])} type="file" id="formFile" />
                        </div> */}


            <button type="submit" className="btn btn-primary">
              Done
            </button>
          </form>
        </Modal.Body>

      </Modal>
    </>
  );
}

export default UpdateOrder;