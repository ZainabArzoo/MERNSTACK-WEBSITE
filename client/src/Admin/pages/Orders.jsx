import React, { useEffect, useState } from 'react'

import axios from 'axios'
import UpdateOrder from '../components/UpdateOrder'



export default function Orders() {

    const [Order, setOrder] = useState([])
    useEffect(() => {
        axios.get("/api/allorders")
            .then(json => setOrder(json.data.orders))
            .catch(err => console.log(err.message))
    })



    return (
        <div className="container">
            <div className="d-flex justify-content-between align-items-center p-2 my-3 rounded" style={{backgroundColor:"#66ffff"}}>
                <span className='fs-4 fw-bold'>Orders</span>

            </div>

            <div className="container">
                <table className="table align-middle">
                    <thead>
                        <tr>    
                            <th scope="col">CustomerName</th>
                            <th scope="col">CustomerEmail</th>
                            <th scope="col">CustomerAddress</th>
                            <th scope="col">CustomerContact</th>
                            <th scope="col">TotalBill</th>
                            <th scope="col">Status</th>
                            <th scope="col">Message</th>
                            <th scope="col">Update</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            Order.map((val, key) =>
                                <tr key={key}>
                                    <td>{val.Customername}</td>
                                    <td>{val.Customeremail}</td>
                                    <td>{val.Customeraddress}</td>
                                    <td>{val.Customercontact}</td>
                                    <td>{val.Totalbill}</td>
                                    <td>{val.Status}</td>
                                    <td>{val.Message}</td>
                                    <td><UpdateOrder id={val._id} Status={val.Status} Message={val.Message}/></td>

                                  

                                </tr>)
                        }



                    </tbody>
                </table>

            </div>
        </div>
    )
}