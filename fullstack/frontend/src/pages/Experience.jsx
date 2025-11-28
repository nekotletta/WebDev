import React, { useEffect, useState } from 'react';
import '../styles/profile.css';
import { ALPHANUMERIC_REGEX } from "../constants/constants";
import '../styles/profile.css';
import { getItems, getItemById, createItemForUser, editItem, deleteItem } from '../services/api';
// to make date selction in the experience record easier
// source: https://flatpickr.js.org/examples/
import Flatpickr from 'react-flatpickr';
import 'flatpickr/dist/flatpickr.css';

const Experience = () => {
    // all of the user's experience and eucation records, pulled from the db
    const [userExperience, setUserExp] = useState([]);
    const [userEducation, setUserEdu] = useState([]);
    // retrieve degrees from the db to construct a dropdown with any degree
    const [degrees, setDegrees] = useState([]);
    // forms to add experience and education records to a user
    const [formVisible, setForm] = useState(false);
    const [eduFormVisible, setEduForm] = useState(false);

    // indicate that the user has no skills, instead of throwing an error
    const [noExp, setNoExp] = useState(false);
    const [noEdu, setNoEdu] = useState(false);
    // retrieve id from jwt
    const [userId, setUserId] = useState(null);

    const [data, setData] = useState({
        jobtitle: "",
        company: "",
        description: "",
        startdate: null,
        enddate: null,
        isproject: false
    });

    const [eduData, setEduData] = useState({
        institution: "",
        degreeid: -1,
        fieldofstudy: "",
        startdate: null,
        enddate: null
    });

      
    const [error, setError] = useState({
        description: ""
    });

    const handleOnChange = (dataType, name, value, regex) => {
        // we dont want nullable fields to display a message saying the field is required if empty
        // i know html has this, but i wanted to add it for consistency
        const nullable_fields = ['fieldofstudy', 'description', 'company', 'proficiency']
        if(dataType == 'experience'){
            setData({...data, [name]:value});
        } else {
            setEduData({...eduData, [name]:value});
        }
        
        if (regex) {
            if(!nullable_fields.includes(name) && value == ""){
                setError((prev) => ({
                    ...prev,
                    [name]: "This field is required."
                }));
            }
            // eliminate the required field error message if a nullable field is empty
            else if(nullable_fields.includes(name) && value == ""){
                setError((prev) => ({
                    ...prev,
                    [name]: ""
                }));
            } else {
                setError((prev) => ({
                    ...prev,
                    [name]: !regex.test(value) ? "This field can only contain letters, numbers, spaces, and basic punctuation." : ""
                }));
            }
                
        } 
        
    };
    // open and close form buttons
    const toggleForm = () => {
        setForm(visible => !visible);
    }
    const toggleEduForm = () => {
        setEduForm(visible => !visible);
    }

    const addEdu = (event) => {
        // degreeid can be null in the table. -1 is the default value
        eduData.degreeid = eduData.degreeid == -1 ? null : eduData.degreeid;
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
        // when updating records, it wont be updated imediately because of the condition set in the RenderCreationForms function
        // which checks that there are no records displaying beforehand, to avoid triggering an infinite loop in the api,
        // as react is rendering in every update
        createItemForUser("education",userId, eduData).then(() => {
            alert("Education recird successfully added! Please go to any other page without refreshing and back to see it updated.");
            setEduData({institution: "",
            degreeid: -1,
            fieldofstudy: "",
            startdate: "",
            enddate: ""})
            setError({description: ""});
        }).catch((error)=>{
            console.log(error);
        });
    }

    const addExp = (event) => {
        // the value in project needs to explicitly be either one of these, spelled this way, and with ""
        data.isproject = data.isproject == true ? "true" : "false";
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

        createItemForUser("experience",userId, data).then(() => {
            alert("Experience successfully added! Please go to any other page without refreshing and back to see it updated.");
            setData({jobtitle: "",
                company: "",
                description: "",
                startdate: "",
                enddate: "",
                isproject: ""})
            setError({description: ""});
        }).catch((error)=>{
            console.log(error);
        });
    }

    const editEdu = (eduRecord) => {
        // eduData saves what the user typed in the form ; eduRecord saves the object directly from the db (it wasn't changed)
        console.log(eduData.degreeid)
        console.log(eduRecord.degreeid)
        const updated_record = {
            'institution': eduData.institution ? eduData.institution : eduRecord.institution,
            // -1 is not a valid id in our database, so we need to get rid of it
            // did the user click no degree?        is the field already empty?         the user chose a degree     is it the same one as the one in the the db? update accordingly
            'degreeid': eduData.degreeid == -1 ? (eduRecord.degreeid == null ?  null : eduData.degreeid) : eduRecord.degreeid == eduData.degreeid ? eduRecord.degreeid : eduData.degreeid,
            'fieldofstudy': eduData.fieldofstudy ? eduData.fieldofstudy : eduRecord.fieldofstudy,
            'startdate': eduData.startdate ? eduData.startdate : eduRecord.startdate,
            'enddate': eduData.enddate ? eduData.enddate : eduRecord.enddate,
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


        const eduId = `${userId}/${eduRecord.id}`;
        editItem("education", eduId, updated_record).then((response) => {
            alert("Experience successfully updated! Please go to any other page without refreshing and back to see it updated.");
            setEduData({institution: "",
            degreeid: -1,
            fieldofstudy: "",
            startdate: "",
            enddate: ""})
            setError({description: ""});
            return
        }).catch((error) => {
            console.log(error);
        });
    }

    const editExp = (expRecord) => {
        expRecord.isproject = expRecord.isproject == true ? 'true' : 'false';
        data.isproject = data.isproject == true ? 'true' : 'false';
        // data saves what the user typed in the form ; expRecord saves the object directly from the db (it wasn't changed)
        const updated_record = {
            'jobtitle': data.jobtitle ? data.jobtitle : expRecord.jobtitle,
            'company': data.company ? data.company : expRecord.company,
            'description': data.description ? data.description : expRecord.description,
            'startdate': data.startdate ? data.startdate : expRecord.startdate,
            'enddate': data.enddate ? data.enddate : expRecord.enddate,
            'isproject': data.isproject ? data.isproject : expRecord.isproject,
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


        const expId = `${userId}/${expRecord.id}`;
        editItem("experience", expId, updated_record).then((response) => {
            alert("Experience successfully updated! Please go to any other page without refreshing and back to see it updated.");
            setData({jobtitle: "",
                company: "",
                description: "",
                startdate: "",
                enddate: "",
                isproject: ""})
            setError({description: ""});
            return
        }).catch((error) => {
            console.log(error);
        });
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

    const getDegrees = () => {
        getItems("degrees").then((response) => {
            if(response.data.length > 0){
                setDegrees(response.data);
            } else {
            throw new Error("no_degrees_found")
            }
        }).catch(error => {
            console.log(error);
        });
    };

    // function to set up the actual education records, ie, the user info that is visible to everyone
    // regardless of whether youre logged in or not
    const renderUserEdu = (canEdit) => {

        // we want the user's experiences to be 12-columns, regardless of logged in or not, to not mess anything up
        // the user is presented with edit / delete option in a thrid column, but only if theyre logged in
        // we want to have a third color to differentiate the experience record from the editing and deleting actions visually
        const num_cols = canEdit ? 5 : 6;
        const edit_bg_color = '#e5f7e3';
        return (
            <div className='container'>
                {userEducation.map((record, index) => (
                    <div className='row' key={index}>
                         <div className={`col-sm-${num_cols} d-flex justify-content-center align-items-center text-white bg-primary separator`}>
                            Institution: {record.institution}<br></br>
                            Field of study: {record.fieldofstudy}<br></br>
                            

                        </div>
                        <div className={`col-sm-${num_cols} text-start bg-secondary separator`}>
                            Degree: {degrees[record.degreeid] ? degrees[record.degreeid-1].Name : ''}<br></br>
                            Dates studying: <br></br> {record.startdate ? (
                            record.enddate ? (
                                <span> {record.startdate.slice(0, 10)} - {record.enddate.slice(0, 10)}<br /> </span>
                            ) : ( // case that the user didn't provide an end date. we assume the job is still ongoing
                                <span> {record.startdate.slice(0, 10)} - Present<br /> </span>
                            ) // the user didn't provide a start date. this is invalid, even if the user provided an end date for it 
                            ) : ( <span>Date not provided.</span> )}<br></br>

                        </div>

                        {/* this is true if e're looking at the user's personal experience records */}
                        {canEdit ?
                        // col is defaulted to 2, since 12 - 10 is 2 when editing 
                        <div className="col-sm-2 d-flex flex-column justify-content-center align-items-center separator" style={{ backgroundColor: edit_bg_color }}>
                        <button className="btn btn-warning" data-bs-toggle="modal" data-bs-target={`#modal-edu-edit-${record.id}`}>Edit</button>
                        <button className="btn btn-danger" data-bs-toggle="modal" data-bs-target={`#modal-edu-${record.id}`}>Remove</button>

                        {/* deleing an experience record (click okay and remove) */}
                        <div className="modal fade" id={`modal-edu-${record.id}`} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div className="modal-dialog">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h1 className="modal-title fs-5" id="exampleModalLabel">Remove selected education record</h1>
                                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <div className="modal-body">
                                        Are you sure you want to remove this education record?
                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                        <button type="button" className="btn btn-danger" data-bs-dismiss="modal" onClick={() => deleteExp('education', record.id)}>Remove education</button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* editing an education record (click, pop un formulario y submit new info) */}
                        <div className="modal fade" id={`modal-edu-edit-${record.id}`} tabIndex="-1" aria-labelledby="exampleModalEdit" aria-hidden="true">
                            <div className="modal-dialog">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h1 className="modal-title fs-5" id="exampleModalLabel">Edit selected education record</h1>
                                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <div className="modal-body">
                                        {/* Are you sure you want to alter this experience? */}
                                        <form className="bg-info" id="addExpForm" onSubmit={(e) => { e.preventDefault(); setEduData(record); editEdu(record); }} method="post">
                                        <label htmlFor="institution">Institution<span class="text-danger">*</span></label>
                                        <input
                                            className='form-control'
                                            id="institution"
                                            name="institution"
                                            defaultValue={record.institution}
                                            maxLength={150}
                                            style={{ width: "98%", margin: '0 1%' }}
                                            onChange={(e) => handleOnChange('education', e.target.name, e.target.value, ALPHANUMERIC_REGEX)}
                                            required
                                        /> { error.institution && 
                                            <span className="text-danger pb-2">{error.institution}</span>
                                            }<br></br>
                                        <label htmlFor="fieldofstudy">Field of study:<span class="text-danger"></span></label>
                                        <input
                                            className='form-control'
                                            id="fieldofstudy"
                                            name="fieldofstudy"
                                            defaultValue={record.fieldofstudy}
                                            maxLength={150}
                                            style={{ width: "98%", margin: '0 1%' }}
                                            onChange={(e) => handleOnChange('education', e.target.name, e.target.value, ALPHANUMERIC_REGEX)}
                                        />{ error.fieldofstudy && 
                                            <span className="text-danger pb-2">{error.fieldofstudy}</span>
                                            }<br></br>

                                        <label htmlFor="degreeid">Degree:</label>
                                        <select
                                        className='form-control'
                                        id="degreeid"
                                        name="degreeid"
                                        defaultValue={record.degreeid || "-1"}
                                        style={{ width: "98%", margin: '0 1%' }}
                                        onChange={(e) => handleOnChange('education', e.target.name, e.target.value)}>
                                        <option value="-1">No degree</option>
                                        {degrees.map(degree => (
                                            <option key={degree.Id} value={degree.Id}>
                                                {degree.Name}
                                            </option>
                                        ))}
                                        
                                    </select>
                                        <label htmlFor="startdate">Start Date:</label>
                                        <Flatpickr
                                            className='form-control'
                                            id="startdate"
                                            name="startdate"
                                            defaultValue={record.startdate}
                                            options={{ dateFormat: "Y-m-d" }}
                                            style={{ width: "98%", margin: '0 1%' }}
                                            onChange={(e) => handleOnChange('education', "startdate", e[0])}
                                        />
                                        <label htmlFor="enddate">End Date:</label>
                                        <Flatpickr
                                            className='form-control'
                                            id="enddate"
                                            name="enddate"
                                            defaultValue={record.enddate}
                                            options={{ dateFormat: "Y-m-d" }}
                                            style={{ width: "98%", margin: '0 1%' }}
                                            onChange={(e) => handleOnChange('education', "enddate", e[0])}
                                        />
                                        <br />
                                        </form>
                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-danger" data-bs-dismiss="modal">Close</button>
                                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={() => editEdu(record)}>Update education record</button>
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
    };

    // read renderUserEdu for info. this is the same thing, but for expereince records
    const renderUserExp = (canEdit) => {

        const num_cols = canEdit ? 5 : 6;
        const edit_bg_color = '#e5f7e3';
        return (
            <div className='container'>
                {userExperience.map((record, index) => (
                    <div className='row' key={index}>
                         <div className={`col-sm-${num_cols} d-flex justify-content-center align-items-center text-white bg-primary separator`}>
                            Job title: {record.jobtitle}<br></br>
                            Company: {record.company}<br></br>

                        </div>
                        <div className={`col-sm-${num_cols} text-start bg-secondary separator`}>
                            Description: {record.description}<br></br>
                            Dates active: <br></br> {record.startdate ? (
                            // the date object from the database is datetime. we can safely extract the first 10 characters, as it'll have that length,
                            // even when the dates or months are one-digit numbers.

                            // both of the start and end date are potentially nullable. base case being that both are filled
                            record.enddate ? (
                                <span> {record.startdate.slice(0, 10)} - {record.enddate.slice(0, 10)}<br /> </span>
                            ) : ( // case that the user didn't provide an end date. we assume the job is still ongoing
                                <span> {record.startdate.slice(0, 10)} - Present<br /> </span>
                            ) // the user didn't provide a start date. this is invalid, even if the user provided an end date for it 
                            ) : ( <span>Date not provided.</span> )}<br></br>

                            {/* distinguishing between a project, job/internship, or course */}
                            {record.isproject ? ( <span>This is a personal project.</span> )  : record.company ?
                            ( <span>This is work or internship experience.</span> ) : ( <span>This is a course.</span> )}
                        </div>

                        {/* this is true if e're looking at the user's personal experience records */}
                        {canEdit ?
                        // col is defaulted to 2, since 12 - 10 is 2 when editing 
                        <div className="col-sm-2 d-flex flex-column justify-content-center align-items-center separator" style={{ backgroundColor: edit_bg_color }}>
                        <button className="btn btn-warning" data-bs-toggle="modal" data-bs-target={`#modal-edit-${record.id}`}>Edit</button>
                        <button className="btn btn-danger" data-bs-toggle="modal" data-bs-target={`#modal-${record.id}`}>Remove</button>

                        {/* deleing an experience record (click okay and remove) */}
                        <div className="modal fade" id={`modal-${record.id}`} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div className="modal-dialog">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h1 className="modal-title fs-5" id="exampleModalLabel">Remove selected experience record</h1>
                                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <div className="modal-body">
                                        Are you sure you want to remove this experience?
                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                        <button type="button" className="btn btn-danger" data-bs-dismiss="modal" onClick={() => deleteExp('experience', record.id)}>Remove experience</button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* editing an experience record (click, pop un formulario y submit new info) */}
                        <div className="modal fade" id={`modal-edit-${record.id}`} tabIndex="-1" aria-labelledby="exampleModalEdit" aria-hidden="true">
                            <div className="modal-dialog">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h1 className="modal-title fs-5" id="exampleModalLabel">Edit selected experience record</h1>
                                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <div className="modal-body">
                                        {/* Are you sure you want to alter this experience? */}
                                        <form className="bg-info" id="addExpForm" onSubmit={(e) => { e.preventDefault(); setData(record); editExp(record); }} method="post">
                                        <label htmlFor="jobtitle">Job Title:<span class="text-danger">*</span></label>
                                        <input
                                            className='form-control'
                                            id="jobtitle"
                                            name="jobtitle"
                                            defaultValue={record.jobtitle}
                                            maxLength={100}
                                            style={{ width: "98%", margin: '0 1%' }}
                                            onChange={(e) => handleOnChange('experience', e.target.name, e.target.value, ALPHANUMERIC_REGEX)}
                                            required
                                        /> { error.jobtitle && 
                                            <span className="text-danger pb-2">{error.jobtitle}</span>
                                            }<br></br>
                                        <label htmlFor="company">Company:<span class="text-danger"></span></label>
                                        <input
                                            className='form-control'
                                            id="company"
                                            name="company"
                                            defaultValue={record.company}
                                            maxLength={100}
                                            style={{ width: "98%", margin: '0 1%' }}
                                            onChange={(e) => handleOnChange('experience', e.target.name, e.target.value, ALPHANUMERIC_REGEX)}
                                        /> { error.company && 
                                            <span className="text-danger pb-2">{error.company}</span>
                                            }<br></br>
                                        <label htmlFor="description">Description:<span class="text-danger"></span></label>
                                        <input
                                            className='form-control'
                                            id="description"
                                            name="description"
                                            defaultValue={record.description}
                                            style={{ width: "98%", margin: '1%' }}
                                            onChange={(e) => handleOnChange('experience', e.target.name, e.target.value, ALPHANUMERIC_REGEX)}
                                        /> { error.description && 
                                            <span className="text-danger pb-2">{error.description}</span>
                                            }<br></br>
                                        <label htmlFor="startdate">Start Date:</label>
                                        <Flatpickr
                                            className='form-control'
                                            id="startdate"
                                            name="startdate"
                                            defaultValue={record.startdate}
                                            options={{ dateFormat: "Y-m-d" }}
                                            style={{ width: "98%", margin: '0 1%' }}
                                            onChange={(e) => handleOnChange('experience', "startdate", e[0])}
                                        />
                                        <label htmlFor="enddate">End Date:</label>
                                        <Flatpickr
                                            className='form-control'
                                            id="enddate"
                                            name="enddate"
                                            defaultValue={record.enddate}
                                            options={{ dateFormat: "Y-m-d" }}
                                            style={{ width: "98%", margin: '0 1%' }}
                                            onChange={(e) => handleOnChange('experience',"enddate", e[0])}
                                        />
                                        <label htmlFor="isproject">Personal Project</label>
                                        <input
                                            id="isproject"
                                            name="isproject"
                                            type="checkbox"
                                            checked={record.isproject}
                                            onChange={(e) => handleOnChange('experience', e.target.name, e.target.checked)}
                                        />
                                        </form>
                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-danger" data-bs-dismiss="modal">Close</button>
                                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={() => editExp(record)}>Update experience record</button>
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

    // resource: am i getting the education or the expereince endpoint
    const getUserExp = (resource) => {
        // if i dont have this condition, an infinte loop wil be triggered in the api
        // wont let me render anything
        if(userExperience.length != 0){
            return
        } if(userEducation.length !=0){
            return
        }
        const setter = (resource == 'experience' ? setUserExp : setUserEdu);
        const noRecordSetter = (resource == 'experience') ? setNoExp : setNoEdu
        let userRecords = userId ? userId : 200

        getItemById(resource, userRecords).then((result) =>{
            if(result.data.length > 0){
                // format data correctly
                const transformedData = result.data.map(item => {
                    return Object.keys(item).reduce((acc, key) => {
                        acc[key.toLowerCase()] = item[key];
                        return acc;
                    }, {});
                });
                setter(transformedData);
            } else {
                noRecordSetter(true);
            }
        }).catch(error => {
            console.log(error);
        });
    };

    // function to set up the creating new records forms (if aplicable), and retrieve the user's experience and education (also if applicable)
    // if the user is logged in, we want to do the following:
    // 1) have a button, along with a form so that the user can add nex expereince records for himself
    // 2) have a section that is all of this user's records grouped together. this is because these records can be edited and deleted.
    //    having all my records in the same place makes it much easier and cleaner to edit
    const RenderCreationForms = (canEdit) => {
        

        return (
            // ----------------- 1) button and form. form visibility is toggled by the button -----------------------------
            <div>
            {canEdit ? (
                <>
                    <div>
                        <div className='row'>
                            <div className='col-sm-12 d-flex-column justify-content-center align-items-center'>
                                <button
                                    style={{ width: "100%", height: "40%" }}
                                    onClick={toggleForm}
                                    className="btn btn-success d-flex align-items-center justify-content-center">
                                    Add new experience record
                                </button>
                                <br />
                                <button
                                    style={{ width: "100%", height: "40%" }}
                                    onClick={toggleEduForm}
                                    className="btn btn-success d-flex align-items-center justify-content-center">
                                    Add new education record
                                </button>
                            </div>
                        </div>
                        <br />

                        {/* Experience Form */}
                        <div className="newExp" id="newExp" style={{ display: formVisible ? 'block' : 'none' }}>
                            <form className="bg-info" id="addExpForm" onSubmit={addExp} method="post">
                                <label htmlFor="jobtitle">Job Title:<span class="text-danger">*</span></label>
                                <input
                                    className='form-control'
                                    id="jobtitle"
                                    name="jobtitle"
                                    value={data.jobtitle}
                                    maxLength={100}
                                    style={{ width: "98%", margin: '0 1%' }}
                                    onChange={(e) => handleOnChange('experience', e.target.name, e.target.value, ALPHANUMERIC_REGEX)}
                                    required
                                />{ error.jobtitle && 
                                            <span className="text-danger pb-2">{error.jobtitle}</span>
                                            }<br></br>
                                <label htmlFor="company">Company:<span class="text-danger"></span></label>
                                <input
                                    className='form-control'
                                    id="company"
                                    name="company"
                                    value={data.company}
                                    maxLength={100}
                                    style={{ width: "98%", margin: '0 1%' }}
                                    onChange={(e) => handleOnChange('experience', e.target.name, e.target.value, ALPHANUMERIC_REGEX)}
                                />{ error.company && 
                                            <span className="text-danger pb-2">{error.company}</span>
                                            }<br></br>
                                <label htmlFor="description">Description:<span class="text-danger"></span></label>
                                <input
                                    className='form-control'
                                    id="description"
                                    name="description"
                                    value={data.description}
                                    style={{ width: "98%", margin: '1%' }}
                                    onChange={(e) => handleOnChange('experience', e.target.name, e.target.value, ALPHANUMERIC_REGEX)}
                                />{ error.description && 
                                            <span className="text-danger pb-2">{error.description}</span>
                                            }<br></br>
                                <label htmlFor="startdate">Start Date:</label>
                                <Flatpickr
                                    className='form-control'
                                    id="startdate"
                                    name="startdate"
                                    value={data.startdate}
                                    options={{ dateFormat: "Y-m-d" }}
                                    style={{ width: "98%", margin: '0 1%' }}
                                    onChange={(e) => handleOnChange('experience', "startdate", e[0])}
                                />
                                <label htmlFor="enddate">End Date:</label>
                                <Flatpickr
                                    className='form-control'
                                    id="enddate"
                                    name="enddate"
                                    value={data.enddate}
                                    options={{ dateFormat: "Y-m-d" }}
                                    style={{ width: "98%", margin: '0 1%' }}
                                    onChange={(e) => handleOnChange('experience', "enddate", e[0])}
                                />
                                <label htmlFor="isproject">Personal Project</label>
                                <input
                                    id="isproject"
                                    name="isproject"
                                    type="checkbox"
                                    checked={data.isproject}
                                    onChange={(e) => handleOnChange('experience', e.target.name, e.target.checked)}
                                />
                                <div className="text-end">
                                    <button type="submit" className="btn btn-success mt-2" style={{ margin: '0 1%' }}>Submit</button>
                                </div>
                                <br />
                            </form>
                        </div>

                        {/* Education Form */}
                        <div className="newEdu" id="newEdu" style={{ display: eduFormVisible ? 'block' : 'none' }}>
                            <form className="bg-info" id="addEduForm" onSubmit={addEdu} method="post">
                                <label htmlFor="institution">Institution:<span class="text-danger">*</span></label>
                                <input
                                    className='form-control'
                                    id="institution"
                                    name="institution"
                                    value={eduData.institution}
                                    maxLength={150}
                                    style={{ width: "98%", margin: '0 1%' }}
                                    onChange={(e) => handleOnChange('education', e.target.name, e.target.value, ALPHANUMERIC_REGEX)}
                                    required
                                /> { error.institution && 
                                            <span className="text-danger pb-2">{error.institution}</span>
                                            }<br></br>
                                <label htmlFor="fieldofstudy">Field of study:<span class="text-danger"></span></label>
                                <input
                                    className='form-control'
                                    id="fieldofstudy"
                                    name="fieldofstudy"
                                    value={eduData.fieldofstudy}
                                    maxLength={150}
                                    style={{ width: "98%", margin: '0 1%' }}
                                    onChange={(e) => handleOnChange('education', e.target.name, e.target.value, ALPHANUMERIC_REGEX)}
                                /> { error.fieldofstudy && 
                                            <span className="text-danger pb-2">{error.fieldofstudy}</span>
                                            }<br></br>
                                <label htmlFor="degreeid">Degree:</label>
                                <select
                                    className='form-control'
                                    id="degreeid"
                                    name="degreeid"
                                    value={eduData.degreeid} 
                                    style={{ width: "98%", margin: '0 1%' }}
                                    onChange={(e) => handleOnChange('education', e.target.name, e.target.value)}>
                                    <option value="-1">No degree</option> 
                                    {degrees.map(degree => (
                                        <option key={degree.Id} value={degree.Id}>
                                            {degree.Name}
                                        </option>
                                    ))}
                                </select>
                                <label htmlFor="startdateEdu">Start Date:</label>
                                <Flatpickr
                                    className='form-control'
                                    id="startdateEdu"
                                    name="startdate"
                                    value={eduData.startdate}
                                    options={{ dateFormat: "Y-m-d" }}
                                    style={{ width: "98%", margin: '0 1%' }}
                                    onChange={(e) => handleOnChange('education', "startdate", e[0])}
                                />
                                <label htmlFor="enddateEdu">End Date:</label>
                                <Flatpickr
                                    className='form-control'
                                    id="enddateEdu"
                                    name="enddate"
                                    value={eduData.enddate}
                                    options={{ dateFormat: "Y-m-d" }}
                                    style={{ width: "98%", margin: '0 1%' }}
                                    onChange={(e) => handleOnChange('education', "enddate", e[0])}
                                />
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
                {getUserExp('experience')}
                {getUserExp('education')}

                <h1>My experience records</h1>
                <br></br>
                {noExp ? ( <span><h2>There is no experience registered.</h2></span> ) : renderUserExp(canEdit)}
                <br></br>
                <h1>My education records</h1>
                <br></br>
                {noEdu ? ( <span><h2>There is no eduaction registered.</h2></span> ) : renderUserEdu(canEdit)}

            </div>
           
        ); 
    }; 

     const deleteExp = (table, exp_id) => {
        const expRecord = `${userId}/${exp_id}`
        deleteItem(table, expRecord).then((result) => {
            alert(`${table} successfully deleted! Please go to any other page without refreshing and back to see it updated.`);
        }).catch(error => {
            console.log(error)
        });
    };

    useEffect(() => { 
        getUser();
    }, []);
    useEffect(() => { 
        getDegrees();
    }, []); 

    return (
        <div className='space-navbar'> 

            <h1>Experience</h1>
            <br></br>
            {/* check if a user is logged in. if not, hide the add-experience button, along with the form */}
            {userId ? RenderCreationForms(true) :  RenderCreationForms(false) }
        </div>
        
    )
};

export default Experience;