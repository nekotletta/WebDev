// source: https://supertokens.com/blog/building-a-login-screen-with-react-and-bootstrap
// Login.js:
import React, { useState } from 'react';
import '../styles/login.css';
import { EMAIL_REGEX } from "../constants/constants";
import { createItem, setAuthToken } from '../services/api';
import { useNavigate } from 'react-router-dom';

function LoginPage() {

    const [data, setData] = useState({
        email: "",
        password: ""
    });

    // no errors for password
    const [error, setError] = useState({
        email: ""
    });

    // to redirect to the main page once successfully logged in
    const navigate = useNavigate();
    

   const logUserIn = (event) => {

        event.preventDefault();
        for (const key in error) {
            if (error.hasOwnProperty(key)) { 
                const value = error[key];
                if(value){
                return;
                }
            }
        }


        createItem("auth/login", data).then((response) => {
            setData({email: "", password: ""})
            setError({email: ""});

            const token = response.data.token; // Get the token from the response
            
            // localStorage.setItem('jwtToken', token);
            
            // Set the token in default headers for future requests
            setAuthToken(token);
            // obtain token from response and send it over to the main page
            navigate('/');

        }).catch((error)=>{
            console.log(error);
            const error_msg = error.response.data.error;
            if(error_msg == 'Invalid credentials.'){
                alert("Invalid credentials. Please try again")
            } else {
                alert(error_msg)
            }
            setData({password: ""})
            setError({email: error});
        });
    };

  const handleOnChange = (name, value, regex) => {
    if(regex){
        setError({...error, [name]: !regex.test(value)? "Incorrect format!" : ""});
    }
    setData({...data, [name]:value});

  };

  return (
    <div className='container'>
        <div className="row justify-content-md-center mt-5">
        <div className='col col-sm-12'>
            <h2 className="text-center mb-4">Login</h2>
            <form onSubmit={logUserIn}>
            <div className="mb-3">
                <input id="email" name="email" type="email" className="form-control bg-white" value={data.email} maxLength={320}
                onChange={(e) => handleOnChange(e.target.name, e.target.value, EMAIL_REGEX)} required/>

            </div>
    
            <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <input
                type="password"
                className="form-control"
                id="password"
                name="password"
                placeholder="Password"
                value={data.password}
                onChange={(e) => handleOnChange(e.target.name, e.target.value)}
                />
            </div>
    
            <button type="submit" className="btn btn-primary w-100">
                Login
            </button>
            </form>
        </div>
        </div>
    </div>
  );
}

export default LoginPage;