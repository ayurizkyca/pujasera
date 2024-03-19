import React from 'react';
import { Button } from 'antd';

const ButtonBasic = ({title, onClick, color, textColor}) => (
  <div className="">
    <Button onClick={onClick} className={`bg-${color} text-${textColor} w-full font-bold border-secondary`}>{title}</Button>
  </div>
);

export default ButtonBasic;