import React, { useEffect, useState } from 'react'
import ProductModal from '../components/ProductModal'
import axios from 'axios'
import { AiFillDelete } from 'react-icons/ai'
import { PiNotePencilLight } from 'react-icons/pi'
import UpdateProduct from '../components/UpdateProduct'


export default function Products() {

    const [Product, setProduct] = useState([])
    useEffect(() => {
        axios.get("/api/allproducts")
            .then(json => setProduct(json.data.products))
            .catch(error => console.log(error.message))
    })


    const deleteproduct = (name) => {
        console.log(name)
        const payload = { name }


        let config = {
            method: 'delete',
            url: '/api/deleteproduct',
            data: payload
        };


        axios(config).then(json => console.log(json.data)).catch(err => console.log(err))

    }

    return (
        <div className="container">
            <div className="d-flex justify-content-between align-items-center p-2 my-3 rounded" style={{backgroundColor:"#66ffff"}}>
                <span className='fs-4 fw-bold'>Products</span>
                <ProductModal />
            </div>

            <div className="container">
                <table className="table align-middle">
                    <thead>
                        <tr>
                            <th scope="col">id</th>
                            <th scope="col">Image</th>
                            <th scope="col">Name</th>
                            <th scope="col">Brand</th>
                            <th scope="col">Category</th>
                            <th scope="col">Price</th>
                            <th scope="col">Rating</th>
                            <th scope="col">Description</th>
                            <th scope="col">Delete</th>
                            <th scope="col">Update</th>

                        </tr>
                    </thead>
                    <tbody>
                        {
                            Product.map((val, key) =>
                                <tr key={key}>
                                    <td>{key+1}</td>
                                    <td><img src={val.thumbnail} className='img-fluid rounded-circle border border-secondary' style={{ height: '10vh', aspectRatio: 1 / 1, objectFit: 'contain' }} alt="" srcSet="" /></td>
                                    <td>{val.name}</td>
                                    <td>{val.brand}</td>
                                    <td>{val.category}</td>
                                    <td>{val.price}</td>
                                    <td>{val.rating}</td>
                                    
                                    <td>{val.description.length < 20 ? val.description : val.description.substring(0, 20) + "..."}</td>
                                    <td><button className="btn btn-dark" onClick={() => deleteproduct(val.name)}><AiFillDelete /></button></td>
                                    <td><UpdateProduct id={val._id} name={val.name} brand={val.brand} category={val.category} price={val.price} rating={val.rating} /></td>

                                </tr>)
                        }



                    </tbody>
                </table>

            </div>
        </div>
    )
}