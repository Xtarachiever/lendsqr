import React, { useState, useEffect } from 'react';
import { storeUserDetailsInIndexedDB, retrieveUserDetailsFromIndexedDB } from '../../store/DataStorage';
import './styles.scss'

interface IUserTabProps {
  activeTabName:string;
  username:any;
  data: any[];
}


export const UserTabContent = [
  {
    id: 1,
    title: "General Details",
    TabComponent: 'hiii',
  },
  {
    id: 2,
    title: "Documents",
    TabComponent: 'hiii 2',
  },
  {
    id: 3,
    title: "Bank Details",
    TabComponent: 'hiii 3',
  },
  {
    id: 4,
    title: "Loans",
    TabComponent: 'hiii 4',
  },
  {
    id: 5,
    title: "Savings",
    TabComponent: 'hiii 5',
  },
  {
    id: 6,
    title: "App and System",
    TabComponent: 'hiii 6',
  },
]

const UserTab: React.FunctionComponent<IUserTabProps> = ({activeTabName, username,data}) => {
    const [retrievedData, setRetrievedData] = useState<any>(null);
    const userDetails = data?.find((user) => user.username === username);

    useEffect(() => {

      // Store user details in IndexedDB
      storeUserDetailsInIndexedDB(userDetails,'userDetails','username');
  
      // Retrieve user details from IndexedDB
      const usernameToRetrieve = username; // Replace with the actual username
  
      retrieveUserDetailsFromIndexedDB(usernameToRetrieve,'userDetails','username')
        .then((storedData) => {
          setRetrievedData(storedData);
        })
        .catch((error) => {
          console.error('Error retrieving user details:', error);
        });
    }, []);
  
    // console.log(retrievedData)

  return (
    <div className='tab-wrapper'>
      {
        activeTabName === 'General Details'
        ?
        <div className='sections'>
        <div className='section section-1'>
          <p>Personal Information</p>
          <div className='details'>
             <p>FULL NAME <br /> {retrievedData?.profile.name}</p>
             <p>PHONE NUMBER <br /> {retrievedData?.profile.phone}</p>
             <p>EMAIL ADDRESS <br /> {retrievedData?.email}</p>
             <p>BVN <br /> {retrievedData?.profile.phone}</p>
             <p>GENDER <br /> Female</p>
             <p>CHILDREN <br /> None</p>
             <p>TYPE OF RESIDENCE <br /> Parent's Apartment</p>
          </div>
        </div>
        <div className='section section-2'>
          <p>Personal Information</p>
          <div className='details'>
             <p>FULL NAME <br /> {retrievedData?.profile.name}</p>
             <p>PHONE NUMBER <br /> {retrievedData?.profile.phone}</p>
             <p>EMAIL ADDRESS <br /> {retrievedData?.email}</p>
             <p>BVN <br /> {retrievedData?.profile.phone}</p>
             <p>GENDER <br /> Female</p>
             <p>CHILDREN <br /> None</p>
             <p>TYPE OF RESIDENCE <br /> Parent's Apartment</p>
          </div>
        </div>
        <div className='section section-2'>
          <p>Personal Information</p>
          <div className='details'>
             <p>FULL NAME <br /> {retrievedData?.profile.name}</p>
             <p>PHONE NUMBER <br /> {retrievedData?.profile.phone}</p>
             <p>EMAIL ADDRESS <br /> {retrievedData?.email}</p>
             <p>BVN <br /> {retrievedData?.profile.phone}</p>
             <p>GENDER <br /> Female</p>
             <p>CHILDREN <br /> None</p>
             <p>TYPE OF RESIDENCE <br /> Parent's Apartment</p>
          </div>
        </div>
        <div className='section section-2'>
          <p>Personal Information</p>
          <div className='details'>
             <p>FULL NAME <br /> {retrievedData?.profile.name}</p>
             <p>PHONE NUMBER <br /> {retrievedData?.profile.phone}</p>
             <p>EMAIL ADDRESS <br /> {retrievedData?.email}</p>
             <p>BVN <br /> {retrievedData?.profile.phone}</p>
             <p>GENDER <br /> Female</p>
             <p>CHILDREN <br /> None</p>
             <p>TYPE OF RESIDENCE <br /> Parent's Apartment</p>
          </div>
        </div>
        <div className='section section-2'>
          <p>Personal Information</p>
          <div className='details'>
             <p>FULL NAME <br /> {retrievedData?.profile.name}</p>
             <p>PHONE NUMBER <br /> {retrievedData?.profile.phone}</p>
             <p>EMAIL ADDRESS <br /> {retrievedData?.email}</p>
             <p>BVN <br /> {retrievedData?.profile.phone}</p>
             <p>GENDER <br /> Female</p>
             <p>CHILDREN <br /> None</p>
             <p>TYPE OF RESIDENCE <br /> Parent's Apartment</p>
          </div>
        </div>
      </div>
      : <>{activeTabName}</>
      }
    </div>
  );
};

export default UserTab;
