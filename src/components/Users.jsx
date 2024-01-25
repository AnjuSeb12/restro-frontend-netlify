import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Col, Container, Row, Table } from 'react-bootstrap';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UserDelete from './UserDelete';




function Users() {
    const [users, setUsers] = useState([]);
    useEffect(() => {
        const getAllUsers = async () => {
            try {
                const res = await axios.get("https://restro-app-usf0.onrender.com/api/v1/users",{withCredentials:true});
                setUsers(res.data.users);
            } catch (error) {
              toast.error(error.message);  
            }
        
               
            
           
        }
        getAllUsers();
    }, [users]);
    console.log(users);
    
    return (
        <Container>
            <Row>
                <Col className='topicColor mt-3'>Users</Col>
            </Row>
            <ToastContainer position='top-center'/>
            <Row>
                <Col className='mt-3 mb-3'>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Full Name</th>
                                <th>Email</th>
                                <th>Edit</th>
                                <th>Delete</th>

                            </tr>
                        </thead>
                        <tbody>
                            {users && users.map((user, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{user.fullname}</td>
                                    <td>{user.email}</td>
                                    <td><Link  to={`/user/${user._id}`}><BorderColorIcon/></Link></td>
                                    <td><UserDelete id={user._id}/></td>
                                  
                                </tr>


                            ))}
                        </tbody>
                    </Table>

                </Col>
            </Row>
        </Container>
    )
}

export default Users