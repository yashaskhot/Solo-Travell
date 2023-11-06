import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AdminLoginPage() {
  const [username, setUsername] = useState('');
  const [adminKey, setAdminKey] = useState('');
  const navigate = useNavigate();

  const handleAdminLogin = async () => {
    try {
      // Store the adminKey value from the input field in localStorage
      localStorage.setItem('adminKey', adminKey);

      // Make the API call
      const response = await axios.post('/api/verifyAdmin', { adminKey });

      if (response.data.success) {
        console.log(adminKey); // This will display the adminKey you typed
        navigate('/admin');
      } else {
        alert('Admin verification failed. Please check your admin key.');
        navigate('/Error');
      }
    } catch (error) {
      console.error('Error:', error);
      navigate('/error');
    }
  };

  return (
    <div>
      <h1>Admin Login</h1>
      <input
        type="password"
        placeholder="Admin Key"
        value={adminKey}
        onChange={(e) => setAdminKey(e.target.value)}
      />
      <button onClick={handleAdminLogin}>Login</button>
    </div>
  );
}

export default AdminLoginPage;
