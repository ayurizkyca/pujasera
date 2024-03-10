import React from 'react';
import { Card, Typography } from 'antd';
const { Meta } = Card;
import ButtonBasic from './ButtonBasic';
import { useDispatch } from 'react-redux';
import { cartActions } from '../redux/cart';
import { restoData } from '../../public/data/restoData';

const CardMenu = ({ id, name, description, imageUrl, price, idResto, namaResto }) => {
  const dispatch = useDispatch();

  const addToCartHandler = () => {
    dispatch(cartActions.addMenuItem({ idResto, namaResto, idMenu: id, nameMenu: name, harga: price, qty: 1 }));
  };

  const resto = restoData.find(r => r.menus.find(m => m.id === id));
  idResto = resto.id;
  namaResto = resto.title;


  // const findRestoByMenuId = (menuId) => {
  //   const menu = dataResto.find(r => r.menu.find(m => m.id === menuId));
  //   console.log(menu);
  //   return menu ? menu.name : "";
  // }

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
        <ButtonBasic title={"add to cart"} onClick={addToCartHandler} />
      </Card>
    </div>
  )
}

export default CardMenu;
