import React, { useState } from 'react';
import Message from './Message'; // Remove the directory path and use a relative import
import axios from 'axios';
import DatePicker from 'react-datepicker';
import './cars.css';


import 'react-datepicker/dist/react-datepicker.css';

function CarSearchForm() {
  const [formData, setFormData] = useState({
    pickUpDate: new Date('2023-11-04'), // Default to the current date
    dropOffDate: new Date('2023-11-05'), // Default drop-off date
    pickUpTime: '05:00', // Default pick-up time
    dropOffTime: '07:00', // Default drop-off time
  });

  const [carData, setCarData] = useState([]);
  const [showMessage, setShowMessage] = useState(false);

  const handleDateChange = (date, field) => {
    setFormData({ ...formData, [field]: date });
  };

  const handleInputChange = (e, field) => {
    setFormData({ ...formData, [field]: e.target.value });
  };
  function validateTime(e) {
    const input = e.target;
    const inputValue = input.value;
    const placeholderValue = input.placeholder;
    const timeRegex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;
  
    if (!timeRegex.test(inputValue)) {
        setShowMessage(true);
        input.value = ''; // Clear the input field
      }
    }

  const handleSearch = async () => {
    const formatDate = (date) => {
      return date.toLocaleDateString('en-GB').split('/').reverse().join('-');
    };

    const options = {
      method: 'GET',
      url: 'https://tripadvisor16.p.rapidapi.com/api/v1/cars/searchCarsSameDropOff',
      params: {
        pickUpPlaceId: '186338',
        pickUpLocationType: 'CITY',
        pickUpDate: formatDate(formData.pickUpDate), // Format date as 'yy-mm-dd'
        dropOffDate: formatDate(formData.dropOffDate), // Format date as 'yy-mm-dd'
        pickUpTime: formData.pickUpTime, // Use the user-defined pick-up time
        dropOffTime: formData.dropOffTime, // Use the user-defined drop-off time
        order: 'RECOMMENDED',
        page: '1',
        currencyCode: 'INR',
      },
      headers: {
        // 00d1ca2c9cmsh9537c522687a786p17193ejsn9ab6e1ff82a7
        'X-RapidAPI-Key': 'bdb9da8c96msh87b2d2b1bd59af7p13f8c6jsn5d4afc7ecaff',
        'X-RapidAPI-Host': 'tripadvisor16.p.rapidapi.com',
      },
    };

    try {
      const response = await axios.request(options);
      setCarData(response.data.data.cars);
    } catch (error) {
      console.error(error);
    }
  };


  return (
    <div>
    <h1>Car Rental Search</h1>

    <div className="form-container">
      <div className="form-group">
        <label>Pick-up Date:</label>
        <DatePicker
          selected={formData.pickUpDate}
          onChange={(date) => handleDateChange(date, 'pickUpDate')}
        />
      </div>

      <div className="form-group">
        <label>Drop-off Date:</label>
        <DatePicker
          selected={formData.dropOffDate}
          onChange={(date) => handleDateChange(date, 'dropOffDate')}
        />
      </div>

      <div className="form-group">
  <label>Pick-up Time:</label>
  <input
    type="text"
    value={formData.pickUpTime}
    onChange={(e) => handleInputChange(e, 'pickUpTime')}
    placeholder="05:00" // Add the placeholder attribute here
    onBlur={validateTime} // Call the validateTime function on blur
  />
</div>

<div className="form-group">
  <label>Drop-off Time:</label>
  <input
    type="text"
    value={formData.dropOffTime}
    onChange={(e) => handleInputChange(e, 'dropOffTime')}
    placeholder="05:00" // Add the placeholder attribute here
    onBlur={validateTime} // Call the validateTime function on blur
  />
</div>

    </div>
    <button className='button-cars' onClick={handleSearch}>Search</button>
    {showMessage && (
        <Message
          message="Invalid time format. Please use the format: HH:MM (e.g., 05:00)"
          onClose={() => setShowMessage(false)}
        />
      )}

    <h1>Car List</h1>
    <table className="car-table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Price</th>
          <th>Supplier</th>
          <th>Rating</th>
          <th>Pick-Up Location</th>
          <th>Drop-Off Location</th>
          <th>Purchase Link</th>
        </tr>
      </thead>
      <tbody>
        {carData.map((car) => (
          <tr key={car.id}>
            <td>{car.vehicle.name}</td>
            <td>{car.displayPricing?.breakDown?.totalPrice}</td>
            <td>{car.supplier?.name}</td>
            <td>Average Rating: {car.supplierRating?.averageRating || 'N/A'}</td>
            <td>{car.pickUpLocation?.name}</td>
            <td>{car.dropOffLocation?.name}</td>
            <td>
              {car.purchaseLink ? (
                <a href={car.purchaseLink} target="_blank" rel="noopener noreferrer">
                  Book Now
                </a>
              ) : (
                'N/A'
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
  );
 
}

export default CarSearchForm;
