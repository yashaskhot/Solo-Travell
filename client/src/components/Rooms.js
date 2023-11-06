import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useState } from "react";
import Carousel from 'react-bootstrap/Carousel';
import {Link} from 'react-router-dom';


function Room({ room }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const username = localStorage.getItem('loggedInUsername');
  return (
    <div className="row bs">
      <div className="col-md-4">
        {/* Conditional rendering to check if imgurls is defined and not empty */}
        {room.imageurls && room.imageurls.length > 0 ? (
          <img src={room.imageurls[0]} className="smallimg" alt="Room Image" />
        ) : (
          <span>No Image Available</span>
        )}
      </div>
      <div className="col-md-7">
        {/* Render other content for the room */}
        <h1>{room.name}</h1>
        <p>Description : {room.Description}</p>
        <p>Max Count : {room.MaxCount}</p>
        <p>Phone Number : {room.Phonenumber}</p>
        <p>Type : {room.Type}</p>
        <p>Rent : {room.Rentperday}</p>
        <p>Facilities : {room.facilities}</p>
        <div style={{float:'right'}}>
            <button className="btn btn-primary" onClick={handleShow}>View Details</button>
            <Link to={`/book/${encodeURIComponent(username)}/${encodeURIComponent(room.name)}`}>
  <button className="btn btn-primary m-2">Book Now</button>
</Link>

        </div>
      </div>
      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{room.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Carousel data-bs-theme="dark" prevLabel='' nextLabel=''>
      <Carousel.Item>
        {room.imageurls.map(url=>{
          return(
            <img
            className="d-block w-100 bigimg"
            src={url}
          />
          )
        })}
      </Carousel.Item>   
    </Carousel >
    <p>{room.Description}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Room;
