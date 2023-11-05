import * as React from 'react';
import {useContext } from 'react';
import Layout from '../../layout/Layout';
import DashboardCard from '../../reuseableFields/DashboardCard';
import './styles.scss';
import BasicTable from '../../reuseableFields/table/Table';
import { useState } from 'react';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { AiOutlineEye } from 'react-icons/ai'
import { FiUserX } from 'react-icons/fi';
import { RiUserFollowLine } from 'react-icons/ri';
import Select from '../../reuseableFields/Select';
import TextInput from '../../reuseableFields/TextInput';
import { useForm } from 'react-hook-form';
import Button from '../../reuseableFields/Button';
import { useNavigate } from 'react-router-dom';
import { userContext } from '../../../App';
interface IUsersProps {
}

const Users: React.FunctionComponent<IUsersProps> = (props) => {
  const data = useContext(userContext)
  const navigate = useNavigate();
  
  const {register, reset, handleSubmit} = useForm({
    mode: 'all',
    defaultValues: {
        Organization: '',
        username:'',
        email:'',
        date: '',
        phoneNumber:'',
        Status:''
    },
  });

  const [activeRow, setActiveRow] = useState<string>('');
  const [filterPopUp, setFilterPopUp] = useState<boolean>(false);

  const togglePopUp = (rowId:string,row:any) => {
    console.log(row.original)
    if (activeRow === rowId) {
      setActiveRow(''); // Close the popup if it's already open
    } else {
      setActiveRow(rowId); // Open the popup for the clicked row
    }
  };


const viewUserDetails = (username:string) =>{
  navigate(`/dashboard/users/${username}`)
}

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
          <BsThreeDotsVertical onClick={() => togglePopUp(row.id,row)} />
          {activeRow === row.id && (
            <div className='popup'>
              <p onClick={()=>viewUserDetails(row.original.username)}><AiOutlineEye fontSize={'1.3rem'} className='eye'/> View Details</p>
              <p><FiUserX /> Blacklist User</p>
              <p><RiUserFollowLine /> Activate User</p>
            </div>
          )}
        </span>
      ),

    }
  ]
const onSubmit = (data:any) =>{
  // e.preventDefault();
  console.log(data);

  // return data
}

const organizations = ['Irorun', 'Lendsqr']
  return (
    <Layout>
        <div className='app-wrapper users-wrapper'>
            <p className='header'>Users</p>
            <div className='analytics-wrapper'>
                <DashboardCard  title='USERS' analytics='2,453' imgUrl='/user-icon.svg'/>
                <DashboardCard  title='ACTIVE USERS' analytics='2,453' imgUrl='/active-users-icon.svg'/>
                <DashboardCard  title='USERS WITH LOANS' analytics='12,453' imgUrl='/users-loan.svg'/>
                <DashboardCard  title='USERS WITH SAVINGS' analytics='102,453' imgUrl='/users-saving.svg'/>
            </div>
            <div className='table-wrapper'>
              <BasicTable data={data} columns={columns} rowsPerPage={10} setFilterPopUp={setFilterPopUp} filterPopUp={filterPopUp}/>
              {
                filterPopUp ?
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className='filter-wrapper'>
                    <div className='filter-div'>
                      <Select defaultValue='Select' value='' values={organizations} name='Organization' register={register}/>
                      <div>
                        <p>Username</p>
                        <TextInput register={register} placeholder='User' type='text' name='username'/>
                      </div>
                      <div>
                        <p>Email</p>
                        <TextInput register={register} placeholder='Email' type='text' name='email'/>
                      </div>
                      <div>
                        <p>Date</p>
                        <TextInput register={register} placeholder='Date' type='date' name='date'/>
                      </div>
                      <div>
                        <p>Phone Number</p>
                        <TextInput register={register} placeholder='Phone Number' type='text' name='phoneNumber'/>
                      </div>
                      <Select defaultValue='Select' values={data[0]?.statuses} value='Status' name='Status' register={register}/>
                      <div className='buttons'>
                        <Button name='Reset' type='button' color='white' onClick={()=>reset()} />
                        <Button name='Filter' type='submit'/>
                      </div>
                    </div>
                  </div>
                </form>
                : <></>
              }
            </div>
        </div>
    </Layout>
  );
};

export default Users;
