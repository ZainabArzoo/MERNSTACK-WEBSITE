import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { storage } from '../utils/Firebase';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';


function ProductModal() {
    const [show, setShow] = useState(false);
    const [category, setCategory] = useState('')
    const [brand, setBrand] = useState('')
    const [name, setName] = useState("")
    const [thumbnail, setThumbnail] = useState(null)
    const [description, setDescription] = useState("")
    const [price, setPrice] = useState(0)
    const [rating, setRating] = useState(0)
    const [images, setImages] = useState([])


    



    const [brandVal, setBrandVal] = useState([])
    const [CategoryVal, setCategoryVal] = useState([])

    const handleClose = () => setShow(false);
    const handleShow = () => {
        axios.get("/api/allbrands").then(json => {
            setBrandVal(json.data.Brands)
            axios.get("/api/allcategories").then(json => {
                setCategoryVal(json.data.Categories)
                setShow(true);
            })
        }).catch(error => console.log(error))

    }


    const urls = []

    const MultipleImageUpload = () => images?.map((val) => {

        const MultipleImageRef = ref(storage, `/images/products/${name}/${val.name}`);
        return uploadBytes(MultipleImageRef, val).then((snapshot) => {
            return getDownloadURL(snapshot.ref)
                .then((url) => {
                    urls.push(url)
                })
                .catch((error) => {
                    console.log(error)
                });
        });

    })




    const AddProduct = (e) => {
        e.preventDefault();

        const uploadImages = MultipleImageUpload()
        Promise.all(uploadImages)
            .then(() => {

                const storageRef = ref(storage, `/images/products/${name}/${thumbnail.name}`);
                uploadBytes(storageRef, thumbnail).then((snapshot) => {
                    getDownloadURL(snapshot.ref)
                        .then((url) => {
                            const payload = {
                                name,
                                category,
                                price,
                                images: urls,
                                thumbnail: url,
                                description,
                                rating,
                                brand
                            }
                            console.log(payload)

                            axios.post("/api/addproduct",payload)
                            .then((json)=>{
                                console.log(json.data)
                                setShow(false);

                            }).catch((error)=>{
                                console.log(error)
                            })

                        })
                        .catch((error) => {
                            console.log(error)
                        });

                });


            }).catch((error) => console.log(error))



    }






    return (
        <>
            <Button variant="dark" onClick={handleShow}>
                Add Product
            </Button>

            <Modal show={show} onHide={handleClose} centered backdrop="static" size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>Add Product</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <form onSubmit={AddProduct}>
                        <div className="row">
                            <div className="col">
                                <FloatingLabel controlId="productname" label="Product Name" className="mb-3 text-secondary">
                                    <Form.Control type="text" placeholder="Product Name" value={name} onChange={(e) => setName(e.target.value)} />
                                </FloatingLabel>
                            </div>
                            <div className="col">
                                <FloatingLabel controlId="price" label="Product Price ($)" className="mb-3 text-secondary">
                                    <Form.Control type="number" placeholder="Product Price" value={price} onChange={(e) => setPrice(e.target.value)} />
                                </FloatingLabel>
                            </div>
                            <div className="col">
                                <FloatingLabel controlId="rating" label="Product Rating ($)" className="mb-3 text-secondary">
                                    <Form.Control type="number" placeholder="Product Rating" value={rating} onChange={(e) => setRating(e.target.value)} />
                                </FloatingLabel>
                            </div>
                        </div>


                        <div className="mb-3">
                            <label htmlFor="thumbnail" className="form-label">
                                Product Thumbnail
                            </label>
                            <input className="form-control" onChange={(e) => setThumbnail(e.target.files[0])} type="file" id="thumbnail" />
                        </div>

                        <div className="mb-3">

                            <p className='mb-0 fw-semibold'>Choose Images</p>
                            <small className="text-secondary">Double Click to Delete Images</small>
                            <div className="mt-2 d-flex gap-2 align-items-center">
                                {
                                    images.map((val, key) =>
                                        <div key={key} className="bg-light border rounded col-md-1"
                                            onDoubleClick={() => setImages(images.filter((img) => img != val))}>
                                            <img style={{ height: '10vh', cursor: 'pointer', objectFit: 'contain' }}
                                                className='img-fluid' src={URL.createObjectURL(val)} alt="" />
                                        </div>)
                                }
                                <label htmlFor="formFile" style={{ height: '10vh', cursor: 'pointer' }} className="col-md-1 d-flex border border-dark border-2 justify-content-center align-items-center rounded  fs-3 fw-bold form-label">
                                    +
                                </label>
                            </div>


                            <input className="form-control d-none" onChange={(e) => setImages([...images, e.target.files[0]])} type="file" id="formFile" />
                        </div>


                        <div className="row">
                            <div className="col">
                                <Form.Group className="mb-3" >
                                    <FloatingLabel controlId="selectCategory" label="Select Category">
                                        <Form.Select aria-label="Please Select a Category" onChange={(e) => setCategory(e.target.value)}>
                                            <option>Please Select a Category</option>
                                            {
                                                CategoryVal.map((val, key) => <option key={key} value={val.Categoryname}>{val.Categoryname}</option>)
                                            }
                                        </Form.Select>
                                    </FloatingLabel>
                                </Form.Group>

                                <Form.Group className="mb-3" >

                                    <FloatingLabel controlId="floatingSelectBrand" label="Select Brand">
                                        <Form.Select aria-label="Please Select a Brand" onChange={(e) => setBrand(e.target.value)}>
                                            <option>Please Select a Brand</option>
                                            {
                                                brandVal.map((val, key) => <option key={key} value={val.Brandname}>{val.Brandname}</option>)
                                            }
                                        </Form.Select>
                                    </FloatingLabel>
                                </Form.Group>
                            </div>
                        </div>





                        <FloatingLabel controlId="floatingTextarea2" label="Description" className='mb-3'>
                            <Form.Control
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                as="textarea"
                                placeholder="Leave a comment here"
                                style={{ height: '100px' }}
                            />
                        </FloatingLabel>





                        <button type="submit" className="btn btn-primary">
                        Done
                        </button>
                    </form>
                </Modal.Body>

            </Modal>
        </>
    );
}

export default ProductModal;