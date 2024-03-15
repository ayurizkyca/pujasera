import React from 'react';
import { Card, Typography, Tooltip, Button } from 'antd';
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
          <div className='space-y-[2vh]'>
            <Meta title={name} description={
              <Tooltip title={description}>
                <div className="line-clamp-2">{description}</div>
              </Tooltip>
            }
            />
            <h1 className='mt-5 font-bold text-xl text-end text-primary'>{formatRupiah(price)}</h1>
            <ButtonBasic title={"add to cart"} onClick={onClick} textColor={'primary'} color={'secondary'} />
            {/* <Button className="bg-secondary text-primary w-full font-bold border-none hover:bg-primary">add to chart</Button> */}
          </div>
        </div>
      </Card>
    </div>
  )
}

export default CardMenu;
