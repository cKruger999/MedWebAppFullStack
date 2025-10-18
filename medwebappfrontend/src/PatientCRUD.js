import React,{useState, useEffect, Fragment} from 'react';
import Table from 'react-bootstrap/Table';
import 'bootstrap/dist/css/bootstrap.css';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate} from 'react-router-dom';
import { Container, Col } from 'react-bootstrap';

const  MedApp = () =>
{
    const navigate = useNavigate();
    const [showEdit, setShowEdit] = useState(false);

    const handleCloseEdit = () => setShowEdit(false);
    const handleShowEdit = () => setShowEdit(true);
    
    const [showAdd, setShowAdd] = useState(false);

    const handleCloseAdd = () => setShowAdd(false);
    const handleShowAdd = () => setShowAdd(true);

    const[patientName, setPatientName] = useState('');
    const[patientSurname, setPatientSurname] = useState('');
    const[patientUsername, setPatientUsername] = useState('');
    const[gender, setGender] = useState('');
    const[homeAddress, setHomeAddress] = useState('');
    const[emailAddress, setEmailAddress] = useState('');
    const[phoneNumber, setPhoneNumber] = useState('');
    const[hasMedicalAid, setHasMedicalAid] = useState('');
    const[medicalAidCompany, setMedicalAidCompany] = useState('');

    const[editPatientID, setEditPatientID] = useState('');
    const[editPatientName, setEditPatientName] = useState('');
    const[editPatientUsername, setEditPatientUsername] = useState('');
    const[editPatientSurname, setEditPatientSurname] = useState('');
    const[editGender, setEditGender] = useState('');
    const[editHomeAddress, setEditHomeAddress] = useState('');
    const[editEmailAddress, setEditEmailAddress] = useState('');
    const[editPhoneNumber, setEditPhoneNumber] = useState('');
    const[editHasMedicalAid, setEditHasMedicalAid] = useState('');
    const[editMedicalAidCompany, setEditMedicalAidCompany] = useState('');

    const [searchTerm, setSearchTerm] = useState("");
    const [patients, setPatients] = useState([]);
    
    const [token, setToken] = useState([]);
    
    useEffect(() =>
    {
        setToken(localStorage.getItem("token"))
        getPatientData();
    },[])

    const getPatientData = () =>
    {
        const token = localStorage.getItem('token');
        axios.get('https://localhost:7108/api/Patient/GetPatients',{
        headers: {
            Authorization: `Bearer ${token}`
        }
        })
        .then((result) =>
        {setPatients(result.data)})
        .catch((error)=>{
            console.log(error)})
    }

    const handleSave = () =>
    {
        const url = 'https://localhost:7108/api/Patient/AddPatient';
        const data = {
            "patientName": patientName,
            "patientSurname": patientSurname,
            "patientUsername": patientUsername,
            "gender": gender,
            "homeAddress": homeAddress,
            "emailAddress": emailAddress,
            "phoneNumber": phoneNumber,
            "hasMedicalAid": hasMedicalAid,
            "medicalAidCompany": medicalAidCompany
        }
        axios.post(url, data, 
        {   headers: {
            Authorization: `Bearer ${token}`
        }
        })
        .then((result)=>{
            getPatientData() 
            clear();
            toast.success('Patient Successfully Added!');
        })
    }

    const clear = () =>
    {
        setPatientName('');
        setPatientSurname('');
        setPatientUsername('');
        setGender('');
        setHomeAddress('');
        setEmailAddress('');
        setPhoneNumber('');
        setHasMedicalAid('');
        setMedicalAidCompany('');
        
        setEditPatientID('');
        setEditPatientName('');
        setEditPatientSurname('');
        setEditPatientUsername('');
        setEditGender('');
        setEditHomeAddress('');
        setEditEmailAddress('');
        setEditPhoneNumber('');
        setEditHasMedicalAid('');
        setEditMedicalAidCompany('');
    }
    const handleAdd = () =>
    {
        handleShowAdd();
    }
    const handleEdit = (id) =>
    {
        //alert(id);
        handleShowEdit();
        axios.get('https://localhost:7108/api/Patient/GetPatient/' + id,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        )
        .then((result) =>
        {
            setEditPatientID(result.data.patientId)
            setEditPatientName(result.data.patientName);
            setEditPatientSurname(result.data.patientSurname);
            setEditPatientUsername(result.data.patientUsername);
            setEditGender(result.data.gender);
            setEditHomeAddress(result.data.homeAddress);
            setEditEmailAddress(result.data.emailAddress);
            setEditPhoneNumber(result.data.phoneNumber);
            setEditHasMedicalAid(result.data.hasMedicalAid);
            setEditMedicalAidCompany(result.data.medicalAidCompany);

        }).catch((error)=>
        {
            console.log(error)
        })
    }
    const handleDelete = (id) =>
    {
        if(window.confirm("Are you sure you want to delete this patient?") == true)
        {
            const url = 'https://localhost:7108/api/Patient/DeletePatient/' + id;
            axios.delete(url,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            .then((result) =>{
                if(result.status == 200)
                {
                    toast.success('Patient Successfully Deleted!');
                    getPatientData();
                    clear();
                }
            })
            .catch((error)=>{
                toast.error(error);
            })            
        }
    }
    const handleLogOut = () =>
    {
        localStorage.removeItem("token");
        navigate("/", {replace: true});
    }
    const handleUpdate = () =>
    {
        const url = 'https://localhost:7108/api/Patient/UpdatePatient/' + editPatientID;
        const data = {
            "patientName": editPatientName,
            "patientSurname": editPatientSurname,
            "patientUsername" : editPatientUsername,
            "gender": editGender,
            "homeAddress": editHomeAddress,
            "emailAddress": editEmailAddress,
            "phoneNumber": editPhoneNumber,
            "hasMedicalAid": editHasMedicalAid,
            "medicalAidCompany": editMedicalAidCompany
        }
        axios.put(url, data, 
        {   headers: {
            Authorization: `Bearer ${token}`
        }   
        })   
        .then((result) =>{
            if(result.status == 200)
            {
                getPatientData()
                clear();
                toast.success('Patient Updated Successfully!');
            }
        }).catch((error)=>{
            toast.error(error);
        })
        
    }
    const searchPatients = () => {
        if (!searchTerm.trim()) {
            setPatients([]);
            return;
        }

        axios.get('https://localhost:7108/api/Patient/search?searchTerm=' + searchTerm,
        {    headers: {
            Authorization: `Bearer ${token}`
        }
        })
        .then((result) => {
            setPatients(result.data);
            if(result.data.length === 0) {
                toast.error('No patients found');
            }
            else
            toast.success('Found ' + result.data.length + ' patient(s)');
        })
        .catch((error) => {
            console.log(error);
            toast.error('Failed to search patients');
        });
    }
    return (
    <Fragment>
            <ToastContainer/>
        <br></br>
        <div className = "ps-4">
            <div className='d-flex justify-content-between align-items-center mb-4'>
                <h1>Welcome to Doctor's Assistant Page!</h1>
                    <div className="text-end mb-3">
                        <button className='btn btn-danger me-5' onClick={handleLogOut} >Log Out</button>
                    </div>
            </div>
            <Container className="my-4">
            <Row className="justify-content-center">
                <Col md={6}>
                <div className="d-flex">
                    <input
                    type="text"
                    className="form-control me-2"
                    placeholder="Search patients by Name, Surname, or Username..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <button className="btn btn-primary" onClick={searchPatients}>
                    Search
                    </button>
                </div>
                </Col>
            </Row>
            </Container>

            <div className='d-flex justify-content-between align-items-center'>
                <h3>Patient Records</h3>
                    <div className="text-end mb-3">
                        <button className='btn btn-primary me-5' onClick={handleAdd} >Add Patient</button>
                    </div>

            </div>
        </div>
        <Modal show={showAdd} onHide={handleCloseAdd}>
            <Modal.Header closeButton>
                <Modal.Title>Add Patient</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Row>
                    <input type="text" className="form-control" placeholder="Enter Name" 
                    value={patientName} onChange={(e) => setPatientName(e.target.value)}/>
                </Row>
                <Row>
                    <input type="text" className="form-control" placeholder="Enter Surname" 
                    value={patientSurname} onChange={(e) => setPatientSurname(e.target.value)}/>
                </Row>
                <Row>
                    <input type="text" className="form-control" placeholder="Enter Username" 
                    value={patientUsername} onChange={(e) => setPatientUsername(e.target.value)}/>
                </Row>
                <Row>
                    <p>Gender</p>
                    <label className ="me-3">
                            <input 
                                type="radio"
                                name="male" 
                                value="Male" 
                                checked={gender === "Male"}
                                onChange = {(e) => setGender(e.target.value)}
                            /> {" "}Male
                        </label>
                        <label>
                            <input 
                                type="radio"
                                name="female" 
                                value="Female"
                                checked={gender === "Female"}
                                onChange = {(e) => setGender(e.target.value)} 
                            /> {" "} Female
                        </label>
                </Row>
                <Row>
                    <input type="text" className="form-control" placeholder="Enter Home Address" 
                    value={homeAddress} onChange={(e) => setHomeAddress(e.target.value)}/>
                </Row>
                <Row>
                    <input type="text" className="form-control" placeholder="Enter Email Address" 
                    value={emailAddress} onChange={(e) => setEmailAddress(e.target.value)} />
                </Row>
                <Row>
                    <input type="text" className="form-control" placeholder="Enter PhoneNumber"  
                    value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
                </Row>
                <Row>
                    <p>Has Medical Aid?</p>
                    <label className ="me-3">
                            <input 
                                type="radio"
                                name="hasMedicalAid" 
                                value="true" 
                                checked={hasMedicalAid === true}
                                onChange={() => {setHasMedicalAid(true);
                                    setMedicalAidCompany('');
                                }}
                            /> {" "} Yes
                        </label>
                        <label>
                            <input 
                                type="radio"
                                name="hasMedicalAid" 
                                value="false" 
                                checked={hasMedicalAid === false}
                                onChange={() => {setHasMedicalAid(false);
                                    setMedicalAidCompany("");}
                                }
                            /> No
                        </label>
                </Row>
                {hasMedicalAid && (<Row>
                    <select type="text" className="form-control" placeholder="Medical Aid Company" 
                    value={medicalAidCompany} onChange={(e) => setMedicalAidCompany(e.target.value)} >
                        <option value="">---Select Medical Aid---</option>
                        <option value="Discovery Health">Discovery</option>
                        <option value="Bonitas">Bonitas</option>
                        <option value="Momentum Health">Momentum Health</option>
                    </select>
                </Row> )}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseAdd}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleSave}>
                    Save Changes
                </Button>
            </Modal.Footer>
        </Modal>
        <Table striped bordered hover>
            <thead>
                <tr>
                <th>#</th>
                <th>Name</th>
                <th>Surname</th>
                <th>Username</th>
                <th>Gender</th>
                <th>Address</th>
                <th>Email</th>
                <th>PhoneNumber</th>
                <th>Has Medical Aid</th>
                <th>Medical Aid Company</th>
                <th>Actions</th>
                </tr>
            </thead>
            <tbody>
            {
                patients && patients.length > 0 ?
                patients.map((items, index) =>
                {
                    return(
                        <tr key = {index}>
                        <td>{index + 1}</td>
                        <td>{items.patientName}</td>
                        <td>{items.patientSurname}</td>
                        <td>{items.patientUsername}</td>
                        <td>{items.gender}</td>
                        <td>{items.homeAddress}</td>
                        <td>{items.emailAddress}</td>
                        <td>{items.phoneNumber}</td>
                        <td>{items.hasMedicalAid ? "Yes": "No"}</td>
                        <td>{items.medicalAidCompany}</td>
                        <td colSpan={2}>
                            <button className='btn btn-primary' onClick={() => handleEdit(items.patientId)}>Edit</button> &nbsp;
                            <button className='btn btn-danger'onClick={() => handleDelete(items.patientId)}>Delete</button>
                        </td>
                        </tr>)
                }) : (
                        <tr>
                        <td colSpan="10" className="text-center">Loading...</td>
                        </tr>
                    )}
            
            </tbody>
        </Table>

        <Modal show={showEdit} onHide={handleCloseEdit}>
            <Modal.Header closeButton>
                <Modal.Title>Edit Patient</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Row>
                    <input type="text" className="form-control" placeholder="Enter ID" 
                    value={editPatientID} onChange={(e) => setEditPatientID(e.target.value)}/>
                </Row>
                <Row>
                    <input type="text" className="form-control" placeholder="Enter Name" 
                    value={editPatientName} onChange={(e) => setEditPatientName(e.target.value)}/>
                </Row>
                <Row>
                    <input type="text" className="form-control" placeholder="Enter Surname" 
                    value={editPatientSurname} onChange={(e) => setEditPatientSurname(e.target.value)}/>
                </Row>
                <Row>
                    <input type="text" className="form-control" placeholder="Enter Username" 
                    value={editPatientUsername} onChange={(e) => setEditPatientUsername(e.target.value)}/>
                </Row>
                <Row>
                    <p>Gender</p>
                    <label className ="me-3">
                            <input 
                                type="radio"
                                name="male" 
                                value="Male" 
                                checked={editGender === "Male"}
                                onChange = {(e) => setEditGender(e.target.value)}
                            /> {" "}Male
                        </label>
                        <label>
                            <input 
                                type="radio"
                                name="female" 
                                value="Female"
                                checked={editGender === "Female"}
                                onChange = {(e) => setEditGender(e.target.value)} 
                            /> {" "} Female
                        </label>
                </Row>
                <Row>
                    <input type="text" className="form-control" placeholder="Enter Home Address" 
                    value={editHomeAddress} onChange={(e) => setEditHomeAddress(e.target.value)}/>
                </Row>
                <Row>
                    <input type="text" className="form-control" placeholder="Enter Email Address" 
                    value={editEmailAddress} onChange={(e) => setEditEmailAddress(e.target.value)} />
                </Row>
                <Row>
                    <input type="text" className="form-control" placeholder="Enter PhoneNumber"  
                    value={editPhoneNumber} onChange={(e) => setEditPhoneNumber(e.target.value)} />
                </Row>
                <Row>
                    <p>Has Medical Aid?</p>
                    <label className ="me-3">
                            <input 
                                type="radio"
                                name="hasMedicalAid" 
                                value="true" 
                                checked={editHasMedicalAid === true}
                                onChange={() => {setEditHasMedicalAid(true);
                                    setEditMedicalAidCompany('');
                                }}
                            /> {" "} Yes
                        </label>
                        <label>
                            <input 
                                type="radio"
                                name="hasMedicalAid" 
                                value="false" 
                                checked={editHasMedicalAid === false}
                                onChange={() => {setEditHasMedicalAid(false);
                                    setEditMedicalAidCompany("");}
                                }
                            /> No
                        </label>
                </Row>
                {editHasMedicalAid && (<Row>
                    <select type="text" className="form-control" placeholder="Medical Aid Company" 
                    value={editMedicalAidCompany} onChange={(e) => setEditMedicalAidCompany(e.target.value)} >
                        <option value="">---Select Medical Aid---</option>
                        <option value="Discovery Health">Discovery</option>
                        <option value="Bonitas">Bonitas</option>
                        <option value="Momentum Health">Momentum Health</option>
                    </select>
                </Row> )}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseEdit}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleUpdate}>
                    Save Changes
                </Button>
            </Modal.Footer>
        </Modal>
    </Fragment>
    
    )
}

export default MedApp;