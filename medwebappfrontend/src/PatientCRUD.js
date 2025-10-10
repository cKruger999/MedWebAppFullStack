import React,{useState, useEffect, Fragment} from 'react';
import Table from 'react-bootstrap/Table';
import 'bootstrap/dist/css/bootstrap.css';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const  MedApp = () =>
{
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const[patientName, setPatientName] = useState('');
    const[patientSurname, setPatientSurname] = useState('');
    const[gender, setGender] = useState('');
    const[homeAddress, setHomeAddress] = useState('');
    const[emailAddress, setEmailAddress] = useState('');
    const[phoneNumber, setPhoneNumber] = useState('');
    const[hasMedicalAid, setHasMedicalAid] = useState('');
    const[medicalAidCompany, setMedicalAidCompany] = useState('');

    const[editPatientID, setEditPatientID] = useState('');
    const[editPatientName, setEditPatientName] = useState('');
    const[editPatientSurname, setEditPatientSurname] = useState('');
    const[editGender, setEditGender] = useState('');
    const[editHomeAddress, setEditHomeAddress] = useState('');
    const[editEmailAddress, setEditEmailAddress] = useState('');
    const[editPhoneNumber, setEditPhoneNumber] = useState('');
    const[editHasMedicalAid, setEditHasMedicalAid] = useState('');
    const[editMedicalAidCompany, setEditMedicalAidCompany] = useState('');

    const [data, setData] = useState([])
    useEffect(() =>
    {
        getPatientData();
    },[])

    const getPatientData = () =>
    {
        const token = localStorage.getItem('token');

        axios.get('https://localhost:7108/api/Patient/GetAllPatients', {
        headers: {
        Authorization: `Bearer ${token}`
        }
    })
        .then((result) => setData(result.data))
        .catch((error) => console.log(error));
    }

    const handleSave = () =>
    {
        const url = 'https://localhost:7108/api/Patient/AddPatient'
        const data = {
            "patientName": patientName,
            "patientSurname": patientSurname,
            "gender": gender,
            "homeAddress": homeAddress,
            "emailAddress": emailAddress,
            "phoneNumber": phoneNumber,
            "hasMedicalAid": hasMedicalAid,
            "medicalAidCompany": medicalAidCompany
        }
        axios.post(url, data)
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
        setGender('');
        setHomeAddress('');
        setEmailAddress('');
        setPhoneNumber('');
        setHasMedicalAid('');
        setMedicalAidCompany('');
        
        setEditPatientID('');
        setEditPatientName('');
        setEditPatientSurname('');
        setEditGender('');
        setHomeAddress('');
        setEditEmailAddress('');
        setEditPhoneNumber('');
        setHasMedicalAid('');
        setMedicalAidCompany('');
    }
    const handleEdit = (id) =>
    {
        //alert(id);
        handleShow();
        axios.get('https://localhost:7108/api/Patient/GetPatient/' + id)
        .then((result) =>
        {
            setEditPatientName(result.data.patientName);
            setEditPatientSurname(result.data.patientName);
            setEditGender(result.data.gender);
            setHomeAddress(result.data.homeAddress);
            setEditEmailAddress(result.data.emailAddress);
            setEditPhoneNumber(result.data.phoneNumber);
            setHasMedicalAid(result.data.hasMedicalAid);
            setMedicalAidCompany(result.data.medicalAidCompany);

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
            axios.delete(url)
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
    const handleUpdate = () =>
    {
        const url = 'https://localhost:7108/api/Patient/UpdatePatient/' + editPatientID;
        const data = {
            "patientName": editPatientName,
            "patientSurname": editPatientSurname,
            "gender": editGender,
            "homeAddress": editHomeAddress,
            "emailAddress": editEmailAddress,
            "phoneNumber": editPhoneNumber,
            "hasMedicalAid": editHasMedicalAid,
            "medicalAidCompany": editMedicalAidCompany
        }
        axios.put(url, data)
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
    return (
    <Fragment>
            <ToastContainer/>
        <br></br>
            <Container>
            <Row>
                <Col>
                    <input type="text" className="form-control" placeholder="Enter Name" 
                    value={patientName} onChange={(e) => setPatientName(e.target.value)}/>
                </Col>
                <Col>
                    <input type="text" className="form-control" placeholder="Enter Surname" 
                    value={patientSurname} onChange={(e) => setPatientSurname(e.target.value)}/>
                </Col>
                <Col>
                    <input type="text" className="form-control" placeholder="Enter Gender" 
                    value={gender} onChange={(e) => setGender(e.target.value)}/>
                </Col>
                <Col>
                    <input type="text" className="form-control" placeholder="Enter Home Address" 
                    value={homeAddress} onChange={(e) => setHomeAddress(e.target.value)}/>
                </Col>
                <Col>
                    <input type="text" className="form-control" placeholder="Enter Email Address" 
                    value={emailAddress} onChange={(e) => setEmailAddress(e.target.value)} />
                </Col>
                <Col>
                    <input type="text" className="form-control" placeholder="Enter PhoneNumber" 
                    value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
                </Col>
                <Col>
                    
                    <p>Has Medical Aid?</p>
                    <label>
                            <input 
                                type="radio" 
                                value="true" 
                                checked={hasMedicalAid === true}
                                onChange={(e) => setHasMedicalAid(true)}
                            /> Yes
                        </label>
                        <label>
                            <input 
                                type="radio" 
                                value="false" 
                                checked={hasMedicalAid === false}
                                onChange={(e) => setHasMedicalAid(false)}
                            /> No
                        </label>
                </Col>
                <Col>
                    <input type="text" className="form-control" placeholder="Medical Aid Company" 
                    value={medicalAidCompany} onChange={(e) => setMedicalAidCompany(e.target.value)} />
                </Col>
                <Col>
                    <button className="btn btn-primary">Submit</button>
                </Col>
            </Row>
            </Container>
        <Table striped bordered hover>
            <thead>
                <tr>
                <th>#</th>
                <th>Name</th>
                <th>Surname</th>
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
                data && data.length > 0 ?
                data.map((items, index) =>
                {
                    return(
                        <tr key = {index}>
                        <td>{index + 1}</td>
                        <td>{items.patientName}</td>
                        <td>{items.patientSurname}</td>
                        <td>{items.gender}</td>
                        <td>{items.homeAddress}</td>
                        <td>{items.emailAddress}</td>
                        <td>{items.phoneNumber}</td>
                        <td>{items.hasMedicalAid}</td>
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

        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Modal heading</Modal.Title>
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
                    <input type="text" className="form-control" placeholder="Enter Gender" 
                    value={editGender} onChange={(e) => setEditGender(e.target.value)}/>
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
                    <label>
                            <input 
                                type="radio" 
                                value="true" 
                                checked={editHasMedicalAid === true}
                                onChange={(e) => setEditHasMedicalAid(true)}
                            /> Yes
                        </label>
                        <label>
                            <input 
                                type="radio" 
                                value="false" 
                                checked={editHasMedicalAid === false}
                                onChange={(e) => setEditHasMedicalAid(false)}
                            /> No
                        </label>
                </Row>
                <Row>
                    <input type="text" className="form-control" placeholder="Medical Aid Company" 
                    value={editMedicalAidCompany} onChange={(e) => setEditMedicalAidCompany(e.target.value)} />
                </Row>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
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