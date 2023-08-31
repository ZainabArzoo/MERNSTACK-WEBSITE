import React from 'react'
import SideBar from './components/SideBar'
import Categories from './pages/Categories'
import {Route,Routes} from "react-router-dom";
import Products from './pages/Products'
import Orders from './pages/Orders'
import Brands from './pages/Brands';



function Admin() {
  return (
    <div className="row m-0 p-0">
     
        <SideBar/>


      <Routes>
        <Route path="/products" element={<Products/>} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/brands" element={<Brands />} />
      </Routes>
      </div>

  )
}

export default Admin