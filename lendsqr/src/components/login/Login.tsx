import React, { useState } from 'react';
import TextInput from '../reuseableFields/TextInput';
import Button from '../reuseableFields/Button';
import './styles.scss';
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';
import { storeUserDetailsInIndexedDB } from '../store/DataStorage';

interface IFormInput {
  email: string;
  password: string;
}

interface ILoginProps {
}


const Login: React.FunctionComponent<ILoginProps> = (props) => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm<IFormInput>();

  const onSubmit = (data:IFormInput) =>{
    setLoading(true)
    const email = {
      email: data?.email
    }
    storeUserDetailsInIndexedDB(email,'email','email');
    if (Object.keys(errors).length === 0) {
      navigate('/dashboard/users')
      setLoading(false)
    }else{
      console.log('Something went wrong')
    }

  }

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
            <form onSubmit={handleSubmit(onSubmit)}>
              <div>
                <TextInput type='text' placeholder='Email' name='email' register={register} rules={{ required: true, pattern: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ }}/>
                {
                  errors.email && (
                    <div>
                      {errors.email.type === 'required' && <p className="alert">Email is required</p>}
                      {errors.email.type === 'pattern' && <p className="alert">Provide a valid email</p>}
                    </div>
                  )
                }
                <TextInput type='text' placeholder='Password' name='password' register={register} rules={{required:true, minLength:4}}/>
                {
                  errors.password && (
                    <>
                      {errors.password.type === 'required' && <p className="alert">Password is required</p>}
                      {errors.password.type === 'minLength' && <p className="alert">Password must be greater than 4</p>}
                    </>
                  )
                }
                <p className='forgot-text'>FORGOT PASSWORD?</p>
                <Button name={loading ? 'Loading...' : 'LOG IN'} type='submit'/>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
