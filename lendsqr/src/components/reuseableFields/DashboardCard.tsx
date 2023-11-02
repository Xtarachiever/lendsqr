import * as React from 'react';

interface IDashboardCardProps {
    imgUrl: string;
    title: string;
    analytics: string;
}

const DashboardCard: React.FunctionComponent<IDashboardCardProps> = ({imgUrl, title, analytics}) => {
  return (
    <div className='card-wrapper'>
        <img src={imgUrl} alt='icon'/>
        <p className='title'>{title}</p>
        <p className='analytics'>{analytics}</p>
    </div>
  );
};

export default DashboardCard;
