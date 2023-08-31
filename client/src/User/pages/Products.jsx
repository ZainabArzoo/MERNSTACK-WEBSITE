import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom'
import Loader from '../components/Loader';




export default function Products() {

  const [products, setProducts] = useState([])
  const [loader, setLoader] = useState(true)

  // useEffect(() => {
  //   axios.get('https://fakestoreapi.com/products').then(json => {
  //     setProducts(json.data);
  //     setLoader(false)
  //   })
  // }, [])


  useEffect(() => {
      axios.get("/api/allproducts")
          .then(json => setProducts(json.data.products))
          setLoader(false)
  }, [])

  return (
    <>
                <div className='container py-2'>
               
               <img
                   className="d-block w-100"
                   src="/images/banner2.webp"
                  
               />
          
   </div>

      {
        loader
          ?
          <Loader />
          :
          <div className='container'>

            <div className="row">
              <div className="col-md-12">
              <h1 className='text-center'>Shop by Products</h1>
              
                <div className="row">
                  {
                    products.map((val, key) =>

                      <div className="col-md-3 my-4" key={key}>

                        <Link className='text-decoration-none' to={`/products/${val._id}`}>
                          <Card>
                            <Card.Img style={{
                              width: '100%',
                              height: '300px',
                              objectFit: 'contain'
                            }} src={val.thumbnail} />
                            <Card.Body>
                              <Card.Title>{val.name.length > 12 ? val.name.slice(0, 12) + '...' : val.name}</Card.Title>
                              <Card.Text>{val.price}$
                              </Card.Text>
                            </Card.Body>
                          </Card>
                        </Link>
                      </div>

                    )
                  }
                </div>
              </div>
            </div>
          </div>
      }
    </>
  )
}


