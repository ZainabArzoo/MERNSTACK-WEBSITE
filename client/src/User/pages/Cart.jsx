import { useContext, useEffect, useState } from "react";
import { CartContext } from '../cartcontext/context';
import { GlobalContext } from "../../context/context";
import { decodeToken } from 'react-jwt'
import axios from 'axios'
import Swal from 'sweetalert2';



function Cart() {



    const [address, setAddress] = useState("")
    const [contact, setContact] = useState("")




    const { Cart_state, cart_dispatch } = useContext(CartContext)
    const { state, dispatch } = useContext(GlobalContext)
    const total = Cart_state.cart.reduce((accumulator, product) => accumulator + (product.price * product.productQuantity), 0)
    const user = decodeToken(state.token)




    const checkout = (e) => {
        e.preventDefault();
        const payload = {
            Items: Cart_state.cart,
            Totalbill: total,
            Customeraddress: address,
            Customercontact: contact,
            Customername: user.username,
            Customeremail: user.email
        }
        console.log(payload)
        axios.post("/api/addorder", payload)
            .then(() => {
                cart_dispatch({
                    type: "CLEAR_CART"
                })
            })
            .catch((error) => console.log(error))
    }



    const success = () => {
        Swal.fire({
            title: 'Order Successfully Submitted!',
            icon: 'success',
            confirmButtonText: 'Done',
            confirmButtonColor: 'Black',
            iconColor: '#ff2828',
            color: 'black'
        })
    }



    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col-md-8">
                    <div className="p-3 d-flex justify-content-between align-items-center">
                <span className='fw-bold'><h3>CART</h3></span>

                        
                        <button
                            className="btn btn-outline-dark fw-bold"
                            onClick={() =>
                                cart_dispatch({
                                    type: "CLEAR_CART"
                                })
                            }
                        >
                            Clear Cart
                        </button> 
                        </div>


                        {
                            Cart_state.cart.map((val, key) => (
                                <div className="container" key={key}>
                                    <div className="row">
                                        <div className="col-md-4">
                                            <img className="img-fluid" src={val.thumbnail} alt="image" />
                                        </div>
                                        <div className="col-md-8">
                                            <h5>Name : {val.name}</h5>

                                            

                                            <h5>price : {val.price}$</h5>

                                           
                                           
                                            <h5>Quantity : {val.productQuantity}</h5>
                                           
                                            
                                            <button className="btn btn-outline-dark fw-bold my-3" onClick={() => cart_dispatch({
                                                type: "CLEAR_SINGLE_CART",
                                                payload: val._id
                                            })}>Clear</button>
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                        <div><button className="btn btn-outline-dark fw-bold my-2 w-100">{total}</button>
                        </div>

                    </div>
                    <div className="col-md-4 my-3">
                    
                        <div className='container justify-content-center d-flex py-5'>

                            <form className="form_main" action="" onSubmit={checkout}>
                            <p>Fill this Form</p>
                                <div className="inputContainer">

                                    

                                    <input
                                        placeholder="Address"
                                        id="address"
                                        className="inputField"
                                        type="text"
                                        value={address}
                                        onChange={(e) => setAddress(e.target.value)}
                                    />
                                </div>
                                <div className="inputContainer">

                                    <input
                                        placeholder="Contact"
                                        id="contact"
                                        className="inputField"
                                        type="password"
                                        value={contact}
                                        onChange={(e) => setContact(e.target.value)}
                                    />
                                </div>
                                <button className="btn btn-outline-dark fw-bold mx-1 my-3" onClick={success}>Confirm Order</button>
                            </form>
                        </div>


                    </div>
                </div>
            </div>


        </>
    );
}

export default Cart;
