import React, { useEffect, useState } from 'react';
import '../styles/profile.css';

const MainPage = () => {
    
    return (
        <div className='space-navbar'> 
            <div className='row space-languages'>
                <div className='col-sm-12'>
                    <h1>Welcome to my profile :3</h1>
                </div>
            </div>
            <img src="/puter.jpg" className='img-fluid'></img>
            <br></br><br></br>
            <div className='row space-languages bg-info rounded'>
                <div className='col-sm-12'>
                    <h1>What is a programming langauge?</h1><br></br>
                    {/* source: wikipedia page for programming language */}
                    A programming language is a system of notation for writing computer programs.[1] Programming languages are described in terms of their syntax (form) and semantics (meaning), usually defined by a formal language. Languages usually provide features such as a type system, variables, and mechanisms for error handling. An implementation of a programming language is required in order to execute programs, namely an interpreter or a compiler. An interpreter directly executes the source code, while a compiler produces an executable program.

                </div>
            </div>
            <div className='row space-languages'>
                <div className='col-sm-12'>
                    <h1>Programming languages I know</h1>
                </div>
            </div>
            <br></br>
            <div className='row space-languages border'>
                <div className='col-sm-2 d-flex align-items-center justify-content-center bg-secondary'>
                    <h3>Python</h3>
                </div>
                <div className='col-sm-5 text-start bg-success'>
                    <h5>Highlights: </h5>
                    - Easy to use.<br></br>
                    - Very beginner friendly. <br></br>
                </div>
                <div className='col-sm-5 text-start bg-danger'>
                    <h5>Downsides: </h5>
                    - Indentation (it can be annoying). <br></br>
                    - Can be very different from other programming langauges. <br></br>
                </div>
            </div>
            <br></br>
            <div className='row space-languages border'>
                <div className='col-sm-2 d-flex align-items-center justify-content-center bg-secondary'>
                <h3>PHP</h3>
                </div>
                <div className='col-sm-5 text-start bg-success'>
                <h5>Highlights: </h5>
                    - It's not that hard to learn. <br></br>
                    - You can treat PHP files like HTML ones. <br></br>
                </div>
                <div className='col-sm-5 text-start bg-danger'>
                <h5>Downsides: </h5>
                    - Having to open and close php tags constantly if you are mixing it with HTML. <br></br>
                    - Having to mix PHP and JS sucks. Just write each one in its file (or at least that's what I did). <br></br>
                </div>
            </div>
            <br></br>
            <div className='row space-languages border'>
                <div className='col-sm-2 d-flex align-items-center justify-content-center bg-secondary'>
                <h3>SQL</h3>
                </div>
                <div className='col-sm-5 text-start bg-success'>
                <h5>Highlights: </h5>
                    - Very easy to learn. <br></br>
                    - Essential if you want to do any backend. <br></br>
                </div>
                <div className='col-sm-5 text-start bg-danger'>
                <h5>Downsides: </h5>
                    - To this day I don't know what a LEFT or RIGHT JOIN is. <br></br>
                    - Those queries can get very complex. <br></br>
                </div>
            </div>
            <br></br>
            <div className='row space-languages bg-info rounded'>
                <div className='col-sm-12'>
                    <h1>What is a framework?</h1><br></br>
                    {/* source: wikipedia page for software framework */}
                    In computer programming, a software framework is an abstraction in which software, providing generic functionality, can be selectively changed by additional user-written code, thus providing application-specific software. It provides a standard way to build and deploy applications and is a universal, reusable software environment that provides particular functionality as part of a larger software platform to facilitate the development of software applications, products and solutions.
                </div>
            </div>
            <div className='row space-languages'>
                <div className='col-sm-12'>
                    <h1>Frameworks I've used</h1>
                </div>
            </div>
            <div className='row space-languages border'>
                <div className='col-sm-2 d-flex align-items-center justify-content-center bg-secondary'>
                <h3>Django</h3>
                </div>
                <div className='col-sm-5 text-start bg-success'>
                <h5>Highlights: </h5>
                    - Very easy to learn. <br></br>
                    - Combines Python, SQL, and HTML into one, which are all easy languages. <br></br>
                </div>
                <div className='col-sm-5 text-start bg-danger'>
                <h5>Downsides: </h5>
                    - Literally none :) <br></br>
                    - Make sure to delete all migration files before merging code. If it is not done, it causes a LOT of merge conflicts. <br></br>
                </div>
            </div>
            <br></br>
        </div>
        
    )
};

export default MainPage;