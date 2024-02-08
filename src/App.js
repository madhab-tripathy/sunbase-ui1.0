
import Login from './components/Login';
import UserDetailsForm from './components/UserDetailsForm';
import SunbaseData from './components/SunbaseData';
import Register from './components/Register';
import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import Error from './components/Error';
import PrivateRoute from './route/PrivateRoute';
const App = ()=> {
  
  return (
    <>
      <Routes>
        <Route path="/" exact element = {<Login />} />
        <Route path="/register" element={<Register />}  />
        <Route path="/user" element={<PrivateRoute />} >
          <Route path="customer-form" element= {<UserDetailsForm/>} />
          <Route path="customer-form/:id?" element= {<UserDetailsForm/>} />
          <Route path="customers-info" element= {<SunbaseData />}/>
        </Route>
        <Route path="*" element={<Error />} />
      </Routes>
    </>
  );
}

export default App;
