import React,{useState, useEffect, Fragment} from "react";
import { toast, ToastContainer } from "react-toastify"; 
import Table from 'react-bootstrap/Table';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const AdminCRUD = () => 
{
    const [token, setToken] = useState([])
    const [data, setData] = useState([])
    const [selectedRole, setRole] = useState('')
    useEffect(() => 
    {
        setToken(localStorage.getItem("token"))
        getUserData();
    },[token]
    )
   

    const getUserData = () =>
    {
        const token = localStorage.getItem('token');

        axios.get('https://localhost:7108/api/Admin/Users-With-Roles', {
        headers: {
            Authorization: `Bearer ${token}`
        }
        })
        .then((result) => setData(result.data))
        .catch((error) => console.log(error));
    }

    const [show, setShow] = useState(false);
    const handleshow = () => setShow(true);
    const handleClose = () => setShow(false);
    

    const handleEdit = (id) =>
    {
        handleshow();
        

    }
        

    const handleDelete = (id) =>
    {
        if(window.confirm("Are you sure you want to delete this user?") == true)
        {
            const token = localStorage.getItem('token');

            axios.delete('https://localhost:7108/api/Admin/Delete-Users?id='+ id,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            }

            )
            .then((result) => {
                console.log(result.data);
                getUserData();
                toast.success("User Successfully Deleted!");
            })
            .catch((error) => {
                console.log(error);
            });
        }
    }

    const handleUpdate = (id) =>
    {

    }

    const handleInsert = () =>
    {
        const username = document.getElementById('username').value;
        const role = document.getElementById('role').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;


        const FormData = {
            Username: username,
            EmailAddress: email,
            Password: password,
            role: role
        }

        const token = localStorage.getItem('token');

        axios.post('https://localhost:7108/api/Admin?role='+role,
        FormData,
        {
            headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
            }
        }
        )
        .then((result) => {
            console.log(result.data);
            getUserData(); // refresh table
            toast.success("User Successfully Created!");
        })
        .catch((error) => {
            console.log(error);
            toast.error("User Failed To Create!");
        });
    }



    return(
        <Fragment>
        
            <Container>
            <br/>
                <Row>
                    <Col>
                    <input id = "username" type="text" placeholder="Enter Name" className="form-control" />
                    </Col>
                    <Col>
                    <select id = "role" value={selectedRole} onChange={(e) => setRole(e.target.value)}>
                        <option value="Admin">Admin</option>
                        <option value="Doctor">Doctor</option>
                        <option value="Doctor's Assistant">Doctor's Assistant</option>
                    </select>
                    </Col>
                    <Col>
                    <input id = "email" type="text" placeholder="Enter Email" className="form-control" />
                    </Col>
                    <Col>
                    <input id = "password" type="text" placeholder="Enter Password" className="form-control" />
                    </Col>
                    <Col>
                    <button variant="btn btn-primary" onClick={handleInsert}>Submit</button>
                    </Col>
                </Row>
            <br/>
            </Container>
           
                <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>ID</th>
                        <th>Username</th>
                        <th>Email</th>
                        <th>Roles</th>
                    </tr>
                </thead>

                <tbody>
                {
                    data && data.length > 0 ?
                    data.map((item, index) => 
                    {
                        return( 
                    <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{item.id}</td>
                        <td>{item.userName}</td>
                        <td>{item.email}</td>
                        <td>{item.roles}</td>
                        <td colSpan={2}>
                            <button className= "btn btn-secondary" onClick={() => handleUpdate(item.id)}>Update</button>
                            <button className= "btn btn-danger" onClick={() => handleDelete(item.id)}>Delete</button>
                        </td>
                    </tr>)
                    }) : (
                    <tr>
                        <td colSpan={7} className="text-center">Loading...</td>
                    </tr>
                    )
                }
            
                </tbody>
                </Table>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>Edit user</Modal.Title>
                </Modal.Header>
                <Modal.Body>

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
export default AdminCRUD;