import React from 'react';
import { Input } from 'antd';
import { Typography } from 'antd';
const { Title } = Typography;

const InputBasic = ({ placeholder, title }) => (
  <div className='text-start'>
    <Title level={5}>{title}</Title>
    <Input placeholder={placeholder} />
  </div>
);
export default InputBasic;