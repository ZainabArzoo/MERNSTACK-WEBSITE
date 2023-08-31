import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { GlobalContext } from '../../context/context';
import { AiOutlineShoppingCart } from "react-icons/ai";
import { CartContext } from '../cartcontext/context';





function NavigationBar() {

    const { state, dispatch } = useContext(GlobalContext)
    const { Cart_state, cart_dispatch } = useContext(CartContext)
    return (
        <Navbar bg="light" expand="lg">
            <Container>
                <Link className='navbar-brand fw-bold' to="/">Online <span style={{ color: "#66ffff" }}>Shop</span></Link>

                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto fw-bold">
                        <Link className='nav-link' to="/" style={{ color: "black" }}>HOME</Link>
                        <Link className='nav-link' to="/products" style={{ color: "black" }}>PRODUCTS</Link>
                        <Link className='nav-link' to="/cart" style={{ color: "black" }}>
                            <button
                                type="button"
                                className="btn btn-dark position-relative"
                            >
                                <AiOutlineShoppingCart />
                                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                    {Cart_state.cart.length}
                                    <span className="visually-hidden">unread messages</span>
                                </span>
                            </button></Link>
                        <button className="btn btn-outline-dark fw-bold mx-2"
                            onClick={() => {
                                dispatch({
                                    type: "USER_LOGOUT"
                                })
                            }}
                        >Logout</button>





                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavigationBar;


