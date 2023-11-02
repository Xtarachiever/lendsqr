import * as React from 'react';
import NavBar from '../reuseableFields/NavBar';
import SideBar from '../reuseableFields/SideBar';
import './styles.scss';

interface IDashboardProps {
}

const Dashboard: React.FunctionComponent<IDashboardProps> = (props) => {
  return (
    <div className='dashboard-wrapper'>
      <div>
        <NavBar />
        <SideBar />
      </div>
        <div className='body'>
          <p>Body</p>
        </div>
    </div>
  );
};

export default Dashboard;
