import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';


export default function Categories() {

  const [categories, setCategories] = useState([])

  // useEffect(() => {
  //   axios.get('https://fakestoreapi.com/products/categories').then(json => setCategories(json.data))

  // }, [])


  useEffect(() => {
    axios.get('/api/allcategories').then(json => setCategories(json.data.Categories))
  

  }, [])





  return (
    <>
    <div className="container">
      <div className="my-4 text-center">
        <h1>Shop by Categories</h1>
      </div>

      <div className="row">
        {
          categories.map((val, key) =>
            <div className="col-md-6 my-3" key={key}>
              <Link className='text-decoration-none text-center' to={`/category/${val.Categoryname}`}>
                <Card>
                <Card.Img style={{
                              width: '100%',
                              height: '300px',
                              objectFit: 'contain'
                            }} src={val.Categoryimage} />
                  <Card.Body>

                    <Card.Title>{val.Categoryname.toUpperCase()}</Card.Title>

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
