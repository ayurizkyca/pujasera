import React from 'react';
import Accordion from '../component/Accordion';
import { Typography } from 'antd';

const ReportPage = () => {

  return (
    <div className='space-y-2'>
      <Typography.Title>Report Page</Typography.Title>
      <div className='overflow-auto'>
        <Accordion />
      </div>
    </div>
  );
};

export default ReportPage;
