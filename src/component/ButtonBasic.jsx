import React from 'react';
import { Button } from 'antd';

const ButtonBasic = ({title, onClick, color, textColor, fontWeight}) => (
  <div className="">
    <Button onClick={onClick} className={`bg-${color} text-${textColor} w-full font-${fontWeight} border-secondary`}>{title}</Button>
  </div>

);
ButtonBasic.defaultProps = {
  color: 'secondary',
  textColor: 'primary',
  fontWeight: 'bold'
}
export default ButtonBasic;