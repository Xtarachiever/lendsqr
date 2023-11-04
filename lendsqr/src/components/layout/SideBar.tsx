import * as React from 'react';
import { useState, useEffect } from 'react';
import './styles.scss';
import { businesses, customers, settings } from '../reuseableFields/NavContent';
import { MdOutlineKeyboardArrowDown } from 'react-icons/md';
import { FaArrowRightArrowLeft } from 'react-icons/fa6';
import { useLocation } from 'react-router-dom';

interface ISideBarProps {
}

const SideBar: React.FunctionComponent<ISideBarProps> = (props) => {
  const [switched, setSwitched] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [active, setActive] = useState<boolean>(false);

  const route = useLocation();

  const handleClick = () =>{
    setActive(true)
  }

  useEffect(() => {

    handleClick();
    
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth <= 760);
    };

    checkScreenSize(); // Initial check

    // Add event listener for window resize
    window.addEventListener('resize', checkScreenSize);

    return () => {
      // Remove event listener when the component unmounts
      window.removeEventListener('resize', checkScreenSize);
    };
  }, []);

  return (
    <div className='sidebar-container'>
      <div className={`desktop-view ${(!isMobile && switched) || (!isMobile && !switched) || (isMobile && switched) ? 'switched' : 'notswitched'}`}>
        <div className='nav-contents'>
          <div className='nav-content' onClick={()=>setSwitched(false)}>
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
              <div key={name} className={`nav-content ${(active && route.pathname === `/dashboard/${name.toLowerCase()}`) && 'active'}`} onClick={handleClick}>
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
      <div className={`mobile-view ${isMobile && !switched ? 'switched' : 'notswitched'}`}>
        <div className='switch-icon' onClick={()=>setSwitched(true)}>
          <FaArrowRightArrowLeft />
        </div>
        <div className='nav-contents'>
          <div className='nav-content'>
            <img src='/home.svg' alt='home'/>
          </div>
        </div>
        <div className='nav-contents'>
          {
            customers.map(({name, icon})=>(
              <div key={name} className={`nav-content ${(active && route.pathname === `/dashboard/${name.toLowerCase()}`) && 'active'}`} onClick={handleClick}>
                {icon}
              </div>
            ))
          }
        </div>
        <div className='nav-contents'>
          {
            businesses.map(({name, icon})=>(
              <div key={name} className='nav-content'>
                {icon}
              </div>
            ))
          }
        </div>
        <div className='nav-contents'>
          {
            settings.map(({name, icon})=>(
              <div key={name} className='nav-content'>
                {icon}
              </div>
            ))
          }
        </div>
      </div>
    </div>
  );
};

export default SideBar;
