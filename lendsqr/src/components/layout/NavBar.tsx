import * as React from 'react';
import TextInput from '../reuseableFields/TextInput';
import { BsSearch } from 'react-icons/bs';
import { IoIosNotificationsOutline } from 'react-icons/io';
import { RiArrowDownSFill } from 'react-icons/ri';
import { AiOutlineClose } from 'react-icons/ai';
import './styles.scss';
import { useState } from 'react';

interface INavBarProps {
}

const NavBar: React.FunctionComponent<INavBarProps> = (props) => {
    const [open, setOpen] = useState<boolean>(false)
  return (
    <div className='nav-wrapper'>
        <img src='/Logo.svg' alt='Logo'/>
        <div className='search-div'>
            <TextInput placeholder='Search for anything' name='search' id='search' type='text'/>
            <div className='search-button'>
                <BsSearch />
            </div>
        </div>
        <div className='profile desktop-view'>
            <p className='docs'>Docs</p>
            <IoIosNotificationsOutline fontSize={'1.4rem'}/>
            <div>
                <img src='/user-icon.svg' alt='profile'/>
                <p>Adedeji <RiArrowDownSFill /></p>
            </div>
        </div>
        <div className='profile mobile-view'>
            <img src='/user-icon.svg' alt='profile' onClick={()=>setOpen(true)}/>
            {
                open && 
                <div className='drop-down'>
                    <div className='close-button' onClick={()=>setOpen(false)}>
                        <AiOutlineClose color='#213F7D'/>
                    </div>
                    <div className='dropdown-content'>
                        <IoIosNotificationsOutline fontSize={'1.4rem'}/>
                        {/* <p>Notifications <IoIosNotificationsOutline fontSize={'1.4rem'}/></p> */}
                        <p className='docs'>Docs</p>
                    </div>
                </div>
            }
        </div>
    </div>
  );
};

export default NavBar;