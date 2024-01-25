import React from 'react'
import { Container, Navbar,Nav, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { userLogout } from '../redux/userAuth';
import Cookies from 'js-cookie';





function Header() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const dispatch=useDispatch();
  const navigate=useNavigate();
  const handleLogout= () => {
    dispatch(userLogout());
    Cookies.remove("token");
    navigate("/login");
  }
  return (
    <Navbar expand="lg" className="bg-dark">
    <Container>
      <Navbar.Brand as ={Link} to="/">Resturant</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link as ={Link} to="/">Home</Nav.Link>
          <Nav.Link as ={Link} to="/About">About</Nav.Link>
          <Nav.Link as ={Link} to="/Contact">Contact</Nav.Link>
          <Nav.Link as ={Link} to="/add">Add</Nav.Link>
          <Nav.Link as ={Link} to="/register">Register</Nav.Link>
         <Nav.Link as ={Link} to="/users">Users</Nav.Link>
         <Nav.Link as ={Link} to="/restroview">RestroDetails</Nav.Link>
        
        </Nav>
        <Nav className="ms-auto">
          {isAuthenticated ? <Button onClick={handleLogout}>Logout</Button> : <Nav.Link as ={Link} to="/login"><Button>Login</Button></Nav.Link> }
       
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>
  )
}

export default Header