import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import '../../scss/custom.scss'; 

const imgs = [
    // terms of use
    {"img" : "https://preview.redd.it/i-would-like-to-know-for-people-who-have-ever-got-a-false-v0-v7e0wcpjhtyb1.png?width=1076&format=png&auto=webp&s=a60e50b94289a009fb776edf659a98fd2818d7d6"},
    // privacy
    {"img" : "https://www.prajwaldesai.com/wp-content/uploads/2013/03/How-To-Configure-Legal-Notices-On-Domain-Computers-Using-Group-Policy-Snap-7.jpg"},
    // copyright
    {"img" : "https://static.wikitide.net/avidwiki/thumb/c/cf/UniversalUKWarning2006.png/534px-UniversalUKWarning2006.png"}
]
const Piracy = () => {

    const sel_link = useParams();
    const warning = imgs[sel_link.id];
    return (
        <div className='space-navbar'>
            <div className="container">
                <img src={warning.img}></img>
            </div>
        </div>
    )
};

export default Piracy;