import React from 'react';
import { Card, Typography, Tooltip } from 'antd';
const { Meta } = Card;
import ButtonBasic from './ButtonBasic';
import { formatRupiah } from '../util/format';

const CardMenu = ({ name, description, imageUrl, price, onClick }) => {

  return (
    <div className=''>
      <Card
        hoverable
        style={{
          width: 240,
        }}
        cover={<img className='h-[200px] object-cover' alt="card-image" src={imageUrl} />}
      >
        <div className='flex flex-col justify-between h-full'>
          <div>
            <Meta title={name} description={
              <Tooltip title={description}>
                <div className="line-clamp-2">{description}</div>
              </Tooltip>
            }
            />
            <Typography.Title level={4} className='mt-5 font-bold text-end '>{formatRupiah(price)}</Typography.Title>
          </div>
          <ButtonBasic title={"add to cart"} onClick={onClick} />
        </div>
      </Card>
    </div>
  )
}

export default CardMenu;
