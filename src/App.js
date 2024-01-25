import About from "./components/About";
import Contact from "./components/Contact";
import Header from "./components/Header";
import Home from "./components/Home";
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom';
import   './components/Header.css'
import { useEffect } from "react";
import Footer from "./components/Footer";
import Details from "./components/Details";
import { useDispatch, useSelector } from "react-redux";
import { getRestaurants } from "./redux/restaurantSlice";
import AddRestaurant from "./components/AddRestaurant";
import Register from "./components/Register";
import Login from "./components/Login";
import ProtectedRoute from "./utils/ProtectedRoute";
import Users from "./components/Users";
import User from "./components/User";
import instance from "./axios";
import './bootstrap.min.css';
import RestroView from "./components/RestroView";
import RestroUpdate from "./components/RestroUpdate";



function App() {
  // const resturant={
  //   id: 1,
  //       name: "Mission Chinese Food",
  //       neighborhood: "Manhattan",
  //       photograph: "https://images.unsplash.com/photo-1526318896980-cf78c088247c?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1534&q=80",
  //       address: "171 E Broadway, New York, NY 10002",
       
  // }
 
  const dispatch=useDispatch();
  const isAuthenticated=useSelector((state) => state.auth.isAuthenticated);
  console.log("isAuthenticated..............",isAuthenticated);
  useEffect(() => {
    //componentDidMount()
    // fetch('/restaurants.json')
    // .then((data) => data.json())
    // .then((res) => dispatch(getRestaurants(res.restaurants)))
    const fetchRestaurants = async (req,res) => {
      try{
        const res=await instance.get('/api/v1/restaurants');
        if(res.data.success){
          dispatch(getRestaurants(res.data.restaurants));
        }
        else{
          console.log(res.data.message);
        }
      }
      catch(error){
        console.log(error.message);
      }

     
    }
    fetchRestaurants();
    
    //return("")//componentWillUnMount()
  },[dispatch])//dependency Array,componentDidUpdate()

 
  return (

    <div>
      <Router>
        <Header/>
        <Routes>
          <Route path="/" element={ <Home/>}/>
          <Route path="/about" element={<About/>}/>
          <Route path="/details/:id" element={ <Details/>}/>
          <Route path="/register" element={ <Register/>}/>
          <Route path="/login" element={ <Login/>}/>
          <Route path="/add" element={ <ProtectedRoute isAuthenticated={isAuthenticated}> <AddRestaurant/></ProtectedRoute>}/>
          <Route path="/contact" element={ <ProtectedRoute isAuthenticated={isAuthenticated}> <Contact/></ProtectedRoute>}/>
          <Route path="/users" element={ <ProtectedRoute isAuthenticated={isAuthenticated}> <Users/></ProtectedRoute>}/>
          <Route path="/user/:id" element={ <ProtectedRoute isAuthenticated={isAuthenticated}> <User/></ProtectedRoute>}/>
          <Route path="/restroview" element={ <ProtectedRoute isAuthenticated={isAuthenticated}> <RestroView/></ProtectedRoute>}/>
          <Route path="/restroupdate/:id" element={ <ProtectedRoute isAuthenticated={isAuthenticated}> <RestroUpdate/></ProtectedRoute>}/>
         


        </Routes>
        <Footer/>
      </Router>
    
   
    
    </div>
  );
}

export default App;
