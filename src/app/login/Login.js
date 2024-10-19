"use client"; // Ensure this is at the top

import React, { useState } from 'react';
import './Login.css'; // Import the CSS file
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ListCrypto from "../dashboard/ListCrypto";


export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login state

  const handleLogin = (e) => {
    e.preventDefault();

    const storedEmail = localStorage.getItem('userEmail');
    const storedPassword = localStorage.getItem('userPassword');

    if (email === storedEmail && password === storedPassword) {
      const token = 'staticToken123'; // This is a static token 
      
      // Set the token in local storage
      localStorage.setItem('authToken', token);
      
      toast.success('Login successful! Token set in localStorage: ' + token);
      setIsLoggedIn(true); // Update login state
      setEmail('');
      setPassword('');
    } else {
      console.error('Login failed! Invalid email or password.');
      toast.error('Invalid email or password.');
    }
  };

  return (
    <div className="login-container">
      <ToastContainer />
      {isLoggedIn ? (
       <ListCrypto />
      ) : (
        <div className="login-form">
          <h2>Login</h2>
          <form onSubmit={handleLogin}>
            <div>
              <label>Email:</label>
              <input 
                type="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                required 
              />
            </div>
            <div>
              <label>Password:</label>
              <input 
                type="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                required 
              />
            </div>
            <button type="submit" className='login-button'>Login</button>
          </form>
        </div>
      )}
    </div>
  );
}
