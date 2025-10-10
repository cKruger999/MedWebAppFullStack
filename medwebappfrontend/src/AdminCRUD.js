import React,{useState, useEffect, Fragment} from "react";
import Table from 'react-bootstrap/Table';

const AdminCRUD = () => 
{
    const UserData = [
            {
                id: 1,
                userName: "Tannie",
                email: "docAssist@example.com",
                roles: [
                "Doctor's Assistant"
                ]
            },
            {
                id: 1,
                userName: "Admin",
                email: "admin@example.com",
                roles: [
                "Admin"
                ]
            }
    ]
    const [data, setData] = useState([])
    useEffect(() => 
    {
        setData(AdminCRUD);
    },[]
    )
    return(
        <Fragment>
            <Table striped bordered hover>
            <thead>
                <tr>
                <th>#</th>
                <th>UserName</th>
                <th>Email</th>
                <th>UserRole</th>
                <th></th>
                </tr>
            </thead>

            <tbody>
            {
                data && data.length > 0 ?
                data.map((item, index) => 
                {
                    return( <tr key={index}>
                <td>{index + 1}</td>
                <td>{item.UserName}</td>
                <td>{item.Email}</td>
                <td>{item.UserRole}</td>
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