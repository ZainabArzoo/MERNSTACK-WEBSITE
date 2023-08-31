import React, { useEffect, useState } from 'react'
import CategoryModal from '../components/CategoryModal'
import axios from 'axios'
import { AiFillDelete } from 'react-icons/ai'
import UpdateCategory from '../components/UpdateCategory'


function Categories() {

    const [Categories, setCategories] = useState([])

    useEffect(() => {
        axios.get("/api/allcategories")
            .then((json) => setCategories(json.data.Categories))
            .catch((error) => console.log(error))
    }, [])


    const deletecategory = (Categoryname) => {
        console.log(Categoryname)
        const payload = { Categoryname }


        let config = {
            method: 'delete',
            url: '/api/deletecategory',
            data: payload
        };


        axios(config).then(json => console.log(json.data)).catch(error => console.log(error))

    }



    return (
        <div className="container">
            <div className="d-flex justify-content-between align-items-center p-2 my-3 rounded" style={{backgroundColor:"#66ffff"}}>
                <span className='fs-4 fw-bold'>Categories</span>
                <CategoryModal recallData={setCategories}/>
            </div>
            <div className="container">
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">id</th>
                            <th scope="col">Category image</th>
                            <th scope="col">Category name</th>
                            <th scope="col">Delete</th>
                            <th scope="col">Update</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            Categories.map((val, key) =>
                                <tr key={key}>
                                    <th scope="row">{key+1}</th>      
                                    <td><img src={val.Categoryimage} className='img-fluid rounded-circle border border-secondary' style={{ height: '10vh', aspectRatio: 1 / 1, objectFit: 'contain' }} alt="" srcSet="" /></td>
                                    <td>{val.Categoryname}</td>
                                    <td><button className="btn btn-dark" onClick={() => deletecategory(val.Categoryname)}><AiFillDelete/></button></td>
                                    <td><UpdateCategory id={val._id} Categoryname={val.Categoryname}/></td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>

            </div>
        </div>
    )
}

export default Categories


