import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { AiFillDelete } from 'react-icons/ai'
import BrandModal from '../components/BrandModal'

import UpdateBrand from '../components/UpdateBrand'





function Brands() {

    const [brands, setbrands] = useState([])

    useEffect(() => {
        axios.get("/api/allbrands")
            .then((json) => setbrands(json.data.Brands))
            .catch((error) => console.log(error))
    }, [])


    const deletebrand = (Brandname) => {
        console.log(Brandname)
        const payload = { Brandname }


        let config = {
            method: 'delete',
            url: '/api/deletebrand',
            data: payload
        };


        axios(config).then(json => console.log(json.data)).catch(error => console.log(error))

    }



    return (
        <div className="container">
            <div className="d-flex justify-content-between align-items-center p-2 my-3 rounded" style={{backgroundColor:"#66ffff"}}>
                <span className='fs-4 fw-bold'>Brands</span>
                <BrandModal recallData={setbrands}/>
            </div>
            <div className="container">
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">id</th>
                            <th scope="col">Brand image</th>
                            <th scope="col">Brand name</th>
                            <th scope="col">Delete</th>
                            <th scope="col">Update</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            brands.map((val, key) =>
                                <tr key={key}>
                                    <th scope="row">{key+1}</th>      
                                    <td><img src={val.Brandimage} className='img-fluid rounded-circle border border-secondary' style={{ height: '10vh', aspectRatio: 1 / 1, objectFit: 'contain' }} alt="" srcSet="" /></td>
                                    <td>{val.Brandname}</td>
                                    <td><button className="btn btn-dark" onClick={() => deletebrand(val.Brandname)}><AiFillDelete/></button></td>
                                    <td><UpdateBrand id={val._id} Brandname={val.Brandname} Brandimage={val.Brandimage}/></td> 
                                </tr>
                            )
                        }
                    </tbody>
                </table>

            </div>
        </div>
    )
}

export default Brands