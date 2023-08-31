import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { storage } from '../utils/Firebase';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import { PiNotePencilLight } from 'react-icons/pi'


function UpdateProduct(props) {
    const [show, setShow] = useState(false);
    const [Product, setProduct] = useState([])
    const [category, setCategory] = useState(props.category)
    const [name, setName] = useState(props.name)
    // const [thumbnail, setThumbnail] = useState(null)
    const [description, setDescription] = useState(props.description)
    const [price, setPrice] = useState(props.price)
    const [rating, setRating] = useState(props.rating)
    const [brand, setBrand] = useState(props.brand)
    const [id, setid] = useState(props.id)
    // const [images, setImages] = useState([])


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


    const UpdProduct = (e) => {
      e.preventDefault();
      const payload = {
          _id: id,
          category: category,
          name:name,
          rating:rating,
          price:price,
          description:description,
          brand:brand,
          brandVal:brandVal,
          CategoryVal:CategoryVal

      }
      console.log(payload)
      axios.put("/api/updateproduct", payload)
          .then((json) => {
              setProduct (json.data.products);
              setShow(false);
          })
          .catch((error) => console.log(error))
  }








    return (
        <>
            <Button variant="dark" onClick={handleShow}>
            <PiNotePencilLight />
            </Button>

            <Modal show={show} onHide={handleClose} centered backdrop="static" size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>UPDATE PRODUCT</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <form onSubmit={UpdProduct}>
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

{/* 
                        <div className="mb-3">
                            <label htmlFor="thumbnail" className="form-label">
                                Product Thumbnail
                            </label>
                            <input className="form-control" onChange={(e) => setThumbnail(e.target.files[0])} type="file" id="thumbnail" />
                        </div> */}
{/* 
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
                        </div> */}


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

export default UpdateProduct;