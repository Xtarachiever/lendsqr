import * as React from 'react';
import NavBar from './NavBar';
import SideBar from './SideBar';
import TextInput from '../reuseableFields/TextInput';
import { BsSearch } from 'react-icons/bs';
import './styles.scss';

interface ILayoutProps {
  children?: React.ReactNode;
}

const Layout: React.FunctionComponent<ILayoutProps> = ({children}) => {
  return (
    <div className='layout-wrapper'>
      <div>
        <NavBar />
        <SideBar />
      </div>
        <div className='body'>
          <div className='mobile-view search-div'>
            <TextInput placeholder='Search for anything' name='search' id='search' type='text'/>
            <div className='search-button'>
                <BsSearch />
            </div>
          </div>
          {children}
        </div>
    </div>
  );
};

export default Layout;
