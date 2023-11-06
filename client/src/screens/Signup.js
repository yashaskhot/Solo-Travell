// src/components/Signup.js
import React, { useState } from 'react';
import "./BookingScreen.css";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const Signup = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    userRole: 'user',
    occupation: 'IT',
    adminKey: '',
    age: '',
  });

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [validationMessages, setValidationMessages] = useState({
    username: '',
    password: '',
    userRole: '',
    occupation: '',
    adminKey: '',
    age: '',
  });
  const [duplicateCredentialsError, setDuplicateCredentialsError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // Clear validation message for the field being updated
    setValidationMessages({ ...validationMessages, [e.target.name]: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    const newValidationMessages = {};
    if (!formData.username) {
      newValidationMessages.username = 'Please enter a username';
    }
    if (!formData.password) {
      newValidationMessages.password = 'Please enter a password';
    } else if (formData.password.length < 6 || !/[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]/.test(formData.password)) {
      newValidationMessages.password = 'Password must be 6-8 characters and contain special characters';
    }
    if (!formData.userRole) {
      newValidationMessages.userRole = 'Please select a user role';
    }
    if (!formData.occupation) {
      newValidationMessages.occupation = 'Please select an occupation';
    }
    if (formData.userRole === 'admin' && !formData.adminKey) {
      newValidationMessages.adminKey = 'Please enter an admin key';
    }
    if (!formData.age || isNaN(formData.age)) {
      newValidationMessages.age = 'Please enter a valid age';
    }

    // Check if there are any validation errors
    if (Object.keys(newValidationMessages).length > 0) {
      setValidationMessages(newValidationMessages);
      return;
    }

    try {
      await axios.post('/api/signup', formData);
      console.log('User registered successfully');

      // Redirect to the login page with a success message
      navigate('/login', { state: { successMessage: 'Thank you for registering with us' } });
    } catch (error) {
      setDuplicateCredentialsError('These credentials are already in use. Please choose a different credentials.');
      console.error('Registration failed');
    }
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <div className="signup-container">
    <div className="signup-form">
      <h2>Signup</h2>
      {validationMessages.username && <div className="alert alert-danger">{validationMessages.username}</div>}
      {validationMessages.password && <div className="alert alert-danger">{validationMessages.password}</div>}
      {validationMessages.userRole && <div className="alert alert-danger">{validationMessages.userRole}</div>}
      {validationMessages.occupation && <div className="alert alert-danger">{validationMessages.occupation}</div>}
      {validationMessages.adminKey && <div className="alert alert-danger">{validationMessages.adminKey}</div>}
      {validationMessages.age && <div className="alert alert-danger">{validationMessages.age}</div>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            name="username"
            placeholder="Username"
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Password:</label>
          <div className="password-field">
            <input
              type={passwordVisible ? 'text' : 'password'}
              name="password"
              placeholder="Password"
              onChange={handleChange}
            />
            <span onClick={togglePasswordVisibility}>
              <FontAwesomeIcon icon={passwordVisible ? faEyeSlash : faEye} />
            </span>
          </div>
        </div>
        <div>
          <label>User Role:</label>
          <select name="userRole" onChange={handleChange}>
            <option value="admin">Admin</option>
            <option value="user">User</option>
          </select>
        </div>
        <div>
          <label>Occupation:</label>
          <select name="occupation" onChange={handleChange}>
            <option value="IT">IT</option>
            <option value="FINANCE">Finance</option>
            <option value="DOCTOR">Doctor</option>
            <option value="GOVERNMENT">Government</option>
            <option value="ARMEDFORCES">Armed Forces</option>
            <option value="RETIRED">Retired</option>
            <option value="ETC">Etc</option>
          </select>
          {duplicateCredentialsError && <div className="alert alert-danger">{duplicateCredentialsError}</div>}
        </div>
        {formData.userRole === 'admin' && (
          <div>
            <label>Admin Key:</label>
            <input
              type="password"
              name="adminKey"
              placeholder="Admin Key"
              onChange={handleChange}
            />
          </div>
        )}
        <div>
          <label>Age:</label>
          <input
            type="text"
            name="age"
            placeholder="Age"
            onChange={handleChange}
          />
        </div>
        <div>
          <button type="submit">Signup</button>
        </div>
      </form>
    </div>
  </div>
  );
};

export default Signup;
