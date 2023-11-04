import * as React from 'react';
import './styles.scss';

interface ISelectProps {
    defaultValue:string;
    value:string;
    name:string;
    values:string[];
    register?:any;
}

const Select: React.FunctionComponent<ISelectProps> = ({defaultValue, value, name,values,register}) => {
  return (
    <div className='select-div'>
        <p className='title'>{name}</p>
        <div className='select-wrapper'>
            <select defaultValue={defaultValue} {...register(name)}>
            <option value={defaultValue} disabled>{defaultValue}</option>
            {
                values.map((value)=>(
                    <option value={value} key={value}>{value}</option>
                ))
            }
            </select>
        </div>
    </div>
  );
};

export default Select;
