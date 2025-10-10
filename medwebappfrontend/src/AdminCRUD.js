import React,{useState, useEffect, Fragment} from "react";
import Table from 'react-bootstrap/Table';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";

const AdminCRUD = () => 
{
    const [data, setData] = useState([])
    useEffect(() => 
    {
        getUserData();
    },[]
    )

    const getUserData = () =>
    {
        const token = localStorage.getItem('token');

        axios.get('https://localhost:7108/api/Admin/users-with-roles', {
        headers: {
        Authorization: `Bearer ${token}`
        }
        })
        .then((result) => setData(result.data))
        .catch((error) => console.log(error));
    }

    return(
        <Fragment>
            <Table striped bordered hover>
            <thead>
                <tr>
                <th>#</th>
                <th>userName</th>
                <th>email</th>
                <th>roles</th>
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
                </tr>)
                })
                :
                'Loading...'
            }
        
            </tbody>
            </Table>
        </Fragment>
    )
}
export default AdminCRUD;