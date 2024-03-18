import React from 'react';
import Accordion from '../component/Accordion';
import { Typography } from 'antd';

const ReportPage = () => {

  return (
    <div className='space-y-2'>
      <Typography.Title level={3}>Report</Typography.Title>
      <div className='grid grid-cols-7 border p-3 text-center rounded-md bg-primary text-white font-semibold'>
        <h1>Date</h1>
        <h1>Customer</h1>
        <h1>Table</h1>
        <h1>Items</h1>
        <h1>Qty</h1>
        <h1>Restaurants</h1>
        <h1>Total</h1>
      </div>
      <div className='overflow-auto'>
        <Accordion />
      </div>
    </div>
  );
};

export default ReportPage;
