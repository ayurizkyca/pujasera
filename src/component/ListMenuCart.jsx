import React from 'react';
import { formatRupiah } from '../util/format';
import {
  PlusCircleOutlined,
  MinusCircleOutlined,
  DeleteOutlined,
} from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { message } from 'antd';
import { cartActions } from '../redux/cart';
import { menuActions } from '../redux/menu';

const ListMenuCart = ({ id, idResto, idMenu, stock, namaMenu, harga, qty, subTotal}) => {
  const menus = useSelector((state) => state.cart.menuItem);
  const resto = menus.find((menu) => menu.idResto === idResto);
  const dispatch = useDispatch();

  const incrementClick = () => {
    if (stock > 0) {
      dispatch(cartActions.incrementQuantity({ idResto, idMenu }));
      dispatch(menuActions.updateStock({ idResto, idMenu: idMenu, stock: stock - 1 }));
      console.log("id resto", idResto)
      console.log("id menu", idMenu)
      console.log("stock", stock)
      console.log("menu", menus)
      console.log("resto", resto)
      console.log("id menu", idMenu)
    } else {
      message.error("Item out of stock")
      console.log("id resto", idResto)
      console.log("id menu", idMenu)
      console.log("stock", stock)
      // console.log("menu", menu)
      console.log("id menu", idMenu)
    }
  }
  const decrementClick = () => {}
  const deleteItemClick = () => {}

  return (
    <div className='grid grid-cols-2'>
      <h2 className=''>{namaMenu}</h2>
      <div className='grid grid-cols-5 items-center'>
        <h1>Stock : {stock}</h1>
        <h2 className=''>{formatRupiah(harga)}</h2>
        <div className='flex gap-2'>
          <MinusCircleOutlined onClick={decrementClick} />
          <h2>{qty}</h2>
          <PlusCircleOutlined onClick={incrementClick} />
        </div>
        <h2 className='font-semibold'>{formatRupiah(subTotal)}</h2>
        <div className='flex justify-end'>
          <DeleteOutlined onClick={deleteItemClick} />
        </div>
      </div>
    </div>
  )
}

export default ListMenuCart;
