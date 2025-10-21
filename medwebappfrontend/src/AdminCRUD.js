import React,{useState, useEffect, Fragment} from "react";
import { toast, ToastContainer } from "react-toastify"; 
import { Dropdown } from "react-bootstrap";
import Table from 'react-bootstrap/Table';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useNavigate} from 'react-router-dom';

const AdminCRUD = () => 
{
    const navigate = useNavigate();

    const [showEdit, setShowEdit] = useState(false);
    const handleCloseEdit = () => setShowEdit(false);
    const handleShowEdit = () => setShowEdit(true);
    
    const [showAdd, setShowAdd] = useState(false);
    const handleCloseAdd = () => setShowAdd(false);
    const handleShowAdd = () => setShowAdd(true);
    
    const [data, setData] = useState([])
    const [roles, setRoles] = useState([]);

    const [username, setUsername] = useState('');
    const [emailAddress, setEmailAddress] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');

    const [editId, setEditId] = useState('');
    const [editUsername, setEditUsername] = useState('');
    const [editEmailAddress, setEditEmailAddress] = useState('');
    const [editPassword, setEditPassword] = useState('');
    const [editRole, setEditRole] = useState('');

    const [selectedRole, setSelectedRole] = useState("Select Role");
    
    const [token, setToken] = useState([]);

    useEffect(() => 
    {
        setToken(localStorage.getItem("token"))
        getUserData();
        getRolesData();
    }
    ,[token])
   
    const clear = () => 
    {
        setUsername('');
        setEmailAddress('');
        setPassword('');
        setRole('');

        setEditId('');
        setEditUsername('');
        setEditEmailAddress('');
        setEditPassword('');
        setEditRole('');
    }


    const getUserData = () =>
    {
        const token = localStorage.getItem('token');

        axios.get('https://localhost:7108/api/Admin/GetAllUsers', 
        {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        })
        .then((result) => setData(result.data))
        .catch((error) => console.log(error));
    }

    const getRolesData = () =>
    {
        const token = localStorage.getItem('token');

        axios.get('https://localhost:7108/api/Admin/GetRoles', 
        {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        })
        .then((result) => setRoles(result.data))
        .catch((error) => console.log(error));
    }

    const [show, setShow] = useState(false);
    const handleshow = () => setShow(true);
    const handleClose = () => setShow(false);
    const handleSelect = (role) => setSelectedRole(role);
    
    const handleAdd = () =>
    {
        handleShowAdd();
    }

    const handleEdit = (id) =>
    {
        const token = localStorage.getItem('token');

        axios.get('https://localhost:7108/api/Admin/GetUser/' + id, 
        {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        })
        .then((result) =>
        {
            setEditId(result.data.id);
            setEditUsername(result.data.userName);
            setEditEmailAddress(result.data.email);
            setEditRole(result.data.roles);

            handleShowEdit();
        })
        .catch((error)=>
        {
            console.log(error)
            toast.error('Cannot Find User!');
        })
    }
       
    const handleInsert = () =>
    {
        if (!username || !emailAddress || !password)
        {
            toast.warning("Please fill in all fields.");
            return;
        }
        else if (role === "Select Role") 
        {
            toast.warning("Please select a role.");
            return;
        }

        const token = localStorage.getItem('token');

        const newUserData = {
            "username": username,
            "emailAddress": emailAddress,
            "password": password
        }

        axios.post('https://localhost:7108/api/Admin/RegisterUser?role=' + role, newUserData,
        {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        })
        .then((result) => {
            getUserData();
            handleCloseAdd();
            clear();
            toast.success('User Successfully Created!');
        })
        .catch((error) => {
            console.log(error);
            toast.error('Failed To Create User!');
        });
    }

    const handleUpdate = () =>
    {
        const token = localStorage.getItem('token');

        const updatedUserData = {
            "username": editUsername,
            "emailAddress": editEmailAddress,
            "password": "p"
        }

        axios.put('https://localhost:7108/api/Admin/UpdateUser/' + editId + '?newRole=' + editRole, 
        updatedUserData,
        {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        })
        .then((result) =>{
            getUserData();
            handleCloseEdit();
            clear();
            toast.success('User Successfully Updated!');
        })
        .catch((error)=>{
            console.log(error);
            toast.error('Failed To Update User!');
        })
    }

    const handleDelete = (id) =>
    {
        if(window.confirm("Are you sure you want to delete this user?") == true)
        {
            const token = localStorage.getItem('token');

            axios.delete('https://localhost:7108/api/Admin/DeleteUser?id='+ id, 
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            })
            .then((result) => {
                console.log(result.data);
                getUserData();
                toast.success('User Successfully Deleted!');
            })
            .catch((error) => {
                console.log(error);
                toast.error('Failed To Delete User!');
            });
        }
    }

    const handleLogOut = () =>
    {
        localStorage.removeItem("token");
        navigate("/", {replace: true});
    }


    return(
        <Fragment>
            <div className='d-flex justify-content-between align-items-center mb-4 ps-4'>
                <h1>Welcome to Admin's Page!</h1>
                    <div className="text-end mb-3">
                        <button className='btn btn-danger me-5' onClick={handleLogOut} >Log Out</button>
                    </div>
            </div>
            <Container>
                <br/>
                <div className='d-flex justify-content-between align-items-center'>
                    <h3>Users</h3>
                        <div className="text-end mb-3">
                            <button className='btn btn-primary me-5' onClick={handleAdd} >Add User</button>
                        </div>
                </div>
            </Container>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>ID</th>
                        <th>Username</th>
                        <th>Email</th>
                        <th>Roles</th>
                        <th>Actions</th>
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
                            <td>
                                <button className= "btn btn-secondary" onClick={() => handleEdit(item.id)}>Edit</button>
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
            <Modal show={showAdd} onHide={handleCloseAdd}>
                <Modal.Header closeButton>
                    <Modal.Title>Add User</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <input type="text" placeholder="Enter Name" className="form-control" 
                        value={username} onChange={(e) => setUsername(e.target.value)}/>
                    </Row>
                    <br/>
                    <Row>
                        <Dropdown onSelect={(role) => setRole(role)}>
                            <Dropdown.Toggle variant="primary">
                                {role || 'Select Role'}
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                {roles.map((role, index) => (
                                    <Dropdown.Item key={index} eventKey={role}>
                                        {role}
                                    </Dropdown.Item>
                                ))}
                            </Dropdown.Menu>
                        </Dropdown>
                    </Row>
                    <br/>
                    <Row>
                        <input type="text" placeholder="Enter Email" className="form-control" 
                        value={emailAddress} onChange={(e) => setEmailAddress(e.target.value)}/>
                    </Row>
                    <br/>
                    <Row>
                        <input type="text" placeholder="Enter Password" className="form-control" 
                        value={password} onChange={(e) => setPassword(e.target.value)}/>
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseAdd}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleInsert}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal show={showEdit} onHide={handleCloseEdit}>
                <Modal.Header closeButton>
                <Modal.Title>Edit User</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <input type="text" placeholder="Enter Name" className="form-control" 
                        value={editUsername} onChange={(e) => setEditUsername(e.target.value)}/>
                    </Row>
                    <br/>
                    <Row>
                        <Dropdown onSelect={(editRole) => setEditRole(editRole)}>
                            <Dropdown.Toggle variant="primary">
                                {editRole || role || 'Select Role'}
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                {roles.map((role, index) => (
                                    <Dropdown.Item key={index} eventKey={role}>
                                        {role}
                                    </Dropdown.Item>
                                ))}
                            </Dropdown.Menu>
                        </Dropdown>
                    </Row>
                    
                    <br/>
                    <Row>
                        <input type="text" placeholder="Enter Email" className="form-control" 
                        value={editEmailAddress} onChange={(e) => setEditEmailAddress(e.target.value)}/>
                    </Row>
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
export default AdminCRUD;