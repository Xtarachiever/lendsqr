import * as React from 'react';
import Layout from '../../layout/Layout';
import DashboardCard from '../../reuseableFields/DashboardCard';
import './styles.scss';

interface IUsersProps {
}

const Users: React.FunctionComponent<IUsersProps> = (props) => {
  return (
    <Layout>
        <div className='users-wrapper'>
            <p className='header'>Users</p>
            <div className='analytics-wrapper'>
                <DashboardCard  title='USERS' analytics='2,453' imgUrl='/user-icon.svg'/>
                <DashboardCard  title='ACTIVE USERS' analytics='2,453' imgUrl='/active-users-icon.svg'/>
                <DashboardCard  title='USERS WITH LOANS' analytics='12,453' imgUrl='/users-loan.svg'/>
                <DashboardCard  title='USERS WITH SAVINGS' analytics='102,453' imgUrl='/users-saving.svg'/>
            </div>
        </div>
    </Layout>
  );
};

export default Users;
