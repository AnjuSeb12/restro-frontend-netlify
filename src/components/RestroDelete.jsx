import React, { useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import { Button, Modal} from 'react-bootstrap';
// import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import instance from '../axios';
import { ToastContainer, toast } from 'react-toastify';





function RestroDelete({id}) {
    const [show,setShow]=useState(false);
  
    const handleClose = () => setShow(false);
    const handleShow =() => setShow(true);
    // const navigate=useNavigate();
    const handleDelete = async () => {
        try {
            const res = await instance.delete(`api/v1/restaurantupdation/${id}`,{
                withCredentials:true
                
            });
            if(!res.data.success){
                toast.error(res.data.message);
            }
            setShow(false);
            toast.success(res.data.message);

            
        } catch (error) {
            toast.error(error.response.data.message);
            
        }

    }



  return (
    <>
    <DeleteIcon onClick={handleShow}/>
    <ToastContainer  position='top-center'/>
    <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Restaurant Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure that you want to delete this Restaurant?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>

    </>
  )
}

export default RestroDelete