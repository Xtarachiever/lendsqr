import * as React from 'react';
import NavBar from './NavBar';
import SideBar from './SideBar';
import TextInput from '../reuseableFields/TextInput';
import { BsSearch } from 'react-icons/bs';
import './styles.scss';
import { useForm } from 'react-hook-form';
interface ILayoutProps {
  children?: React.ReactNode;
}

const Layout: React.FunctionComponent<ILayoutProps> = ({children}) => {
  const { register } = useForm();
  return (
    <div className='layout-wrapper'>
      <div>
        <NavBar />
        <SideBar />
      </div>
        <div className='body'>
          <div className='mobile-view search-div'>
            <TextInput placeholder='Search for anything' name='search' type='text' register={register}/>
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
