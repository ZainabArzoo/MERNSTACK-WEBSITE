import React from 'react'
import GuestNav from './components/GuestNav'
import { Route, Routes , Navigate,} from 'react-router-dom'
import Login from './pages/Login'
import Signup from './pages/Signup'
import GuestFooter from './components/GuestFooter'
import Home from './pages/Home'







function GuestUser() {

  return (
    <>
      <GuestNav />

      {
        <Routes>

          <Route path="/" element={<Home />} />
          <Route path="*" element={<Navigate to="/signup" replace={true} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      }

      <GuestFooter />
    </>

  )
}

export default GuestUser