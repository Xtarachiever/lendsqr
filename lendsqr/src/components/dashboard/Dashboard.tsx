import * as React from 'react';
import NavBar from '../reuseableFields/NavBar';

interface IDashboardProps {
}

const Dashboard: React.FunctionComponent<IDashboardProps> = (props) => {
  return (
    <>
        <NavBar />
    </>
  );
};

export default Dashboard;
