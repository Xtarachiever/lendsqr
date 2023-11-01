import React from 'react';
import TextInput from '../reuseableFields/TextInput';
import Button from '../reuseableFields/Button';
import './styles.scss';

interface ILoginProps {
}

const Login: React.FunctionComponent<ILoginProps> = (props) => {
  return (
    <div className='wrapper'>
      <div className='content'>
        <div className='images'>
          <div className='logo'>
            <img src='/Logo.svg' alt='Logo'/>
          </div>
          <img src='/sign-in.svg' alt='Login' className='sign-in'/>
        </div>
        <div className="form-wrapper">
          <div className='form-content'>
            <p className='header'>WELCOME!</p>
            <span>Enter details to Login</span>
            <div>
              <TextInput type='text' placeholder='Email' name='email' id='email'/>
              <TextInput type='text' placeholder='Password' name='password' id='password'/>
              <p className='forgot-text'>FORGOT PASSWORD?</p>
              <Button name='LOG IN' type='button'/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
