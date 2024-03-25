import React, { useState } from 'react';
import { ShoppingOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import ListMenuCart from './ListMenuCart';
import { cartActions } from '../redux/cart';
import { Modal, message } from 'antd';
import { formatRupiah } from '../util/format';
import { menuActions } from '../redux/menu';


const CardCart = () => {
  const [showModalDecrement, setShowModalDecrement] = useState(false);
  const listMenu = useSelector((state) => state.cart.menuItem);
  const stock = useSelector((state) => state.menu.stock);
  const dispatch = useDispatch();

  const incrementQuantity = (idResto, idMenu, stock) => {
    if (stock > 0) {
      dispatch(cartActions.incrementQuantity({ idResto, idMenu }));
      dispatch(menuActions.updateStock({ idResto, idMenu: idMenu, stock: stock - 1 }));
    } else {
      message.error("Item out of stock")
    }
  };

  const decrementQuantity = (idResto, idMenu, stock, qty) => {
    dispatch(cartActions.decrementQuantity({ idResto, idMenu }));
    if (qty > 1) {
      dispatch(menuActions.updateStock({ idResto, idMenu: idMenu, stock: stock + 1 }));
    } else {
      // dispatch(cartActions.deleteMenu({ idResto, idMenu }))
    }
  };

  const deleteItem = (idResto, idMenu, qty, stock) => {
    console.log("id resto", idResto)
    console.log("id menu", idMenu)
    console.log("qty", qty)
    console.log("stock", stock)
    dispatch(cartActions.deleteMenu({ idResto, idMenu }))
    dispatch(menuActions.updateStock({ idResto, idMenu: idMenu, stock: stock + qty }));
  }

  return (
    <div>
      <div className='rounded-md px-5 py-2 m-5 space-y-3'>
        <ul className='gap-2'>
          {listMenu.map(resto => (
            <div className='border p-4' key={resto.idResto}>
              {/* <div className='flex justify-between'> */}
              <div className='flex gap-2'>
                <ShoppingOutlined />
                <h1 className='font-medium'>{resto.namaResto}</h1>
              </div>
              {/* </div> */}
              {resto.menu.map(menu => (
                <ListMenuCart
                  key={menu.id}
                  namaMenu={menu.namaMenu}
                  harga={menu.harga}
                  qty={menu.qty}
                  stock={menu.stock}
                  subTotal={menu.qty * menu.harga}
                  incrementClick={() => incrementQuantity(resto.idResto, menu.idMenu, menu.stock)}
                  decrementClick={() => decrementQuantity(resto.idResto, menu.idMenu, menu.stock, menu.qty)}
                  deleteItemClick={() => deleteItem(resto.idResto, menu.idMenu, menu.qty, menu.stock)}
                />
              ))}
              <div className='flex justify-between pt-2'>
                <h1 className=''>Total Resto : </h1>
                <h1 className='font-semibold text-primary'>{formatRupiah(resto.subtotal)}</h1>
              </div>
            </div>
          ))}
        </ul>
      </div>
      <Modal
        title="Delete Confirmation"
        open={showModalDecrement}
        onOk={() => setShowModalDecrement(false)}
        onCancel={() => setShowModalDecrement(false)}
      >
        <p>Are you sure you want to delete this item?</p>
      </Modal>
    </div>
  );
}

export default CardCart;

