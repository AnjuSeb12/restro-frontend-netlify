import React, { useEffect, useState } from 'react';
import instance from '../axios';
import { Col, Container, Row, Table} from 'react-bootstrap';
import RestroDelete from './RestroDelete';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';




function RestroView() {
    const [restaurants,setRestaurants]=useState([]);
    useEffect(() => {
        const restroDetails =async () => {
            try {
                
                const res=await instance.get('/api/v1/restaurants');
                setRestaurants(res.data.restaurants);

            } catch (error) {
                toast.error(error.message);
            }

        }
        restroDetails();
    }, [restaurants]);
    // console.log(restaurants);

  return (
    <Container>
            <Row>
                <Col className='topicColor mt-3'>Restaurant Details</Col>
            </Row>
            <ToastContainer position='top-center'/>
            <Row>
                <Col className='mt-3 mb-3'>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Name</th>
                                <th>Address</th>
                                <th>Neighborhood</th>
                                <th>Photograph</th>
                                <th>Edit</th>
                                <th>Delete</th>

                            </tr>
                        </thead>
                        <tbody>
                            {restaurants && restaurants.map((restaurant,index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{restaurant.name}</td>
                                    <td>{restaurant.address}</td>
                                    <td>{restaurant.neighborhood}</td>
                                    <td>{restaurant.photograph}</td>
                                    <td><Link  to={`/restroupdate/${restaurant._id}`}><BorderColorIcon/></Link></td>
                                    <td><RestroDelete id={restaurant._id}/></td>
                                  
                                </tr>


                            ))}
                        </tbody>
                    </Table>

                </Col>
            </Row>
        </Container>
  )
}

export default RestroView