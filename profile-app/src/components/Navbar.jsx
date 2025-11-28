import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';


// source to add navbar to all pages: 
// https://stackoverflow.com/questions/57845109/reactjs-how-to-overlay-a-component-on-top-of-another-components-element
const Navbar = () => {
    return (

            <div className="navbar navbar-expand-lg fixed-top bg-primary">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/"><img style={{"width": "50px", "height": "50px"}} src="https://images.scalebranding.com/minimalist-cat-logo-b74ce56f-4299-4566-a361-6cf446f2f890.jpg"></img></Link>
                <button className="navbar-toggler" 
                        type="button" 
                        data-bs-toggle="collapse" 
                        data-bs-target="#navbarNav" 
                        aria-controls="navbarNav" 
                        aria-expanded="false" 
                        aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link className="nav-link text-white" to="/">Main Page</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link text-white" to="/experience">Experience</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link text-white" to="/todolist">Todo List</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link text-white" to="/blog">Blog</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link text-white" to="/contact">Contact Page</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
       

        
    );
};

export default Navbar;