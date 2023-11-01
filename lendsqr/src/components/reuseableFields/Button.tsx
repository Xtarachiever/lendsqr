import * as React from 'react';
import './styles.scss';

type ButtonType = "button" | "submit" | "reset";

interface IButtonProps {
    name: string;
    type: ButtonType
}

const Button: React.FC<IButtonProps> = ({name,type}) => {
  return (
    <div className='button-wrapper'>
        <button type={type}>{name}</button>
    </div>
  );
};

export default Button;
