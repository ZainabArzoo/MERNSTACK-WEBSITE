import React from 'react'
import { Link, useLocation } from 'react-router-dom';
import { useContext } from 'react';
import { GlobalContext } from '../../context/context';



function SideBar() {

    const { state, dispatch } = useContext(GlobalContext)

    const location = useLocation()

    const NavItems = [

        {
            tab: "PRODUCTS",
            url: "/products",
        },
        {
            tab: "CATEGORIES",
            url: "/categories",
        },
        {
            tab: "BRANDS",
            url: "/brands",
        },

        {
            tab: "ORDERS",
            url: "/orders",
        },

    ]

    return (
        <>
            <div className="p-3 d-flex text-white justify-content-between align-items-center">
                <span className='btn btn-dark fw-bold'>Admin</span>

                    {
                        NavItems.map((val, key) =>
                            <div key={key} className={`nav-item ${location.pathname == val.url}`}>
                                <Link className='nav-link d-flex align-items-center' style={{ color: "black" }} to={val.url}>
                                    <span>{val.tab}</span>
                                </Link>
                            </div>)
                    }



                <button className="btn btn-dark fw-bold"
                    onClick={() => {
                        dispatch({
                            type: "USER_LOGOUT"
                        })
                    }}
                >Logout</button>

            </div>






        </>

    )
}

export default SideBar