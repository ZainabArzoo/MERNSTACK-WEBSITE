// import React, { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Products from './pages/Products'
import Page404 from './pages/Page404'
import NavigationBar from './Components/NavigationBar'
import Footer from './Components/Footer'
import CategoryPage from './pages/CategoryPage'
import ProductPage from './pages/ProductPage'
import Cart from './pages/Cart'
import BrandPage from './pages/BrandPage'






export default function User() {

  return (
    <>

      <NavigationBar />

      {

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:_id" element={<ProductPage />} />
          <Route path="/category/:Categoryname" element={<CategoryPage />} />
          <Route path="/brand/:Brandname" element={<BrandPage />} />
          <Route path="*" element={<Page404 />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>

      }



      <Footer />


    </>
  )
}
