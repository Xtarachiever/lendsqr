import React from 'react';
import './App.scss';
import Login from './components/login/Login';
import { Route, Routes } from 'react-router-dom';
import Dashboard from './components/dashboard/Dashboard';

function App() {
  return (
    <div className="App">
      <Routes>
         <Route element={<Login />} path='/login'/>
         <Route path="/" element={<Dashboard/>} /> 
      </Routes>
    </div>
  );
}

export default App;
