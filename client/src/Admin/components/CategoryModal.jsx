import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { storage } from '../utils/Firebase';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import axios from 'axios'


function CategoryModal({recallData}) {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [Categoryname, setCategoryname] = useState("")
    const [Categoryimage, setCategoryimage] = useState(null)


    const AddCategory = (e) => {
        e.preventDefault();
        const storageRef = ref(storage, `images/categories/${Categoryimage.name}`);
        uploadBytes(storageRef, Categoryimage).then((snapshot) => {
            getDownloadURL(snapshot.ref)
                .then((url) => {
                    const payload = { Categoryname, Categoryimage: url }
                    axios.post("/api/addcategory", payload)
                        .then((json) => {
                            setShow(false);
                            recallData(json.data.Categories)
                        })
                        .catch(error => console.log(error))

                })
                .catch((error) => console.log(error));
        });

    }



    return (
        <>
            <Button variant="dark" onClick={handleShow}>
                ADD CATEGORY
            </Button>

            <Modal show={show} onHide={handleClose} centered backdrop="static">
                <Modal.Header closeButton>
                    <Modal.Title>ADD CATEGORY</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={AddCategory}>
                        <div className="mb-3">
                            <label htmlFor="CategoryName" className="form-label">
                            CATEGORY NAME
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="CategoryName"
                                value={Categoryname}
                                onChange={(e) => setCategoryname(e.target.value)}
                            />

                        </div>

                        <div className="mb-3">
                            <label htmlFor="formFile" className="form-label">
                            CATEGORY IMAGE
                            </label>
                            <input className="form-control" onChange={(e) => setCategoryimage(e.target.files[0])} type="file" id="formFile" />
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

export default CategoryModal;