import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { storage } from '../utils/Firebase';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import axios from 'axios'


function BrandModal({recallData}) {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [Brandname, setBrandname] = useState("")
    const [Brandimage, setBrandimage] = useState(null)


    const AddBrand = (e) => {
        e.preventDefault();
        const storageRef = ref(storage, `images/categories/${Brandimage.name}`);
        uploadBytes(storageRef, Brandimage).then((snapshot) => {
            getDownloadURL(snapshot.ref)
                .then((url) => {
                    const payload = { Brandname, Brandimage: url }
                    axios.post("/api/addbrand", payload)
                        .then((json) => {
                            setShow(false);
                            recallData(json.data.Brands)
                        })
                        .catch(error => console.log(error))

                })
                .catch((error) => console.log(error));
        });

    }



    return (
        <>
            <Button variant="dark" onClick={handleShow}>
                ADD BRAND
            </Button>

            <Modal show={show} onHide={handleClose} centered backdrop="static">
                <Modal.Header closeButton>
                    <Modal.Title>ADD BRAND</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={AddBrand}>
                        <div className="mb-3">
                            <label htmlFor="CategoryName" className="form-label">
                            BRAND Name
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="CategoryName"
                                value={Brandname}
                                onChange={(e) => setBrandname(e.target.value)}
                            />

                        </div>

                        <div className="mb-3">
                            <label htmlFor="formFile" className="form-label">
                            BRAND Image
                            </label>
                            <input className="form-control" onChange={(e) => setBrandimage(e.target.files[0])} type="file" id="formFile" />
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

export default BrandModal;