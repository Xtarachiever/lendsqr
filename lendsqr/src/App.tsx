import React from 'react';
import './App.scss';
import Login from './components/login/Login';
import { Route, Routes } from 'react-router-dom';
import Users from './components/dashboard/users/Users';

function App() {
  return (
    <div>
      <Routes>
         <Route element={<Login />} path='/login'/>
         <Route path="/dashboard/users" element={<Users/>} /> 
      </Routes>
    </div>
  );
}

export default App;
