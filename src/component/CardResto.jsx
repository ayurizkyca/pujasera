import React from 'react';
import { Card } from 'antd';


const CardResto = ({ id, title, description, onClick, bgImage }) => (
  <Card
    onClick={() => onClick(id)}
    hoverable
    title={
      <span style={{
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white'
      }}>
        {title}
      </span>
    }
    bordered={false}
    style={{
      color: 'white',
      width: 300,
      backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 22, 30, 0.5)),url(${bgImage})`,
      backgroundSize: 'cover',

    }}
  >
    <p>{description}</p>
  </Card>
);

export default CardResto;
