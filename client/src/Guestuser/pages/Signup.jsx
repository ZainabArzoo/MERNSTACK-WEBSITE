import Swal from 'sweetalert2';
import './Signup.css'
import { useState } from "react";
import axios from 'axios'

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");



  const SignupUser = (e) => {
    e.preventDefault();
    const payload = { email, password, username }
    console.log(payload)
    axios.post("/api/signup", payload)
      .then((json) => console.log(json.data))
      .catch((error) => console.log(error))
  }

  const success = () => {
    Swal.fire({
      title: 'Successfully Submitted!',
      icon: 'success',
      confirmButtonColor: 'Black',
      confirmButtonText: 'Done',
      iconColor: '#ff2828',
      color: 'black'
    })

  }

  return (


    <>
      <div className='container justify-content-center d-flex py-5'>
        <form className="form_main" onSubmit={SignupUser} >
          <p className="heading">Welcome</p>
          <div className="inputContainer">

            <input
              placeholder="Username"
              id="username"
              className="inputField"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
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
            <p>Already have account?</p>
            <a href="./Login">Login</a>
          </div>
        </form>
      </div>
    </>



  );
}

export default Signup;






