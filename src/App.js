
import Login from './components/Login';
import UserDetailsForm from './components/UserDetailsForm';
import SunbaseData from './components/SunbaseData';
import Register from './components/Register';
import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import Error from './components/Error';
const App = ()=> {
  const [authenticated, setAuthenticated] = useState(false);

  // UseNavigate hook to navigate programmatically
  const navigate = useNavigate();

  // Mock authentication function using a token (replace this with your actual authentication logic)
  const authenticateUser = () => {
    const authToken = localStorage.getItem('sunbase_token'); // Replace with your method of retrieving the token
    return authToken; // Return true if the token is present, otherwise false
  };

  // Check authentication status on component mount
  useEffect(() => {
    const isAuthenticated = authenticateUser();
    setAuthenticated(isAuthenticated);
  }, []);

  // const handleLogin = () => {
  //   // Perform your login logic here
  //   // Assuming authentication is successful, set authenticated to true
  //   setAuthenticated(true);
  //   // Redirect to the customer page
  //   navigate('/customers-info');
  // };

  const handleLogout = () => {
    // Perform your logout logic here
    // Remove the authentication token
    localStorage.removeItem('sunbase_token');
    // Set authenticated to false
    setAuthenticated(false);
    // Redirect to the login page
    navigate('/');
  };
  return (
    <>
      <Routes>
        <Route path="/" exact element = {<Login />} />
        <Route path="/register" element={<Register />}  />
        <Route path="/add-customer" element= {<UserDetailsForm/>} />
        <Route path="/customers-info" element= {<SunbaseData />}/>
        <Route path="*" element={<Error />} />
      </Routes>
    </>
  );
}

export default App;
