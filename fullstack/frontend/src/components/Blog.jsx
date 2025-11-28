import React, { useEffect, useState } from 'react';
import '../styles/profile.css';
import { Link } from 'react-router-dom';



const Blog = () => {

    
    return (
        <div className='space-navbar'>  


            <div className="row">
            <div className="col-sm-12 card bg-secondary">
                <div className="card-body">
                    <div className='row'>
                        <div className='col-sm-9'>
                            <h1>My little pony</h1>
                            <br></br>
                            <h3>Blog where I talk about what My little pony (other than the greatest show ever).</h3>

                            <br></br>
                            {/* <button className='btn btn-success'>Read</button> */}
                            <Link to="/blogpost/0" className='btn w-75 btn-primary'>Read</Link>
                        </div>
                        <div className='col-sm-3'>
                            {/* class img fluid so that the img resizes and fits */}
                            <img src="/mlp.jpg" className="img-fluid"></img>
                        </div>
                    </div>
                    
                </div>
            </div>
            </div>

            <br></br><br></br>

            <div className='row'>
                <div className="col-sm-4 card bg-secondary">
                <div className="card-body">
                    <div className='row'>
                        <div className='col-sm-12'>
                        <img src="/nightcore2.jpg" className="img-fluid"></img>
                        </div>
                    </div>
                    <div className="col text-center">
                       <h3>Nightcore</h3><br></br>
                       <h5>Blog where I talk about what nightcore is.</h5>
                       <br></br>
                       <Link to="/blogpost/1" className='btn w-75 btn-primary'>Read</Link>
                    </div>
                </div>
                </div>

                <div className="col-sm-4 card bg-secondary">
                <div className="card-body">
                <div className='row'>
                        <div className='col-sm-12'>
                        <img src="/aj.png" className="img-fluid"></img>
                        </div>
                    </div>
                    <div className="col text-center">
                       <h3>Animal Jam</h3><br></br>
                       <h5>Blog where I talk about what Animal Jam (classic) is.</h5>
                       <br></br>
                       <Link to="/blogpost/2" className='btn w-75 btn-primary'>Read</Link>
                    </div>
                </div>
                </div>

                <div className="col-sm-4 card bg-secondary">
                <div className="card-body">
                <div className='row'>
                        <div className='col-sm-12'>
                        <img src="/2012.jpg" className="img-fluid"></img>
                        </div>
                    </div>
                    <div className="col text-center">
                       <h3>2012</h3><br></br>
                       <h5>Blog where I talk about why 2012 is the best year.</h5>
                       <br></br>
                       <Link to="/blogpost/3" className='btn w-75 btn-primary'>Read</Link>
                    </div>
                </div>
                </div>
            </div>

        </div>
        
    )
};

export default Blog;