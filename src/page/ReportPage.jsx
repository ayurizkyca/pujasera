import React, { useState } from 'react';
import Accordion from '../component/Accordion';
import {
  Typography,
  Space,
  DatePicker,
} from 'antd';
import moment from 'moment';
import Search from 'antd/es/input/Search';
const { RangePicker } = DatePicker;

const ReportPage = () => {
  const [searchText, setSearchText] = useState('');
  const [dateRange, setDateRange] = useState([]);

  const disableFutureDates = (currentDate) => {
    return currentDate && currentDate > moment().endOf("day");
  };

  const onChangeDatePicker = (dates) => {
    if (!dates || dates.length === 0) {
      setDateRange([]);
    } else {
      setDateRange(dates.map(date => date.format('DD/MM/YYYY')));
    }
  };

  return (
    <div className='space-y-2'>
      <div className='flex justify-between'>
        <Typography.Title level={3}>Report</Typography.Title>
        <div className='flex gap-2'>
          <div>
            <Search
              placeholder='Customer or Table'
              value={searchText}
              onChange={e => setSearchText(e.target.value)}
            />
          </div>
          <Space direction="vertical" size={12}>
            <RangePicker
              onChange={onChangeDatePicker}
              format="DD/MM/YYYY"
              disabledDate={disableFutureDates}
            />
          </Space>
        </div>
      </div>
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
        <Accordion searchText={searchText} dateRange={dateRange} />
      </div>
    </div>
  );
};

export default ReportPage;

