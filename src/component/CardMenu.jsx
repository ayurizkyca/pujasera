import React from 'react';
import { Card, Typography } from 'antd';
const { Meta } = Card;
import ButtonBasic from './ButtonBasic';
import { useDispatch } from 'react-redux';
import { cartActions } from '../redux/cart';

const CardMenu = ({ id, name, description, imageUrl, price , idResto, namaResto }) => {
  const dispatch = useDispatch();

  const addToCartHandler = () => {
    dispatch(cartActions.addMenuToCart({id, name, price, idResto, namaResto}));
    console.log({id, name, price});
  }

  return (
    <div>
      <Card
        hoverable
        style={{
          width: 240,
        }}
        cover={<img className='h-[200px] object-cover' alt="card-image" src={imageUrl} />}
      >
        <Meta title={name} description={description} />
        <Typography.Title level={4} className='mt-5 font-bold text-end '>{price}</Typography.Title>
        <ButtonBasic title={"add to cart"} onClick={addToCartHandler}/>
      </Card>
    </div>
  )
}

export default CardMenu
