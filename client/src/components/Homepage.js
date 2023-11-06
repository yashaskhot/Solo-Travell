import React from 'react';
import { useNavigate } from 'react-router-dom';
import Team from './Team'; // Adjust the import path based on your project structure
import EmbeddedMap from './EmbeddedMap'; // Adjust the import path based on your project structure
import Contact from './test1'; // Adjust the import path based on your project structure
import teamData from './teamData';

function HomePageComponent() {
  const navigate = useNavigate();

  const handleRedirectToLogin = () => {
    navigate('/login');
  };

  return (
    <div className='newcard'>
      <h1>Our Team</h1>
      <button onClick={handleRedirectToLogin}>Go to Login</button>
      <Team teamData={teamData} />
      <h1>Our Location</h1>
      <EmbeddedMap />
      <h2>WanderHub Feedback Form</h2>
      <Contact />
    </div>
  );
}

export default HomePageComponent;
