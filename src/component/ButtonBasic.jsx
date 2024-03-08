import React from 'react';
import { Button } from 'antd';

const ButtonBasic = ({title, onClick}) => (
  <div className="">
    <Button onClick={() => onClick() } className='bg-primary text-white w-full font-bold'>{title}</Button>
  </div>
);

export default ButtonBasic;