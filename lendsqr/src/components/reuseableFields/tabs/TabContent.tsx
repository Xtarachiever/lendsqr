import React, { useState, useEffect } from 'react';
import { storeUserDetailsInIndexedDB, retrieveUserDetailsFromIndexedDB } from '../../store/DataStorage';
import './styles.scss'

interface IUserTabProps {
  activeTabName:string;
  username:any;
  data: any[];
}


const UserTab: React.FunctionComponent<IUserTabProps> = ({activeTabName, username,data}) => {
    const [retrievedData, setRetrievedData] = useState<any>(null);
    const userDetails = data?.find((user) => user.username === username);

  useEffect(()=>{
    storeUserDetailsInIndexedDB(userDetails, 'userDetails', 'username');
    const handleUserData = async () => {
      try {
        // Retrieve user details from IndexedDB
        const storedData = await retrieveUserDetailsFromIndexedDB('userDetails', username);
        setRetrievedData(storedData);
      } catch (error) {
        console.error('Error storing or retrieving user details:', error);
      }
    };
  
    handleUserData();
  },[])
  
    // console.log(retrievedData)

  return (
    <div className='tab-wrapper'>
      {
        activeTabName === 'General Details'
        ?
        <div className='sections'>
        <div className='section section-1'>
          <p className='heading'>Personal Information</p>
          <div className='details'>
             <p>FULL NAME <br /> <span>{retrievedData?.profile.name}</span></p>
             <p>PHONE NUMBER <br /> <span>{retrievedData?.profile.phone}</span></p>
             <p>EMAIL ADDRESS <br /> <span>{retrievedData?.email}</span></p>
             <p>BVN <br /> <span>{retrievedData?.profile.phone}</span></p>
             <p>GENDER <br /> <span>Female</span></p>
             <p>CHILDREN <br /> <span>None</span></p>
             <p>TYPE OF RESIDENCE <br /> <span>Parent's Apartment</span></p>
          </div>
        </div>
        <div className='section section-2'>
          <p className='heading'>Education and Employment</p>
          <div className='details'>
             <p>FULL NAME <br /> <span>{retrievedData?.profile.name}</span></p>
             <p>PHONE NUMBER <br /> <span>{retrievedData?.profile.phone}</span></p>
             <p>EMAIL ADDRESS <br /> <span>{retrievedData?.email}</span></p>
             <p>BVN <br /> <span>{retrievedData?.profile.phone}</span></p>
             <p>GENDER <br /> <span>Female</span></p>
             <p>CHILDREN <br /> <span>None</span></p>
             <p>TYPE OF RESIDENCE <br /> <span>Parent's Apartment</span></p>
          </div>
        </div>
        <div className='section section-3'>
          <p className='heading'>Socials</p>
          <div className='details'>
             <p>FULL NAME <br /> <span>{retrievedData?.profile.name}</span></p>
             <p>PHONE NUMBER <br /> <span>{retrievedData?.profile.phone}</span></p>
             <p>EMAIL ADDRESS <br /> <span>{retrievedData?.email}</span></p>
             <p>BVN <br /> <span>{retrievedData?.profile.phone}</span></p>
             <p>GENDER <br /> <span>Female</span></p>
             <p>CHILDREN <br /> <span>None</span></p>
             <p>TYPE OF RESIDENCE <br /> <span>Parent's Apartment</span></p>
          </div>
        </div>
        <div className='section section-4'>
          <p className='heading'>Guarantor</p>
          <div className='details'>
             <p>FULL NAME <br /> <span>{retrievedData?.profile.name}</span></p>
             <p>PHONE NUMBER <br /> <span>{retrievedData?.profile.phone}</span></p>
             <p>EMAIL ADDRESS <br /> <span>{retrievedData?.email}</span></p>
             <p>BVN <br /> <span>{retrievedData?.profile.phone}</span></p>
             <p>GENDER <br /> <span>Female</span></p>
             <p>CHILDREN <br /> <span>None</span></p>
             <p>TYPE OF RESIDENCE <br /> <span>Parent's Apartment</span></p>
          </div>
        </div>
        <div className='section section-2'>
          <p className='heading'>Personal Information</p>
          <div className='details'>
             <p>FULL NAME <br /> <span>{retrievedData?.profile.name}</span></p>
             <p>PHONE NUMBER <br /> <span>{retrievedData?.profile.phone}</span></p>
             <p>EMAIL ADDRESS <br /> <span>{retrievedData?.email}</span></p>
             <p>BVN <br /> <span>{retrievedData?.profile.phone}</span></p>
             <p>GENDER <br /> <span>Female</span></p>
             <p>CHILDREN <br /> <span>None</span></p>
             <p>TYPE OF RESIDENCE <br /> <span>Parent's Apartment</span></p>
          </div>
        </div>
      </div>
      : <>{activeTabName}</>
      }
    </div>
  );
};

export default UserTab;
