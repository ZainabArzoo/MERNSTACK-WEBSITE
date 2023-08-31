import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { storage } from '../utils/Firebase';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import axios from 'axios'
import { PiNotePencilLight } from 'react-icons/pi'



function UpdateCategory(props) {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [Categories, setCategories] = useState([])

    const [Categoryname, setCategoryname] = useState(props.Categoryname)
    const [id, setid] = useState(props.id)
    // const [Categoryimage, setCategoryimage] = useState(null)


    const UpdCategory = (e) => {
        e.preventDefault();
        const payload = {
            _id: id,
            Categoryname: Categoryname
        }
        console.log(payload)
        axios.put("/api/updatecategory", payload)
            .then((json) => {
                setCategories(json.data.Category);
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
                    <Modal.Title>UPDATE CATEGORY</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={UpdCategory}>
                        <div className="mb-3">
                            <label htmlFor="CategoryName" className="form-label">
                            CATEGORY NAME
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="CategoryName"
                                defaultValue={Categoryname}
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
                            UPDATE
                        </button>
                    </form>
                </Modal.Body>

            </Modal>
        </>
    );
}

export default UpdateCategory;