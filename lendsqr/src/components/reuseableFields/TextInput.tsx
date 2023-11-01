import * as React from 'react';
import './styles.scss';
import { MouseEventHandler, useState } from 'react';

interface ITextInputProps {
  placeholder: string;
  name: string;
  id: string;
  type: string;
}

const TextInput: React.FC<ITextInputProps> = ({ placeholder, name, id, type }) => {
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
          <input type={passwordType} placeholder={placeholder} name={name} id={id} />
          <label htmlFor={id} className='input-label' onClick={handleTypeSwitch}>SHOW</label>
        </div>
        :
        <input type={type} placeholder={placeholder} name={name} id={id} />
      }
    </div>
  );
};

export default TextInput;
