import React, { useEffect, useState } from 'react';
import '../styles/profile.css';
import { ALPHANUMERIC_REGEX, EMAIL_REGEX } from "../constants/constants";
import { getItems, getItemById, createItemForUser, editItem, deleteItem } from '../services/api';
import { useNavigate } from 'react-router-dom';

const MainPage = () => {
    const navigate = useNavigate();

    const [userSkills, setUserSkills] = useState([]);

    const [userInformation, setUserInformation] = useState({});

    const [formVisible, setForm] = useState(false);

    const [noSkills, setNoSkills] = useState(false);

    const [userId, setUserId] = useState(null);

    const [skillData, setSkillData] = useState({
        name: "",
        proficiency: ""
    });
    
    const [profileData, setProfileData] = useState({
        FirstName:'',
        LastName:'',
        Description:'',
        Email:'',
        Role: '',
    })
    
    const [error, setError] = useState({
        description: ""
    });

    const handleOnChange = (type, name, value, regex) => {
        const setter = type == 'skill' ? setSkillData : setProfileData;
        const data = type == 'skill' ? skillData : profileData;
        setter({...data, [name]:value});
        const nullable_fields = ['proficiency', 'role', 'description', 'Description']

        if (regex) {
            if(!nullable_fields.includes(name) && value == ""){
                setError((prev) => ({
                    ...prev,
                    [name]: "This field is required."
                }));
            }
            // eliminate the error message if a nullable field is empty
            else if(nullable_fields.includes(name) && value == ""){
                setError((prev) => ({
                    ...prev,
                    [name]: ""
                }));
            } else {
                // emails require a different kind of error message 
                const isEmail = name === 'Email'; 
                const errorMessage = isEmail ? "Invalid email format." : "This field can only contain letters, numbers, spaces, and basic punctuation.";
                setError((prev) => ({
                    ...prev,
                    [name]: !regex.test(value) ? errorMessage : ""
                }));
            }
                
        } 
    };

    const toggleForm = () => {
        setForm(visible => !visible);
    }


    const addSkill = (event) => {
        // the value in project needs to explicitly be either one of these, spelled this way, and with ""
        // data.isproject = data.isproject == true ? "true" : "false";
        event.preventDefault();
        for (const key in error) {
            if (error.hasOwnProperty(key)) { 
                const value = error[key];
                if(value){
                    alert('Please fix errors before submitting.')
                    return;
                }
            }
        }
        

        createItemForUser("skills",userId, skillData).then(() => {
            alert("Skill successfully added! Please go to any other page without refreshing and back to see it updated.");
            setSkillData({name: "",
                proficiency: ""
            })
            setError({description: ""});
        }).catch((error)=>{
            console.log(error);
        });
    }

    const editSkill = (skillRecord) => {
        // skillData saves what the user typed in the form ; skillRecord saves the object directly from the db (it wasn't changed)
        const updated_record = {
            'name': skillData.name ? skillData.name : skillRecord.name,
            'proficiency': skillData.proficiency ? skillData.proficiency : skillRecord.proficiency,
        }

        for (const key in error) {
            if (error.hasOwnProperty(key)) { 
                const value = error[key];
                if(value){
                    alert('Please fix errors before submitting.')
                    return;
                }
            }
        }

        const skillId = `${userId}/${skillRecord.id}`;
        editItem("skills", skillId, updated_record).then((response) => {
            alert("Skill successfully updated! Please go to any other page without refreshing and back to see it updated.");
            setSkillData({name: "",
            proficiency: ""})
            setError({description: ""});
            return
        }).catch((error) => {
            console.log(error);
        });
    }

    const removeProfile = (profileRecordDB) => {
        // retrieve record directly from the db and only update the deleted attr

        const updated_profile = {
            'firstName': profileRecordDB.FirstName,
            'lastName': profileRecordDB.LastName,
            'description': profileRecordDB.Description,
            'email': profileRecordDB.Email,
            'role': profileRecordDB.Role,
            'deleted':'true',
        }
        // user logged out, shouldnt be able to login again
        editItem("users", userId, updated_profile).then((response) => {
            navigate('/login');
        }).catch((error) => {
            console.log(error);
        });
    }

    const updateProfile = (profileRecordDB) => {

        const updated_profile = {
            'firstName': profileData.FirstName ? profileData.FirstName : profileRecordDB.FirstName,
            'lastName': profileData.LastName ? profileData.LastName : profileRecordDB.LastName,
            'description': profileData.Description ? profileData.Description : profileRecordDB.Description,
            'email': profileData.Email ? profileData.Email : profileRecordDB.Email,
            'role':profileData.Role ?  profileData.Role : profileRecordDB.Role,
        }
        for (const key in error) {
            if (error.hasOwnProperty(key)) { 
                const value = error[key];
                if(value){
                    alert('Please fix errors before submitting.')
                    return;
                }
            }
        }

        editItem("users", userId, updated_profile).then((response) => {
            alert("Profile successfully updated! Please go to any other page without refreshing and back to see it updated.");
            setSkillData({FirstName:'',
            LastName:'',
            Description:'',
            Email:'',
            Role:''})
            setError({description: ""});
            return
        }).catch((error) => {
            console.log(error);
        });
    };

    // read up on renderUserEdu in Experience.jsx
    const updateSkill = (canEdit) => {

        const num_cols = canEdit ? 5 : 6;
        const edit_bg_color = '#e5f7e3';
        return (
            <div className='container'>
                {userSkills.map((record, index) => (
                    <div className='row' key={index}>
                        <div className={`col-sm-${num_cols} d-flex justify-content-center align-items-center text-white bg-primary separator`}>
                            <br></br>Skill: {record.name}<br></br><br></br>
                        </div>
                        <div className={`col-sm-${num_cols} text-start bg-secondary separator`}>
                            <br></br>Proficiency: {record.proficiency ? (<span> {record.proficiency} </span>) : <span>No proficiency level provided.</span>}<br></br><br></br>
                        </div>

                        {/* this is true if e're looking at the user's personal experience records */}
                        {canEdit ?
                        // col is defaulted to 2, since 12 - 10 is 2 when editing 
                        <div className="col-sm-2 d-flex flex-column justify-content-center align-items-center separator" style={{ backgroundColor: edit_bg_color }}>
                        <button className="btn btn-warning" data-bs-toggle="modal" data-bs-target={`#modal-edit-${record.id}`}>Edit</button>
                        <button className="btn btn-danger" data-bs-toggle="modal" data-bs-target={`#modal-${record.id}`}>Remove</button>

                        {/* deleing a skill record (click okay and remove) */}
                        <div className="modal fade" id={`modal-${record.id}`} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div className="modal-dialog">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h1 className="modal-title fs-5" id="exampleModalLabel">Remove selected experience record</h1>
                                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <div className="modal-body">
                                        Are you sure you want to remove this skill record?
                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                        <button type="button" className="btn btn-danger" data-bs-dismiss="modal" onClick={() => deleteSkill(record.id)}>Remove skill</button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* editing a skill record (click, pop un formulario y submit new info) */}
                        <div className="modal fade" id={`modal-edit-${record.id}`} tabIndex="-1" aria-labelledby="exampleModalEdit" aria-hidden="true">
                            <div className="modal-dialog">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h1 className="modal-title fs-5" id="exampleModalLabel">Edit selected skill record</h1>
                                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <div className="modal-body">
                                        {/* Are you sure you want to alter this skill? */}
                                        <form className="bg-info" id="addExpForm" onSubmit={(e) => { e.preventDefault(); setSkillData(record); editSkill(record); }} method="post">
                                        <label htmlFor="name">Skill name:<span class="text-danger">*</span></label>
                                        <input
                                            className='form-control'
                                            id="name"
                                            name="name"
                                            defaultValue={record.name}
                                            maxLength={100}
                                            style={{ width: "98%", margin: '0 1%' }}
                                            onChange={(e) => handleOnChange('skill', e.target.name, e.target.value, ALPHANUMERIC_REGEX)}
                                            required
                                        />{ error.name && 
                                            <span className="text-danger pb-2">{error.name}</span>
                                            }<br></br>
                                        <label htmlFor="proficiency">Proficiency:<span class="text-danger"></span></label>
                                        <input
                                            className='form-control'
                                            id="proficiency"
                                            name="proficiency"
                                            defaultValue={record.proficiency}
                                            maxLength={50}
                                            style={{ width: "98%", margin: '0 1%' }}
                                            onChange={(e) => handleOnChange('skill', e.target.name, e.target.value, ALPHANUMERIC_REGEX)}
                                        />{ error.proficiency && 
                                            <span className="text-danger pb-2">{error.proficiency}</span>
                                            }<br></br>
                                        </form>
                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-danger" data-bs-dismiss="modal">Close</button>
                                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={() => editSkill(record)}>Update skill record</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        </div>
                        : <div></div>}
                    </div>
                ))}
                
            </div>
        )
    }
    const getUserSkills = () => {
        // if i dont have this condition, an infinte loop wil be triggered in the api
        // wont let me render anything
        if(userSkills.length != 0){
            return
        } 
        let userRecords = userId ? userId : 200
        getItemById('skills', userRecords).then((result) =>{
            if(result.data.length > 0){
                // format data correctly (completely lowercase)
                const transformedData = result.data.map(item => {
                    return Object.keys(item).reduce((acc, key) => {
                        acc[key.toLowerCase()] = item[key];
                        return acc;
                    }, {});
                });
                setUserSkills(transformedData);
                return
            } else {
                setNoSkills(true);
                // throw new Error("no_tasks_found")
            }
        }).catch(error => {
            console.log(error);
        });
    };
    
    const renderUserInfo = () => {
        return (
            <div>
            <div className='row space-languages bg-info rounded'>
                <div className='col-sm-12'>
                    <h1>Personal Information</h1><br></br>
                   <h3>Name: {userInformation.FirstName} {userInformation.LastName}</h3><br></br>
                   <h3>Email: {userInformation.Email}</h3><br></br>
                   <h3>Role: {userInformation.Role}</h3><br></br><br></br>
                   <h2>About me:</h2><br></br>
                   <h3>{userInformation.Description}</h3>
                </div>
                <div className='col-sm-12 d-flex justify-content-end'>
                    <button className='btn btn-success me-5' data-bs-toggle="modal" data-bs-target={`#modal-edit-profile`}>Manage profile</button>
                    <button className='btn btn-danger' data-bs-toggle="modal" data-bs-target={`#modal-delete-profile`}>Delete profile</button>
                </div>
            </div>

            <br></br><br></br>
            <div className="modal fade" id={`modal-edit-profile`} tabIndex="-1" aria-labelledby="exampleModalEdit" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Edit profile information</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            {/* Edit profile information */}
                            <form className="bg-info" id="addExpForm" onSubmit={(e) => { e.preventDefault(); setProfileData(userInformation); updateProfile(userInformation); }} method="post">
                            <label htmlFor="FirstName">First Name:<span class="text-danger">*</span></label>
                            <input
                                className='form-control'
                                id="FirstName"
                                name="FirstName"
                                defaultValue={userInformation.FirstName}
                                maxLength={50}
                                style={{ width: "98%", margin: '0 1%' }}
                                onChange={(e) => handleOnChange('profile', e.target.name, e.target.value, ALPHANUMERIC_REGEX)}
                                required
                            />{ error.FirstName && 
                                            <span className="text-danger pb-2">{error.FirstName}</span>
                                            }<br></br>
                            <label htmlFor="LastName">Last Name:<span class="text-danger"></span></label>
                            <input
                                className='form-control'
                                id="LastName"
                                name="LastName"
                                defaultValue={userInformation.LastName}
                                maxLength={150}
                                style={{ width: "98%", margin: '0 1%' }}
                                onChange={(e) => handleOnChange('profile', e.target.name, e.target.value, ALPHANUMERIC_REGEX)}
                            required/>{ error.LastName && 
                                            <span className="text-danger pb-2">{error.LastName}</span>
                                            }<br></br>
                            <label htmlFor="Email">Email:<span class="text-danger">*</span></label>
                            <input
                                className='form-control'
                                id="Email"
                                name="Email"
                                type='email'
                                defaultValue={userInformation.Email}
                                maxLength={320}
                                style={{ width: "98%", margin: '0 1%' }}
                                onChange={(e) => handleOnChange('profile', e.target.name, e.target.value, EMAIL_REGEX)}
                            required/>{ error.Email && 
                                            <span className="text-danger pb-2">{error.Email}</span>
                                            }<br></br>
                            <label htmlFor="Role">Role:</label>
                            <select
                                className='form-control'
                                id="Role"
                                name="Role"
                                onChange={(e) => handleOnChange('profiel', e.target.name, e.target.value)}
                                style={{ width: "98%", margin: '0 1%' }}
                            >
                                <option value="">No Role</option>
                                <option value="Admin">Admin</option>
                                <option value="Supervisor">Supervisor</option>
                                <option value="User">User</option>
                            </select>
                            <label htmlFor="Description">Description:<span class="text-danger"></span></label>
                            <input
                                className='form-control'
                                id="Description"
                                name="Description"
                                defaultValue={userInformation.Description}
                                maxLength={500}
                                style={{ width: "98%", margin: '0 1%' }}
                                onChange={(e) => handleOnChange('profile', e.target.name, e.target.value, ALPHANUMERIC_REGEX)}
                            />{ error.description && 
                                            <span className="text-danger pb-2">{error.description}</span>
                                            }<br></br>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-danger" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={() => updateProfile(userInformation)}>Update profile</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="modal fade" id={`modal-delete-profile`} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Remove selected experience record</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            Are you sure you want to delete your profile?
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-danger" data-bs-dismiss="modal" onClick={() => removeProfile(userInformation)}>Delete profile</button>
                        </div>
                    </div>
                </div>
            </div>
            </div>
        )
    }
    // read up on RenderCreationForms in Experience.jsx
    const renderSkills = (canEdit) => {
        return (
            // ----------------- 1) button and form. form visibility is toggled by the button -----------------------------
            <div>
            {canEdit ? (
                <>
                    <div>
                        <div className='row justify-content-center'>
                            <div className='col-sm-12 d-flex justify-content-center'>
                                <button
                                    style={{ width: "80%", height: "100%" }}
                                    onClick={toggleForm}
                                    className="btn btn-success d-flex align-items-center justify-content-center">
                                    Add new skill record
                                </button>
                            </div>
                        </div>
                        <br />

                        {/* Skill Form */}
                        <div className="newSkill" id="newSkill" style={{ display: formVisible ? 'block' : 'none' }}>
                            <form className="bg-info" id="addSkillForm" onSubmit={addSkill} method="post">
                                <label htmlFor="name">Skill name:<span class="text-danger">*</span></label>
                                <input
                                    className='form-control'
                                    id="name"
                                    name="name"
                                    value={skillData.name}
                                    maxLength={100}
                                    style={{ width: "98%", margin: '0 1%' }}
                                    onChange={(e) => handleOnChange('skill', e.target.name, e.target.value, ALPHANUMERIC_REGEX)}
                                    required
                                />{ error.name && 
                                            <span className="text-danger pb-2">{error.name}</span>
                                            }<br></br>
                                <label htmlFor="proficiency">Proficiency:<span class="text-danger"></span></label>
                                <input
                                    className='form-control'
                                    id="proficiency"
                                    name="proficiency"
                                    value={skillData.proficiency}
                                    maxLength={50}
                                    style={{ width: "98%", margin: '0 1%' }}
                                    onChange={(e) => handleOnChange('skill', e.target.name, e.target.value, ALPHANUMERIC_REGEX)}
                                />{ error.proficiency && 
                                            <span className="text-danger pb-2">{error.proficiency}</span>
                                            }<br></br>
                                <div className="text-end">
                                    <button type="submit" className="btn btn-success mt-2" style={{ margin: '0 1%' }}>Submit</button>
                                </div>
                                <br />
                            </form>
                        </div>
                        <br />
                    </div>
                </> ) : ( <div></div> )}

                {/* ------------------------ section 1) ends ------------------------------------ */}
                {/* ----------------------------- section 2) starts --------------------------------------- */}
                {getUserSkills()}
                <h1>My skill records</h1>
                <br></br>
                { noSkills ? ( <span> <h2>There are no skills to show. </h2></span>) : updateSkill(canEdit) }
                <br></br>

            </div>
            
        ); 
    }; 

    const deleteSkill = (skill_id) => {
        const skillRecord = `${userId}/${skill_id}`
        deleteItem('skills', skillRecord).then((result) => {
            alert(`Skill successfully deleted! Please go to any other page without refreshing and back to see it updated.`);
        }).catch(error => {
            console.log(error)
        });
    };

    const getUserInfo = () => {
        if (!userId) return; // dont display any personal info if not logged in
        // actually i cant do this, the user table needs to verify that youre in first 
        getItemById('users', userId)
            .then((result) => {
                if (result.data) {
                    setUserInformation(result.data);
                }
            })
            .catch((error) => {
                console.error("Error fetching user info:", error);
            });
    };
        
    const getUser = async () => {
        getItems("users/curr").then((response) => {
            setUserId(response.data.Id);
        }).catch((error)=>{
            console.log(error);
        });
    };


    useEffect(() => { 
     getUser();
    }, []); 
    useEffect(() => {
        getUserInfo();
    }, [userId]);

    return (
        <div className='space-navbar'> 
            <div className='row space-languages'>
                <div className='col-sm-12'>
                    <h1>Welcome to my profile :3 </h1>
                </div>
            </div>
            <img src="/puter.jpg" className='img-fluid'></img>
            <br></br><br></br>
            {userId ? ( <> {renderUserInfo()} {renderSkills(true)} </>)  : renderSkills(false)}
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