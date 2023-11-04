import * as React from 'react';
import './styles.scss';
import { MouseEventHandler } from 'react';

type ButtonType = "button" | "submit" | "reset";

interface IButtonProps {
    name: string;
    type: ButtonType,
    color?:string;
    onClick?:MouseEventHandler<HTMLButtonElement>;
}

const Button: React.FC<IButtonProps> = ({name,type, color, onClick}) => {
  return (
    <div className={`button-wrapper`}>
        <button type={type} className={`${color === 'white' ? 'white-button' : 'green-button'}`} onClick={onClick}>{name}</button>
    </div>
  );
};

export default Button;
