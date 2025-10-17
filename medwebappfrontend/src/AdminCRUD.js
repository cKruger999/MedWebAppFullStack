import React,{useState, useEffect, Fragment} from "react";
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
    useEffect(() => 
    {
        setToken(localStorage.getItem("token"))
        getUserData();
    },[token]
    )
   

    const getUserData = () =>
    {
        

        axios.get('https://localhost:7108/api/Admin/users-with-roles', {
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
           
            handleshow();
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
        })
        .catch((error) => {
        console.log(error);
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
                    <input  id = "role" type="text" placeholder="Enter role" className="form-control" />
                    </Col>
                    <Col>
                    <input id = "email" type="text" placeholder="Enter email" className="form-control" />
                    </Col>
                    <Col>
                    <input id = "password" type="text" placeholder="Enter password" className="form-control" />
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
                    <th>userName</th>
                    <th>email</th>
                    <th>roles</th>
                    <td>Actions</td>
                    </tr>
                </thead>

                <tbody>
                {
                    data && data.length > 0 ?
                    data.map((item, index) => 
                    {
                        return( <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{item.userName}</td>
                    <td>{item.email}</td>
                    <td>{item.roles}</td>
                    <td colSpan={2}>
                    <button className= "btn btn-danger" onClick={() => handleDelete(item.userName)}>Delete</button>
                    </td>
                    </tr>)
                    })
                    :
                    'Loading...'
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