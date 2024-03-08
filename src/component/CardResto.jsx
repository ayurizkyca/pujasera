import React from 'react';
import { Card } from 'antd';


const CardResto = ({ id, title, description, onClick }) => (
    <Card
        onClick={() => onClick(id)
        }
        hoverable
        title={title}
        bordered={false}
        style={{
            width: 300,
        }}
    >
        <p>{description}</p>
    </Card>
);

export default CardResto;
