import React, { useState, useEffect } from 'react';

// CSS class for the card styling
const cardStyle = {
  border: '1px solid #ccc',
  borderRadius: '5px',
  padding: '10px',
  marginBottom: '10px',
  backgroundColor: '#f5f5f5',
};

// CSS for the page container
const containerStyle = {
  width: '80%',
  margin: '0 auto',
  padding: '20px',
  fontFamily: 'Arial, sans-serif',
  textAlign: 'center', // Center-align the content
};

// CSS for the button
const buttonStyle = {
  padding: '10px 20px',
  backgroundColor: '#007BFF',
  color: 'white',
  borderRadius: '5px',
  border: 'none',
  cursor: 'pointer',
};

// CSS for the header
const headerStyle = {
  fontSize: '24px',
  marginBottom: '20px',
};

function RoomSearch() {
  const [roomName, setRoomName] = useState('');

  const [roomData, setRoomData] = useState([]);

  useEffect(() => {
    const storedRoomName = localStorage.getItem('roomName');
    if (storedRoomName) {
      setRoomName(storedRoomName);
    }
    handleSearch();
  }, []);

  const handleSearch = async () => {
    try {
      const response = await fetch(`/api/roomsnew/${roomName}`);
      if (response.ok) {
        const data = await response.json();
        setRoomData(data);
      } else {
        setRoomData([]);
      }
    } catch (error) {
      console.error(error);
      setRoomData([]);
    }
  };

  return (
    <div style={containerStyle}>
      <h1 style={headerStyle}>Booking Details For: {roomName}</h1>
      <button onClick={handleSearch} style={buttonStyle}>
        Search
      </button>
      {roomData.length > 0 ? (
        roomData.map((room, index) => (
          <div key={index} style={cardStyle}>
            <h2>Room Name: {room.room}</h2>
            <p>Room ID: {room.roomid}</p>
            <p>selectedCheckInDate: {room.selectedCheckInDate}</p>
            <p>selectedCheckoutDate: {room.selectedCheckoutDate}</p>
            <p>rentPerDay: {room.rentPerDay}</p>
            <p>totalamount: {room.totalamount}</p>
            <p>totaldays: {room.totaldays}</p>
          </div>
        ))
      ) : (
        <p>No matching rooms found.</p>
      )}
    </div>
  );
}

export default RoomSearch;
