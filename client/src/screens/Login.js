import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 
import './Signup.css';

const Login = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const [response, setResponse] = useState(''); // State to store the response
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Update the form data state
    setFormData({ ...formData, [name]: value });

    // Set the username to local storage immediately
    if (name === 'username') {
      localStorage.setItem('loggedInUsername', value);
      localStorage.setItem('roomName', value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/login', formData);
      console.log('API Response:', response);

      // Log the username for debugging
      console.log('Logged in as:', formData.username);

      console.log('Login successful');

      // Pass the username as a parameter when navigating to /home
      navigate(`/Mainpage`);
    } catch (error) {
      console.error('Login failed', error);
      setResponse('Login failed invalid credentials ');
    }
  };

  return (
    <div className="login-container"> {/* Apply class name to the container */}
    
    <div className='ok-field'><h2><pre>     Login      </pre></h2>
      <form onSubmit={handleSubmit}>
        <div className="username">
        <label><pre>Username:                                </pre></label>
        <input
          type="text"
          name="username"
          placeholder="Username"
          onChange={handleChange}
        />
        </div>
        <div className='password'>
        <label><pre> Password:                                 </pre></label>
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
        />
        </div>

        <button type="submit">Log In</button>
      </form>
      <br/>
      <div onClick={() => navigate('/signup')}><center>Don't have an account?</center></div>
      <div className="response-message">{response}</div> {/* Apply class name to the response message */}
    </div>
  </div>
  );
};

export default Login;
