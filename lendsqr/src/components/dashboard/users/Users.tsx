import * as React from 'react';
import { useEffect } from 'react';
import Layout from '../../layout/Layout';
import DashboardCard from '../../reuseableFields/DashboardCard';
import './styles.scss';
import BasicTable from '../../reuseableFields/table/Table';
import { useState } from 'react';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { BsEye } from 'react-icons/bs'
import { FiUserX } from 'react-icons/fi';
import { RiUserFollowLine } from 'react-icons/ri';

interface IUsersProps {
}

const Users: React.FunctionComponent<IUsersProps> = (props) => {
  const [data, setData] = useState([]);
  const [activeRow, setActiveRow] = useState<string>('');

  const togglePopUp = (rowId:string) => {
    if (activeRow === rowId) {
      setActiveRow(''); // Close the popup if it's already open
    } else {
      setActiveRow(rowId); // Open the popup for the clicked row
    }
  };


  const usersData = async () =>{
    try{
      await fetch('https://api.json-generator.com/templates/jWExjdifhpfn/data',{
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${process.env.REACT_APP_TOKEN}`,
        },
      })
      .then(response => response.json())
      .then(data => {
        setData(data);
      })

    }catch(err){
      console.log('An Error occured')
    }
  }

  useEffect(()=>{
    usersData();
  },[])

  const columns:{}[] = [
    {
      header:'ORGANIZATION',
      accessorKey: 'organization',
      accessorFn: (row:any) => (
      row.profile.organization[0]
      ),

    },
    {
      header:'USERNAME',
      accessorKey: 'username',

    },
    {
      header:'EMAIL',
      accessorKey: 'email',

    },
    {
      header:'PHONE NUMBER',
      accessorKey: 'phone',
      accessorFn: (row:any) => (row.profile.phone),
    },
    {
      header:'DATE JOINED',
      accessorKey: 'createdAt',
    },
    {
      header:'STATUS',
      accessorKey: 'status',
      accessorFn: (row: any) => {
        const status:string = typeof(JSON.stringify(row.status))
        return(
          <button id={row.id} className='status'>
            {status}
          </button>
        )
        // console.log(typeof(JSON.stringify(row.status[0])))
      }
    },
    {
      header:'Actions',
      cell: ({row}:any) => (
        <span id={row.id} className='popup-action'>
          <BsThreeDotsVertical onClick={() => togglePopUp(row.id)} />
          {activeRow === row.id && (
            <div className='popup'>
              <p><BsEye /> View Details</p>
              <p><FiUserX /> Blacklist User</p>
              <p><RiUserFollowLine /> Activate User</p>
            </div>
          )}
        </span>
      ),

    }
  ]
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
            <div className='table-wrapper'>
              <BasicTable data={data} columns={columns} rowsPerPage={10}/>
            </div>
        </div>
    </Layout>
  );
};

export default Users;
