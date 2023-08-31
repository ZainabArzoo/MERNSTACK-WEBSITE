import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';


export default function Brands() {

  const [brands, setbrands] = useState([])

  // useEffect(() => {
  //   axios.get('https://fakestoreapi.com/products/categories').then(json => setCategories(json.data))

  // }, [])


  useEffect(() => {
    axios.get('/api/allbrands').then(json => setbrands(json.data.Brands))
  

  }, [])





  return (
    <>
    <div className="container">
      <div className="my-4 text-center">
        <h1>Shop by Brands</h1>
      </div>

      <div className="row">
        {
          brands.map((val, key) =>
            <div className="col-md-6 my-3" key={key}>
              <Link className='text-decoration-none text-center' to={`/brand/${val.Brandname}`}>
                <Card>
                <Card.Img style={{
                              width: '100%',
                              height: '300px',
                              objectFit: 'contain'
                            }} src={val.Brandimage} />
                  <Card.Body>

                    <Card.Title>{val.Brandname.toUpperCase()}</Card.Title>

                  </Card.Body>
                </Card>
              </Link>
           
            </div>

          )
        }

      </div>


    </div>
    </>
  )
} 
