import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { storage } from '../utils/Firebase';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import axios from 'axios';
import { PiNotePencilLight } from 'react-icons/pi'




function UpdateBrand(props) {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [brands, setbrands] = useState([])

    const [Brandname, setBrandname] = useState(props.Brandname)
    const [Brandimage, setBrandimage] = useState(props.Brandimage)
    const [id, setid] = useState(props.id)




    const UpdBrand = (e) => {
        e.preventDefault();
        const payload = {
            _id: id,
            Brandname: Brandname,
            url: Brandimage
        }
        console.log(payload)
        axios.put("/api/updatebrand", payload)
            .then((json) => {
                setbrands(json.data.Brands);
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
                    <Modal.Title>UPDATE BRAND</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={UpdBrand}>
                        <div className="mb-3">
                            <label htmlFor="CategoryName" className="form-label">
                                BRAND Name
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="CategoryName"
                                defaultValue={Brandname}
                                onChange={(e) => setBrandname(e.target.value)}
                            />

                        </div>

                        <div className="mb-3">
                            <label htmlFor="formFile" className="form-label">
                            BRAND IMAGE
                            </label>
                            <input className="form-control" onChange={(e) => setBrandimage(e.target.files[0])} type="file" id="formFile"/>
                        </div>


                        <button type="submit" className="btn btn-primary">
                            UPDATE
                        </button>
                    </form>
                </Modal.Body>

            </Modal>
        </>
    );
}

export default UpdateBrand;