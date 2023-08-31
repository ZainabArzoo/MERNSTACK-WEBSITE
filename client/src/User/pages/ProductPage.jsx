import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import ReactStars from 'react-stars'
import Swal from 'sweetalert2'
import { CartContext } from '../cartcontext/context'
import MultipleImage from '../Components/MultipleImage'

export default function ProductPage() {

  const { Cart_state, cart_dispatch } = useContext(CartContext)

  const { _id } = useParams()
  const [product, setproduct] = useState({})
  const [review, setReview] = useState("")
  const [ratingstar, setratingStar] = useState("")
  const [productQuantity, setproductQuantity] = useState(1)




  const ratingChanged = (newRating) => {
    setratingStar(newRating)
  }

  const submitReview = () => {
    const payload = {
      _id: _id,
      review: review,
      rating: ratingstar
    }
    console.log(payload)


    Swal.fire({
      title: 'Successfully Submitted!',
      text: 'Thanks for reviewing our product',
      icon: 'success',
      confirmButtonText: 'Continue Shopping'
    })

  }

  const addToCart = () => {

    const payload = {
      ...product,
      productQuantity,
      totalPrice: product.price * productQuantity
    }

    // console.log(payload)


    const rep = cart_dispatch({
      type: "ADD_TO_CART",
      payload: payload
    })

    // console.log(rep)



    Swal.fire({
      title: 'Added to Cart!',
      text: 'Check your Cart for Check Out',
      icon: 'success',
      confirmButtonText: 'Continue Shopping',
    })
  }





  useEffect(() => {
    axios.get(`/api/productbyid/${_id}`).then(json => setproduct(json.data.products))

  }, [])






  return (
    <>

      <div className="container mt-5">
        <div className="row">

          <div className="col-md-6">
            {
              product?.images?.length > 0 && <MultipleImage images={product.images} />
            }
          </div>

          <div className="col-md-6">

            <div className="my-5">
              <h1 className='fw-bold'>{product.name} - {product.price}$</h1>
              <p>{product.description}</p>


              <div className='d-flex'>
                <ReactStars
                  count={5}
                  size={24}
                  edit={false}
                  value={product.rating}
                  color2={'#66ffff'} />
              </div>

              <div className="my-3">
                <button className="btn btn-outline-dark mx-1 fw-bold" disabled={productQuantity > 1 ? false : true} onClick={() => setproductQuantity(productQuantity - 1)}>-</button>
                {productQuantity}
                <button className="btn btn-outline-dark mx-1 fw-bold" onClick={() => setproductQuantity(productQuantity + 1)}>+</button>
              </div>


              <button className='btn btn-outline-dark mx-1 fw-bold' onClick={addToCart}>Add to cart</button>
              {/*                             <Cart /> */}


            </div>
          </div>





          <div className="container">
            <div className='mb-5'>
              <h2 className="text-center fw-bold">Review Us</h2>
            </div>

            <div>

              <div className="form-floating">
                <textarea
                  className="form-control"
                  placeholder="Leave a comment here"
                  id="floatingTextarea2"
                  style={{ height: 100 }}
                  defaultValue={review}
                  onChange={(e) => setReview(e.target.value)}
                />
                <label htmlFor="floatingTextarea2" className='fw-bold'>Comments</label>
              </div>

              <div className='mt-3'>

                <p className='fw-bold'>Rate Us :</p>
                <div className="d-flex align-items-center">
                  <ReactStars
                    count={5}
                    size={24}
                    value={ratingstar}
                    onChange={ratingChanged}
                    color2={'#66ffff'}
                  />
                  <span className='ms-3'>({ratingstar})</span>
                </div>
              </div>
              <button className='my-3 btn btn-outline-dark fw-bold' onClick={submitReview}>Submit Review</button>

            </div>
          </div>
        </div>

      </div>



    </>

  )
}