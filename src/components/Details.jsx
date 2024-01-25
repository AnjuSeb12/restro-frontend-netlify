import React, { useEffect, useState } from 'react'
import { Card, Col, Container, ListGroup, Row } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import "../components/Details.css";
import { useSelector } from 'react-redux';



function Details() {
 
  const { id } = useParams();
  const restaurants=useSelector((state) => state.data.restaurants);
  console.log(id);
 
  const currentRes = restaurants.find((res) => res._id == id);
  console.log(currentRes);
  return (
    <Container>
      {currentRes &&
        <Row>
          <Col> <Card md={8} className='mt-3'>
            
            <Card.Img variant="top" src={process.env.REACT_APP_SERVER_URL + currentRes.photograph} />
            <Card.Body>
              <Card.Title>{currentRes.name}</Card.Title>
              <Card.Text>
                <p> {currentRes.neighborhood},{currentRes.address}</p>

              </Card.Text>

            </Card.Body>
          </Card></Col>
          {/* <Col>
            <Card md={4} className='mt-3'>
              <ListGroup variant="flush">
              <ListGroup.Item><h3 id='textStyle'>Operating Hours</h3></ListGroup.Item>
                <ListGroup.Item>Monday: {currentRes.operating_hours.Monday}</ListGroup.Item>
                <ListGroup.Item>Tuesday: {currentRes.operating_hours.Tuesday}</ListGroup.Item>
                <ListGroup.Item>Wednesday:{currentRes.operating_hours.Wednesday}</ListGroup.Item>
                <ListGroup.Item>Thursday:{currentRes.operating_hours.Thursday}</ListGroup.Item>
                <ListGroup.Item>Friday:{currentRes.operating_hours.Friday}</ListGroup.Item>
                <ListGroup.Item>Saturday:{currentRes.operating_hours.Saturday}</ListGroup.Item>
                <ListGroup.Item>Sunday:{currentRes.operating_hours.Sunday}</ListGroup.Item>
              </ListGroup>
            </Card></Col> */}
        </Row>
      }
    </Container>
  )
}

export default Details