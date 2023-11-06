import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import './Restaurants.css'; // Import your custom CSS file for additional styling
import { Link, useNavigate } from 'react-router-dom';

const API_KEY = 'bdb9da8c96msh87b2d2b1bd59af7p13f8c6jsn5d4afc7ecaff';
// bdb9da8c96msh87b2d2b1bd59af7p13f8c6jsn5d4afc7ecaff

const ApiDataDisplay = () => {
  const [apiData, setApiData] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const encodedParams = new URLSearchParams();
        encodedParams.set('currency', 'USD');
        encodedParams.set('language', 'en_US');
        encodedParams.set('location_id', '186337');

        const options = {
          method: 'POST',
          url: 'https://worldwide-restaurants.p.rapidapi.com/detail',
          headers: {
            'content-type': 'application/x-www-form-urlencoded',
            'X-RapidAPI-Key': API_KEY,
            'X-RapidAPI-Host': 'worldwide-restaurants.p.rapidapi.com',
          },
          data: encodedParams,
        };

        const response = await axios.request(options);
        setApiData(response.data.results);
      } catch (error) {
        setError(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="api-data-container">
      {error ? (
        <div className="error-message">Error: {error.message}</div>
      ) : apiData ? (
        <div>
          <h1 className="main-heading">{apiData.name}</h1>
          <p className="timezone">Timezone: {apiData.timezone}</p>
          <p className="location">Location: {apiData.location_string}</p>

          <div className="counters">
            <div className="counter">
              <span className="counter-value">{apiData.category_counts.attractions.activities}</span>
              <p className="counter-label">Activities</p>
            </div>
            <div className="counter">
              <span className="counter-value">{apiData.category_counts.attractions.attractions}</span>
              <p className="counter-label">Attractions</p>
            </div>
            <div className="counter">
              <span className="counter-value">{apiData.category_counts.attractions.nightlife}</span>
              <p className="counter-label">Nightlife</p>
            </div>
            <div className="counter">
              <span className="counter-value">{apiData.category_counts.attractions.shopping}</span>
              <p className="counter-label">Shopping</p>
            </div>
          </div>

          <div className="description">
            <p className="description-text">{apiData.description}</p>
            <p className="localized">{apiData.is_localized_description ? 'Localized' : 'Not Localized'}</p>
          </div>

          <div className="geo-description">
            <p className="geo-description-text">{apiData.geo_description}</p>
          </div>
        </div>
        
      ) : (
        <div className="loading-message">Loading...</div>
      )}
      {/* Add "Book Hotels" and "Book Car Rentals" buttons with links */}
      <div className="loading-message-new"></div>
      <div className="buttons-new">
            <Link to="/home/:username" className="btn btn-primary button-new-book-hotel">
              Book Hotels
            </Link>
            <Link to="/home/:username/carrentals" className="btn btn-primary button-new-book-car-hotel">
              Book Car Rentals
            </Link>
          </div>
        </div>
  );
};

export default ApiDataDisplay;
