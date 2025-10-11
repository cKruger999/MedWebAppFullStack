import React, { useState, Fragment } from "react";
import { Form, Button, Card, Container } from "react-bootstrap"; 
import { toast, ToastContainer } from "react-toastify"; 
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import PatientCRUD from './PatientCRUD';
import { useNavigate} from 'react-router-dom';

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const handleLogin = async (e) => {
        if(!username || !password) {
            toast.error("Please fill in both fields");
            return;
        }
        try {
            const response = await axios.post('https://localhost:7108/api/Auth/login',{
                username: username,
                password: password,
            });

            const token = response.data.token;
            localStorage.setItem("token", token);

            const decoded = jwtDecode(token);
            const role = decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
            console.log(role);

            toast.success("Login successful!");
            if(role ==="Doctor's Assistant")
            {
                navigate("./PatientCRUD", {replace: true});
            }
            else if(role ==="Doctor")
            {
                navigate("./DoctorCRUD", {replace: true});
            }
            else if(role ==="Admin")
            {
                navigate("./AdminCRUD", {replace: true});
            }

            
        } catch(error) {
            console.log(error);
            toast.error("Invalid credentials or server error");
        }
    };
    return (
        <Fragment>
        <ToastContainer />

        <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }} > 
            <Card style={{ width: "400px", padding: "20px" }}> 
                <h3 className="text-center mb-4">Login</h3> 
                <Form > 
                    <Form.Group className="mb-3" controlId="formBasicEmail"> 
                        <Form.Label>Username</Form.Label> 
                            <Form.Control type="text" placeholder="Enter Username" 
                            value={username} onChange={(e) => setUsername(e.target.value)} /> 
                    </Form.Group> 
                    <Form.Group className="mb-3" controlId="formBasicPassword"> 
                        <Form.Label>Password</Form.Label> 
                            <Form.Control type="password" placeholder="Enter password" 
                            value={password} onChange={(e) => setPassword(e.target.value)} /> 
                    </Form.Group> 
                    <Button variant="primary" className="w-100" onClick={handleLogin}> Login </Button> 
                </Form> 
            </Card> 
        </Container> 
        </Fragment>
    );
    
};
export default LoginPage;