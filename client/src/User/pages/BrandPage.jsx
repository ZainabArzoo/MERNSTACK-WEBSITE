import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Card from 'react-bootstrap/Card';
import axios from 'axios';


export default function BrandPage() {

    const { Brandname } = useParams()
    const [products, setProducts] = useState([])



    useEffect(() => {
        axios.get(`/api/productbybrand/${Brandname}`).then(json => setProducts(json.data.products))
      }, [Brandname])
    

 
    return (
        <div className="container">
                            <div className='container py-2'>
               
               <img
                   className="d-block w-100"
                   src="/images/banner3.webp"
                  
               />
          
   </div>
            <div className="my-5 text-center">
                <h1>{Brandname.toUpperCase()}</h1>
            </div>

            <div className="row">
                {
                    products.map((val, key) =>

                        <div className="col-md-6 my-4" key={key}>
                            <Link className='text-decoration-none' to={`/products/${val._id}`}>
                                <Card>
                                    <Card.Img style={{
                            width: '100%',
                            height: '250px',
                            objectFit: 'contain'
                        }}variant="top" src={val.thumbnail} />
                                    <Card.Body>
                                        <Card.Title>{val.name.length > 30 ? val.name.slice(0,30) + '...' : val.name}</Card.Title>
                                        <p>{val.price}$</p>
                                        <Card.Text>{val.description.length > 50 ? val.description.slice(0,50) + '...' : val.description}
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            </Link>
                        </div>

                    )
                }
            </div>
        </div>
    )
}
