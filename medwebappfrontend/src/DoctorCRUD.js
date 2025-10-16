import React, { useState, useEffect, Fragment } from 'react';
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



const DoctorCRUD = () => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [searchTerm, setSearchTerm] = useState('');
    const [selectedPatient, setSelectedPatient] = useState(null);
    
    const [diagnosis, setDiagnosis] = useState('');
    const [treatment, setTreatment] = useState('');

    const [editVisitID, setEditVisitID] = useState('');
    const [editDiagnosis, setEditDiagnosis] = useState('');
    const [editTreatment, setEditTreatment] = useState('');

    const [patients, setPatients] = useState([]);
    const [visits, setVisits] = useState([]);

    useEffect(() => {getPatients()}, []);

    const getPatients = () => {
        const token = localStorage.getItem('token');
        axios.get('https://localhost:7108/api/Patient', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then((result) => {
            setPatients(result.data);
        })
        .catch((error) => {
            console.log(error);     
            toast.error('Failed to load patients');
        });
    }   

    const searchPatients = () => {
        if (!searchTerm.trim()) {
            setPatients([]);
            return;
        }

        const token = localStorage.getItem('token');
        axios.get('https://localhost:7108/api/Patient/search?searchTerm=' + searchTerm, {
            headers: {
                'Authorization': `Bearer ${token}`
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

    const getPatientVisits = (patientId) => {
        const token = localStorage.getItem('token');
        axios.get('https://localhost:7108/api/Visit?patientid=' + patientId, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then((result) => {
            setVisits(result.data);
        })
        .catch((error) => {
            console.log(error);
            toast.error('Failed to load visits');
        });
    }

    const handleSave = () => {
        if (!selectedPatient) {
            toast.error('Please select a patient first');
            return;
        }

        const url = 'https://localhost:7108/api/Visit';
        const data = {
            "patientId": selectedPatient.patientId,
            "diagnosis": diagnosis,
            "treatment": treatment
        }

        const token = localStorage.getItem('token');
        axios.post(url, data, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        })
        .then((result) => {
            getPatientVisits(selectedPatient.patientId);
            clear();
            toast.success('Visit Successfully Added!');
        })
        .catch((error) => {
            toast.error('Failed to add visit');
        });
    }

    const clear = () => {
        setDiagnosis('');
        setTreatment('');
        
        setEditVisitID('');
        setEditDiagnosis('');
        setEditTreatment('');
    }

    const handleEdit = (id) => {
        handleShow();
        const visit = visits.find(v => v.visitId === id);
        if (visit) {
            setEditVisitID(visit.visitId);
            setEditDiagnosis(visit.diagnosis);
            setEditTreatment(visit.treatment);
        }
    }

    const handleUpdate = () => {
        const url = 'https://localhost:7108/api/Visit?id=' + editVisitID;
        const data = {
            "patientId": selectedPatient.patientId,
            "diagnosis": editDiagnosis,
            "treatment": editTreatment
        }

        const token = localStorage.getItem('token');
        axios.put(url, data, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        })
        .then((result) => {
            if (result.status === 200) {
                getPatientVisits(selectedPatient.patientId);
                handleClose();
                clear();
                toast.success('Visit Updated Successfully!');
            }
        })
        .catch((error) => {
            toast.error(error);
        });
    }

    const handlePatientSelect = (patient) => {
        setSelectedPatient(patient);
        getPatientVisits(patient.patientId);
        toast.info('Selected patient: ' + patient.patientName + ' ' + patient.patientSurname);
    }

    return (
        <Fragment>
            <ToastContainer />
            <br />
            
            {/* Search Section */}
            <Container>
                <Row>
                    <Col>
                        <input 
                            type="text" 
                            className="form-control" 
                            placeholder="Search patients by Name, Surname, or Username..." 
                            value={searchTerm} 
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </Col>
                    <Col>
                        <button className="btn btn-primary" onClick={searchPatients}>Search Patients</button>
                    </Col>
                </Row>
            </Container>

            <br />

            {/* Main Content Area */}
            <Container>
                <Row>
                    {/* Patient List Column */}
                    <Col md={6}>
                        <h4>Patient List</h4>
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Name</th>
                                    <th>Surname</th>
                                    <th>Username</th>
                                    <th>Select</th>
                                </tr>
                            </thead>
                            <tbody>
                                {patients && patients.length > 0 ? 
                                    patients.map((patient, index) => (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>{patient.patientName}</td>
                                            <td>{patient.patientSurname}</td>
                                            <td>{patient.patientUsername}</td>
                                            <td>
                                                <button 
                                                    className='btn btn-success'
                                                    onClick={() => handlePatientSelect(patient)}
                                                >
                                                    Select
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                : (
                                    <tr>
                                        <td colSpan="5" className="text-center">No patients found. Search for patients.</td>
                                    </tr>
                                )}
                            </tbody>
                        </Table>
                    </Col>

                    {/* Visit History Column */}
                    <Col md={6}>
                        <div className="d-flex justify-content-between align-items-center">
                            <h4>
                                Visit History 
                                {selectedPatient && ` - ${selectedPatient.patientName} ${selectedPatient.patientSurname}`}
                            </h4>
                            <button className="btn btn-primary" onClick={handleShow}>
                                + Add Visit
                            </button>
                        </div>
                        
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Date</th>
                                    <th>Diagnosis</th>
                                    <th>Treatment</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {visits && visits.length > 0 ? 
                                    visits.map((visit, index) => (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>{new Date(visit.visitDate).toLocaleString()}</td>
                                            <td>{visit.diagnosis || 'N/A'}</td>
                                            <td>{visit.treatment || 'N/A'}</td>
                                            <td>
                                                <button 
                                                    className='btn btn-warning'
                                                    onClick={() => handleEdit(visit.visitId)}
                                                >
                                                    Edit
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                : (
                                    <tr>
                                        <td colSpan="5" className="text-center">
                                            {selectedPatient ? 'No visits found for this patient' : 'Select a patient to view visits'}
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </Table>
                    </Col>
                </Row>
            </Container>

            {/* Add/Edit Visit Modal */}
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        {editVisitID ? 'Edit Visit' : 'Add Visit'} 
                        {selectedPatient && ` - ${selectedPatient.patientName} ${selectedPatient.patientSurname}`}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col>
                            <label>Diagnosis</label>
                            <textarea 
                                className="form-control" 
                                rows="3"
                                placeholder="Enter diagnosis..."
                                value={editVisitID ? editDiagnosis : diagnosis}
                                onChange={(e) => editVisitID ? setEditDiagnosis(e.target.value) : setDiagnosis(e.target.value)}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <label>Treatment</label>
                            <textarea 
                                className="form-control" 
                                rows="3"
                                placeholder="Enter treatment..."
                                value={editVisitID ? editTreatment : treatment}
                                onChange={(e) => editVisitID ? setEditTreatment(e.target.value) : setTreatment(e.target.value)}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <small className="text-muted">
                                Visit will be recorded with current date/time: {new Date().toLocaleString()}
                            </small>
                        </Col>
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button 
                        variant="primary" 
                        onClick={editVisitID ? handleUpdate : handleSave}
                    >
                        {editVisitID ? 'Update Visit' : 'Add Visit'}
                    </Button>
                </Modal.Footer>
            </Modal>
        </Fragment>
    )
}

export default DoctorCRUD;