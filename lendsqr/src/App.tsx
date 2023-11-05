import React, {useEffect, useState} from 'react';
import './App.scss';
import Login from './components/login/Login';
import { Route, Routes } from 'react-router-dom';
import Users from './components/dashboard/users/Users';
import SingleUser from './components/dashboard/users/SingleUser';
import { createContext } from 'react';
import { retrieveUserDetailsFromIndexedDB } from './components/store/DataStorage';
import { Navigate } from 'react-router-dom';

export const userContext = createContext<any[]>([]);

function App() {
  const [data, setData] = useState<any>([]);
  const [isAuthenticated, setAuthenticated] = useState<string>('');

  useEffect(()=>{
    retrieveUserDetailsFromIndexedDB('email','email','email')
    .then((storedEmail) => {
      setAuthenticated(storedEmail)
    })
    .catch((error) => {
      console.error('Error retrieving user details:', error);
    });
  },[])
  const usersData = async () =>{
    try{
      await fetch('https://api.json-generator.com/templates/jWExjdifhpfn/data',{
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${process.env.REACT_APP_TOKEN}`,
        },
      })
      .then(response => response.json())
      .then(data => {
        setData(data);
      })

    }catch(err){
      console.log('An Error occured')
    }
  }

  useEffect(()=>{
    usersData()
  },[])
  return (
    <userContext.Provider value={data}>
      <div className='App'>
        <Routes>
          <Route element={<AuthWrapper isAuthenticated={isAuthenticated}/>} path='/'/>
          <Route element={<Login />} path='/login'/>
          <Route path="/dashboard/users" element={<Users/>} /> 
          <Route path="/dashboard/users/:username" element={<SingleUser/>} /> 
        </Routes>
      </div>
    </userContext.Provider>
  );
}
interface IAuth {
  isAuthenticated:string;
}
const AuthWrapper:React.FC<IAuth> = ({isAuthenticated}) =>{
  return(
    isAuthenticated !== '' ? 
    <Navigate to={'/dashboard/users'} replace/>
    :
    <Navigate to={'/login'} replace />
  )
}
export default App;
