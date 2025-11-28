import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import '../../scss/custom.scss'; 

const Footer = () => {
    return (
        <footer className="footer fixed-bottom bg-primary" >
        <div className="container">
            <div className="row">
                <div className="col-md-6">
                    <div className='footer-links'>
                        <Link className="text-white" to='piracy/0'>Terms of Use</Link>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="footer-links">
                        <Link className="text-white" to='/piracy/1'>Privacy policy</Link>
                    </div>
                </div>
            </div>
            <div className='row'>
                <div className='col-sm-12'>
                    <Link className="text-white" to='/piracy/2'>Copyright</Link>
                </div>
            </div>
        </div>
    </footer>
        
    )
};

export default Footer;