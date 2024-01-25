
import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import instance from '../axios';
// import { Try } from '@mui/icons-material';





function User() {
    const [validated, setValidated] = useState(false);
    
    const {id} =useParams();
    const navigate = useNavigate();
    const [user,setUser]=useState({
        fullname:'',
        email:'',
    });
    useEffect(() => {
        const getUserDetails= async () => {
            try{
                const res= await instance.get(`api/v1/user/${id}`,{
                    withCredentials:true
                });
                if(!res.data.success){
                    navigate("/users");
                }
                setUser({
                    fullname:res.data.user.fullname,
                    email:res.data.user.email,
                })
                // console.log(res.data.user);
            
            }catch(error){
               

            } navigate("/users");

        }
        getUserDetails();


    },[])
    
    const handleFormSubmit = async (e) => {
        e.preventDefault();
        const form = e.currentTarget;
        if (form.checkValidity() === false) {
            e.stopPropagation();
        }
        else{
            try {
                let res= await instance.put(`api/v1/user/${id}`,{
                        fullname:user.fullname,
                        email:user.email,
                      
                    },{
                        withCredentials:true
                    });
                    if(!res.data.success){
                        toast.error(res.data.message);
                    }
                    toast.success(res.data.message);
                    await new Promise((resolve) => setTimeout(resolve,2000));
                    navigate('/users');
                
            } catch (error) {
                toast.error(error.response.data.message);
                
            } 
           
        }
        setValidated(true);
        }
       
        console.log(user);
  return (
    <Container>
    <Row>
        <Col className='topicColor'>Edit User</Col>
    </Row>
   
    <Row>
        <Col className='mt-3 mb-3'>
        <ToastContainer  position="top-center"/>
           
            <Form noValidate validated={validated} onSubmit={handleFormSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label>FullName:</Form.Label>
                    <Form.Control type="text" placeholder="Enter Fullname" defaultValue={user.fullname} onChange={(e) => setUser({...user,fullname:e.target.value})} required />
                    <Form.Control.Feedback type='invalid'>Please enter Fullname</Form.Control.Feedback>
                    <Form.Control.Feedback type='valid'>Enter Success</Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Email:</Form.Label>
                    <Form.Control type="email" placeholder="Enter Email" defaultValue={user.email} onChange={(e) => setUser({...user,email:e.target.value})} required />
                    <Form.Control.Feedback type='invalid'>Please Enter Valid Email</Form.Control.Feedback>
                    <Form.Control.Feedback type='valid'>successfully Entered</Form.Control.Feedback>
                </Form.Group>
             

                <Button variant="primary" type="submit">
                    Update
                </Button>
            </Form>



        </Col>
    </Row>
</Container>
  )
}

export default User