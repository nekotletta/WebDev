import React, { useEffect, useState } from 'react';
import '../styles/profile.css';

const Experience = () => {

    return (
        <div className='space-navbar'> 

            <h1>Experience</h1>

            <div className="container">
                <div className="row exp-table">
                    <div className="col-sm-12 bg-info">Work Experience</div>
                </div>
                <div className="row">
                    <div className="col-sm d-flex justify-content-center align-items-center text-white bg-primary separator">
                        Software Engineer<br></br>
                        Languages: Python (Django Framework)
                    </div>
                    <div className="col-sm-9 text-start bg-secondary separator">
                        <br></br>
                        - Currently managing the creation of an enrollment platform in Django for División de Educación Continua y Estudios Profesionales (DECEP), University of Puerto Rico, Rio Piedras campus.<br></br>
                        - Programmed a system to send emails to users, notifying them in real time about different actions.<br></br>
                        - Programmed a straight-forward dashboard, so that administrators can easily interact with and manage students' enrollments.<br></br>
                        - Always in constant communication with the clients and team, ensuring all requirements and needs are met, and the the project is completed on time.<br></br>
                        - Documenting the project, ensuring future developpers are able to integrate and contribute to the project without major issues.<br></br>
                        <br></br>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm d-flex justify-content-center align-items-center text-white bg-primary">
                        Research Assistant<br></br>
                        Languages: Python
                    </div>
                    <div className="col-sm-9 text-start bg-secondary">
                        <br></br>
                        - Collaborated in refactoring code in Python to track bee movements in real-time with the department of computer science of the University of Puerto Rico, Rio Piedras campus.<br></br>
                        - Refactored the entire code to be able to obtain and track bee's movement in real time, as opposed to storing it and processing it later. <br></br>
                        - Documented the code, so that future developpers are able to continue the development of the project.<br></br>
                        <br></br>
                    </div>
                </div>
                <div className="row exp-table">
                    <div className="col-sm-12 bg-info">Personal Projects</div>
                </div>
                <div className="row">
                    <div className="col-sm d-flex justify-content-center align-items-center text-white bg-primary">
                        Professor Rating Website<br></br>
                        Languages: PHP, JavaScript
                    </div>
                    <div className="col-sm-9 text-start bg-secondary">
                        <br></br>
                        - Create a website to rate professors from the University of Puerto Rico, Rio Piedras campus in PHP.<br></br>
                        - This website is based on an already existing website called ElProfeShop. The main purpose of this project was to make a better version of that website.<br></br>
                        - In order to make the website as accesible as possible, opinions from students in UPR were collected, where I asked what features they'd like, along with how the page should be layed out.<br></br>
                        - Based on this feedback, the following main features were implemented:<br></br>
                        <div className="indent">
                        - Information organization: All the information in the website is divided based on which department the className is part of.<br></br>
                        - Search functionality: Students are able to lookup a certain professor or a className name. When they look a professor up, it shows all courses taught by them.<br></br>
                        - Commenting functionality: Students are able to leave comments associated with a specific className given by a professors. They can also reply to comments and create threads.<br></br>
                        
                        </div>
                        <br></br>
                    </div>
                </div>
                <div className="row exp-table">
                    <div className="col-sm-12 bg-info">Internships</div>
                </div>
                <div className="row">
                    <div className="col-sm d-flex justify-content-center align-items-center bg-primary text-white">
                        Brown University<br></br>
                        Summer 2024
                    </div>
                    <div className="col-sm-9 text-start bg-secondary">
                        <br></br>
                        - Had the opportunity to intern at Brown University to collab in research in computational physics.<br></br>
                        - Wrote a simulation to study movement of bacteria in Matlab, aiding in research in the biophyiscs field.<br></br>
                        <br></br>
                    </div>
                </div>
                <div className="row exp-table">
                    <div className="col-sm-12 bg-info">Courses</div>
                </div>

                {/* if im on my phone having two columns doesnt look good */}
                {/* just put all courses in a single column */}
                <div className="computer-display">
                <div className="row">
                    <div className="col-sm d-flex justify-content-center align-items-center text-white bg-primary">
                        Relevant courses taken<br></br>
                        August 2021- May 2025
                    </div>
                    <div className="col-4 text-start bg-secondary">
                        <br></br>
                        - Data Structures<br></br>
                        - Video Game Development<br></br>
                        - Software Engineering<br></br>
                        <br></br>
                    </div>
                    <div className="col-5 text-start bg-secondary">
                        <br></br>
                        - Machine Learning<br></br>
                        - Operating systems<br></br>
                        - Web Design<br></br>
                        <br></br>
                    </div>
                </div>
                </div>

                <div className="mobile-display">
                <div className="row">
                    <div className="col-sm d-flex justify-content-center align-items-center bg-primary text-white">
                        Relevant courses taken<br></br>
                        August 2021- May 2025
                    </div>
                    <div className="col-sm-9 text-start bg-secondary">
                        <br></br>
                        - Data Structures<br></br>
                        - Video Game Development<br></br>
                        - Software Engineering<br></br>
                        - Machine Learning<br></br>
                        - Operating systems<br></br>
                        - Web Design<br></br>
                        <br></br>
                    </div>
                </div>
                </div>
                
            </div>
        </div>
        
    )
};

export default Experience;