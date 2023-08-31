import Swal from 'sweetalert2';
import './Login.css'
import React, { useState, useContext } from 'react'
import axios from 'axios'
import { GlobalContext } from '../../context/context';
import Cookies from "js-cookie";


function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const { state, dispatch } = useContext(GlobalContext)



    const loginUser = (e) => {
        e.preventDefault();
        const payload = { email, password }
        console.log(payload)
        axios.post("/api/login", payload)
            .then((json) => {
                Cookies.set("token", json.data.token)
                dispatch({
                    type: "USER_LOGIN",
                    token: json.data.token
                })
            })
            .catch((error) => console.log(error))
    }



    const success = () => {
        Swal.fire({
            title: 'Successfully Submitted!',
            icon: 'success',
            confirmButtonText: 'Done',
            confirmButtonColor: 'Black',
            iconColor: '#ff2828',
            color: 'black'
        })
    }



    return (

        <>
            <div className='container justify-content-center d-flex py-5'>
                <form className="form_main" action="" onSubmit={loginUser}>
                    <p className="heading">Welcome Back</p>
                    <div className="inputContainer">

                        <input
                            placeholder="Email"
                            id="email"
                            className="inputField"
                            type="text"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="inputContainer">

                        <input
                            placeholder="Password"
                            id="password"
                            className="inputField"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button className="btn btn-outline-dark fw-bold mx-1" id="button" onClick={success}>Submit</button>
                    <div className="signupContainer">
                        <p>Don't have any account?</p>
                        <a href="./Signup">Sign up</a>
                    </div>
                </form>
            </div>
        </>






    );
}

export default Login;

