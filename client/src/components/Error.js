import React from 'react';
import { useNavigate } from 'react-router-dom';

function Errornew() {
  const navigate = useNavigate();

  const handleRedirect = () => {
    navigate('/home/:username');
  };

  return (
    <div>
      <div className="alert alert-warning" role="alert">
        Invalid credentials, please try again!
        <button onClick={handleRedirect}>Go to Homepage</button>
      </div>
    </div>
  );
}

export default Errornew;
