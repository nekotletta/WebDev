import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import '../styles/profile.css';
import { ALPHANUMERIC_REGEX, EMAIL_REGEX } from "../constants/constants";
// source: https://mui.com/material-ui/react-alert/?srsltid=AfmBOooNfvkVu9e17PneaFQyzsQGcLKJtSOwMJxsJTKkYd7Fnr96jQwI
// wanted to have this as opposed to js alert popup, but nah
// import Alert from '@mui/material/Alert';

const Contact = () => {
    const [data, setData] = useState({
        email: "",
        message: ""
      });
  
      const [error, setError] = useState({
        email: "",
        message: ""
      });

      const [checked, setCheckmark] = useState(false);

      const handleCheckboxChange = () => {
        setCheckmark(!checked);
      };
  
      const handleOnChange = (name, value, regex) => {
        setError({...error, [name]: !regex.test(value)? "Incorrect format!" : ""});
        // handle case where email is over 320 chars, or msg is over 500 chars, as discussed in class
        if(name == 'email' && value.length > 320) {
          setError({...error, [name]: "Email is too long. Max length is 320 characters."})
        }
        if(name == 'message' && value.length > 500) {
          setError({...error, [name]: "Messae is too long. Max length is 500 characters."})
        }
        setData({...data, [name]:value});

      };
    
      const handleSubmit = (event) => {
        event.preventDefault();
        // <Alert severity="success">This is a success Alert.</Alert>
        if (checked){
            alert("Thank you for signing up. You will receive updates on our newsletter.");
        } else {
            alert("Thank you for signing up. Make sure to check out our newsletter.");
        }
      };
    
      return (
        <>
        {/* source: class sample by professor Yaira Rivera */}
          <h2>Contact Form</h2>
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col">
                <label for="email">Email <span class="text-danger">*</span></label>
                <br />
                <input id="email" name="email" type="email" className="form-control bg-white" value={data.email} maxLength={320}
                  onChange={(e) => handleOnChange(e.target.name, e.target.value, EMAIL_REGEX)} required/>
                { error.email && 
                  <span className="text-danger pb-2">{error.email}</span>
                }
              </div>
            </div>
            <div className="row">
              <div className="col">
                <label for="message">Message <span className="text-danger">*</span></label>
                <br />
                <textarea id="message" name="message" className="form-control bg-white" value={data.message} 
                  onChange={(e) => handleOnChange(e.target.name, e.target.value, ALPHANUMERIC_REGEX)} required/>
                { error.message && 
                  <>
                    <span className="text-danger">{error.message}</span>
                  </>
                }
              </div>
            </div>

            <div className='row'>
                <div className="col">
                <input type="checkbox" id="subscribe" name="subscribe" checked={checked} onChange={handleCheckboxChange}/>
                <label htmlFor="subscribe"> Subscribe to the news letter</label>
                </div>
            </div>
            <br />
            <div className="row">
              <div className="col">
                <button type="submit" className="bg-success text-dark rounded w-100">Submit</button>
              </div>
            </div>
          </form>
        </>
      );
};

export default Contact;