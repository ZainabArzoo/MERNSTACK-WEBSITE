import React from 'react'
import { AiFillFacebook } from 'react-icons/ai';
import { AiFillTwitterSquare } from 'react-icons/ai';
import { AiOutlineInstagram } from 'react-icons/ai';
import { AiFillLinkedin } from 'react-icons/ai';
import { RiWhatsappFill } from 'react-icons/ri';



export default function Footer() {
    return (

        <div className="bg-dark fs-5 fw-bold text-center text-white py-2">
                <p>Online <span style={{ color: "#66ffff" }}>Shop</span></p>
                <div className='my-2'>
               <span><AiFillFacebook/></span>
               <span><AiFillTwitterSquare/></span>
               <span><AiOutlineInstagram/></span>
               <span><AiFillLinkedin/></span>
               <span><RiWhatsappFill/></span>
               </div>

                <hr />
                <div className='bg-dark fs-5 fw-semibold text-center text-white py-2'>All the Rights Reserved</div>

            </div>
    


    )
}









































































