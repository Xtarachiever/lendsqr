import * as React from 'react';
import './styles.scss';
import { businesses, customers, settings } from './NavContent';
import { MdOutlineKeyboardArrowDown } from 'react-icons/md';

interface ISideBarProps {
}

const SideBar: React.FunctionComponent<ISideBarProps> = (props) => {
  return (
    <div className='sidebar-container'>
        <div className='nav-contents'>
          <div className='nav-content'>
            <img src='/briefcase.svg' alt='briefcase'/>
            <p>Switch Organization <MdOutlineKeyboardArrowDown fontSize={'1.2rem'}/></p>
          </div>
          <div className='nav-content'>
            <img src='/home.svg' alt='home'/>
            <p>Dashboard</p>
          </div>
        </div>
        <div className='nav-contents'>
          <p className='title'>CUSTOMERS</p>
          {
            customers.map(({name, icon})=>(
              <div key={name} className='nav-content'>
                {icon}
                <p>{name}</p>
              </div>
            ))
          }
        </div>
        <div className='nav-contents'>
          <p className='title'>BUSINESSES</p>
          {
            businesses.map(({name, icon})=>(
              <div key={name} className='nav-content'>
                {icon}
                <p>{name}</p>
              </div>
            ))
          }
        </div>
        <div className='nav-contents'>
          <p className='title'>SETTINGS</p>
          {
            settings.map(({name, icon})=>(
              <div key={name} className='nav-content'>
                {icon}
                <p>{name}</p>
              </div>
            ))
          }
        </div>
    </div>
  );
};

export default SideBar;
