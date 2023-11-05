import React, {useState, useContext, useEffect} from 'react';
import { userContext } from '../../../App';
import Layout from '../../layout/Layout';
import { HiOutlineArrowNarrowLeft } from 'react-icons/hi'
import Button from '../../reuseableFields/Button';
import { BiUser } from 'react-icons/bi';
import { AiOutlineStar, AiFillStar } from 'react-icons/ai';
import UserTab, { UserTabContent } from '../../reuseableFields/tabs/TabContent';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

interface ISingleUserProps {
}

const SingleUser: React.FunctionComponent<ISingleUserProps> = (props) => {
  const { username } = useParams<any>();
  const navigate = useNavigate();
  const data = useContext(userContext);
  const [tabName, setTabName] = useState<string>('General Details');


  return (
    <Layout>
        <div className='app-wrapper single-user-div'>
          <div className='back' onClick={()=>navigate('/dashboard/users')}>
            <p className=''><HiOutlineArrowNarrowLeft /> Back to Users</p>
          </div>
          <div className='header'>
            <p>User Details</p>
            <div className='buttons'>
              <Button type='button' name='BLACKLIST USER' />
              <Button type='button' name='ACTIVATE USER' color='white'/>
            </div>
          </div>
          <div className='tab-wrapper'>
            <div className='tab-header'>
              <div className='user-preview'>
                <div className='user-icon'>
                  <BiUser color='#213F7D' fontSize={'3rem'}/>
                </div>
                <div className='user-details'>
                  <div className='section section1'>
                    <p className='name'>Grace Fish</p>
                    <p className='code'>LSQFf587g90</p>
                  </div>
                  <div className='section section2'>
                    <p>User's Tier</p>
                    <div className='rating'><AiFillStar /> <AiOutlineStar /> <AiOutlineStar /></div>
                  </div>
                  <div className='section section3'>
                    <p className='price'>₦200,000.00</p>
                    <p className='bank-details'>9912345678/Providus Bank</p>
                  </div>
                </div>
              </div>
              <div className='tab-options'>
                {
                  UserTabContent.map(({title,id})=>(
                    <p onClick={()=>setTabName(title)} className={`${tabName === title ? 'activeTab' : ''}`}>{title}</p>
                  ))
                }
              </div>
            </div>
            <div className='tab-content-wrapper'>
               <div>
                  <UserTab activeTabName={tabName} username={username} data={data}/>
               </div>
            </div>
          </div>
        </div>
    </Layout>
  );
};

export default SingleUser;
