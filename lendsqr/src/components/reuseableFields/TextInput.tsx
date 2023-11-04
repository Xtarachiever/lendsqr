import * as React from 'react';
import './styles.scss';
import { MouseEventHandler, useState } from 'react';

interface ITextInputProps {
  placeholder: string;
  name: string;
  type: string;
  register?:any;
  rules?:{
    required?: boolean;
    minLength?: number;
    pattern?:RegExp;
  };
}

const TextInput: React.FC<ITextInputProps> = ({ placeholder, name, type, rules, register }) => {
  const [passwordType, setPasswordType] = useState<string>('password');

  const handleTypeSwitch: MouseEventHandler<HTMLLabelElement> = () => {
    // Use the current state to toggle between 'password' and 'text'
    if (passwordType === 'password') {
      setPasswordType('text');
    } else {
      setPasswordType('password');
    }
  }

  return (
    <div className='input-wrapper'>
      {
        name === 'password' ?
        <div>
          <input type={passwordType} placeholder={placeholder} {...register(name, rules)}/>
          <label htmlFor={name} className='input-label' onClick={handleTypeSwitch}>SHOW</label>
        </div>
        :
        <input type={type} placeholder={placeholder} {...register(name, rules)}/>
      }
    </div>
  );
};

export default TextInput;
