import * as React from 'react';
import NavBar from './NavBar';
import SideBar from './SideBar';
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
          {children}
        </div>
    </div>
  );
};

export default Layout;
