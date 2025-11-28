import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import '../styles/profile.css';
import { ALPHANUMERIC_REGEX, EMAIL_REGEX } from "../constants/constants";
import { getItems, createItemForUser, deleteItem } from '../services/api';

const Contact = () => {
    const [data, setData] = useState({
        email: "",
        message: "",
        date: ""
      });
  
      const [error, setError] = useState({
        email: "",
        message: ""
      });

      const [messages, setMessages] = useState([]);

      const [userId, setUserId] = useState(null);

      const getMessages = () => {
        getItems(`messages/${userId}`).then((response) => {
          setMessages(response.data)
        }).catch((error) => {
          console.log(error)
        })
      }

      // check if a user is logged in or not. our page's layout changes based on this 
      const getUser = () => {
          getItems("users/curr").then((response) => {
              setUserId(response.data.Id)
          }).catch((error)=>{
              // avoid printing the whole error response. i know the user is not logged in
              if (error.response && error.response.status === 401) {
                  console.log('Unathourized user.')
              // something else happened, i need to check what it is
              } else {
                  console.log(error);
              }
          });
      };

      const deleteMsg = (msg_id) => {
        const msgRecord = `${userId}/${msg_id}`
        deleteItem('messages', msgRecord).then((result) => {
            alert(`Message successfully deleted! Please go to any other page without refreshing and back to see it updated.`);
        }).catch(error => {
            console.log(error)
        });
      }
  
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
        data.date = new Date(); //date when it was sent
        // hardcoded userId, since the messages are posted without logging in
        createItemForUser("messages",200, data).then(() => {
            alert("Message successfully posted!");
            setData({
              email: "", message: "", date: ""
            })
            setError({message: "", email: ""});
        }).catch((error)=>{
            console.log(error);
        });
        
      };

      useEffect(() => { 
        getUser();
      }, []);

      useEffect(() => {
        getMessages();
      }, [userId])

      const messageForm = () => {
        return (
          <div>
            <br></br><br></br><br></br>
              <h1>Received Messages:</h1>
              <br /><br />
              <div className='container'>
                  {messages.map((record, index) => (
                      <div className='row' key={index}>
                          <div className={`col-sm-9 d-flex justify-content-center align-items-center text-white bg-primary separator`}>
                              <br />
                              From: {record.Email}<br /><br />
                              Message:<br />{record.Message}<br /><br />
                              Sent on: {record.SentDate.slice(0,10)}<br></br><br></br>
                          </div>
                          <div className="col-sm-3 d-flex flex-column justify-content-center align-items-center separator" style={{ backgroundColor: '#e5f7e3' }}>
                              {/* <button className="btn btn-warning" data-bs-toggle="modal" data-bs-target={`#modal-edu-edit-${record.id}`}>Edit</button> */}
                              <button className="btn btn-danger" data-bs-toggle="modal" data-bs-target={`#modal-msg-${record.Id}`}>Remove</button>


                            <div className="modal fade" id={`modal-msg-${record.Id}`} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                <div className="modal-dialog">
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <h1 className="modal-title fs-5" id="exampleModalLabel">Remove selected message</h1>
                                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                        </div>
                                        <div className="modal-body">
                                            Are you sure you want to remove this message?
                                        </div>
                                        <div className="modal-footer">
                                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                            <button type="button" className="btn btn-danger" data-bs-dismiss="modal" onClick={() => deleteMsg(record.Id)}>Remove message</button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                          </div>
                      </div>
                  ))}<br></br><br></br><br></br>
              </div>
          </div>
      );
      }
    
      return (
        <>
        <div>
          {userId ? <> {messageForm()} </>  : (<div>
          {/* source: class sample by professor Yaira Rivera */}
          <h2>Contact Form</h2>
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col">
                <label for="email">Email <span className="text-danger">*</span></label>
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

            {/* <div className='row'>
                <div className="col">
                <input type="checkbox" id="subscribe" name="subscribe" checked={checked} onChange={handleCheckboxChange}/>
                <label htmlFor="subscribe"> Subscribe to the news letter</label>
                </div>
            </div> */}
            <br />
            <div className="row">
              <div className="col">
                <button type="submit" className="bg-success text-dark rounded w-100">Submit</button>
              </div>
            </div>
          </form> </div> ) }
        </div>
        </>
      );
};

export default Contact;