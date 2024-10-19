"use client";
import { useState } from 'react';
import './SignUP.css'; 
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function SignUP() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSignUp = (e) => {
    e.preventDefault();

    console.log('Form submitted'); 

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    // Store email and password in localStorage
    localStorage.setItem('userEmail', email);
    localStorage.setItem('userPassword', password);
    localStorage.setItem('name',name)
    toast.success("Successfully Register Please Login")

    // Log to verify values are stored
    console.log('Stored email:', localStorage.getItem('userEmail'));
    console.log('Stored password:', localStorage.getItem('userPassword'))
    console.log('Stored name:', localStorage.getItem('name'))
    console.log('Signup successful! User:', { name, email, password });
    
    // Clear the form
    setName('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setErrorMessage('');
  };

  return (
    <div className="signup-container">
      <ToastContainer />
      <div className="signup-form">
        <h2>Sign Up</h2>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <form onSubmit={handleSignUp}>
          <div>
            <label>Name:</label>
            <input 
              type="text" 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              required 
            />
          </div>
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
          <div>
            <label>Confirm Password:</label>
            <input 
              type="password" 
              value={confirmPassword} 
              onChange={(e) => setConfirmPassword(e.target.value)} 
              required 
            />
          </div>
          <button type="submit" className='sign-button'>Sign Up</button>
        </form>
      </div>
    </div>
  );
}
