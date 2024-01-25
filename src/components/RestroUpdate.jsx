import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import instance from '../axios';
import { useNavigate, useParams } from 'react-router-dom';






function RestroUpdate() {
    const {id} = useParams();
    const navigate = useNavigate();
    const [validated, setValidated] = useState(false);
    const [restaurant, setRestaurant] = useState({
        name:'',
        address:'',
        neighborhood:'',
    });

    useEffect(() => {
        const getRestaurantDetails = async () => {
            try {
                const res = await instance.get(`api/v1/restaurantupdation/${id}`, {
                    withCredentials: true

                });
                if(!res.data.success){
                    toast.error(res.data.message);
                }
                setRestaurant({
                    name:res.data.restro.name,
                    address:res.data.restro.address,
                    neighborhood:res.data.restro.neighborhood,
                    photograph:res.data.restro.photograph
                  
                });
                // console.log(res.data.restaurant);


            } catch (error) {
                toast.error(error.response.data.message);

            }

        }

        getRestaurantDetails();
    }, [id,navigate]);

        const handleFormSubmit = async (e) => {
            e.preventDefault();
            const form = e.currentTarget;
            if (form.checkValidity() === false) {
                e.stopPropagation();
            }
            else{
              
                try {
                    let res= await instance.put(`api/v1/restaurantupdation/${id}`,{
                        name:restaurant.name,
                        address:restaurant.address,
                        neighborhood:restaurant.neighborhood,
                        photograph:restaurant.photograph
                    },{
                            withCredentials:true,
                            headers: {
                                'Content-Type': 'multipart/form-data',
                            }
                        });
                        if(!res.data.success){
                            toast.error(res.data.message);
                        }
                        toast.success(res.data.message);
                        await new Promise((resolve) => setTimeout(resolve,2000));
                        navigate('/');
                    
                } catch (error) {
                    toast.error(error.response.data.message);
                    
                } 
               
            }
            setValidated(true);
            }
  







    return (
        <Container>
            <Row>
                <Col className='mt-3 mb-3'>
                    <ToastContainer position='top-right' />
            
                    <Form validated={validated} onSubmit={handleFormSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label>Restaurant Name:</Form.Label>
                            <Form.Control type="text" placeholder="Sample Restaurant Name" defaultValue={restaurant.name} onChange={(e) => setRestaurant({ ...restaurant,name: e.target.value })} required />
                            <Form.Control.Feedback type='invalid'>Please enter restaurant name</Form.Control.Feedback>
                            <Form.Control.Feedback type='valid'>Restaurant name looks good</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Restaurant Address:</Form.Label>
                            <Form.Control type="text" placeholder="Sample Restaurant Address" defaultValue={restaurant.address} onChange={(e) => setRestaurant({ ...restaurant,address: e.target.value })} required />
                            <Form.Control.Feedback type='invalid'>Please enter restaurant address</Form.Control.Feedback>
                            <Form.Control.Feedback type='valid'>successfully Entered</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Restaurant Neighborhood:</Form.Label>
                            <Form.Control type="text" placeholder="Sample Restaurant Neighborhood" defaultValue={restaurant.neighborhood} onChange={(e) => setRestaurant({ ...restaurant,neighborhood: e.target.value })} required />
                            <Form.Control.Feedback type='invalid'>Please enter restaurant name</Form.Control.Feedback>
                            <Form.Control.Feedback type='valid'>Successfully Entered</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group controlId="formFile" className="mb-3">
                            <Form.Label>Restaurant Photograph:</Form.Label>
                            <Form.Control type="file" defaultValue={restaurant.photograph} onChange={(e) =>setRestaurant({...restaurant,photograph:e.target.files[0]})} />
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

export default RestroUpdate