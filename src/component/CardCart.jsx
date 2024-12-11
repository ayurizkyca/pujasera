import React, { useState } from 'react';
import { ShoppingOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import ListMenuCart from './ListMenuCart';
import { cartActions } from '../redux/cart';
import { Modal, message } from 'antd';
import { formatRupiah } from '../util/format';
import { menuActions } from '../redux/menu';
import ButtonBasic from './ButtonBasic';


const CardCart = () => {
  const [showModalDecrement, setShowModalDecrement] = useState(false);
  const listMenu = useSelector((state) => state.cart.menuItem);
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
    if (qty > 1) {
      dispatch(cartActions.decrementQuantity({ idResto, idMenu }));
      dispatch(menuActions.updateStock({ idResto, idMenu: idMenu, stock: stock + 1 }));
    } else {
      Modal.confirm({
        title: "Confirm",
        content: "Are you sure you want to delete this item?",
        okText: "Yes",
        cancelText: "No",
        okType: "danger",
        okButtonProps:{
          style: {
            color: "white",
            backgroundColor: "#C2161E",
            borderColor: "#C2161E",
          }
        },
        cancelButtonProps:{
          style: {
            color: "#C2161E",
            backgroundColor: "#FEEBE9",
            borderColor: "#FEEBE9",
          }
        },
        onOk: () => {
          dispatch(cartActions.decrementQuantity({ idResto, idMenu }));
          dispatch(menuActions.updateStock({ idResto, idMenu: idMenu, stock: stock + 1 }))
        }
      })
    }
  };

  const okeDelete = () => {
    setShowModalDecrement(false)
  }

  const deleteItem = (idResto, idMenu, qty, stock) => {
    Modal.confirm({
      title: "Confirm",
      content: "Are you sure you want to delete this item?",
      okText: "Yes",
      cancelText: "No",
      okType: "danger",
      okButtonProps:{
        style: {
          color: "white",
          backgroundColor: "#C2161E",
          borderColor: "#C2161E",
        }
      },
      cancelButtonProps:{
        style: {
          color: "#C2161E",
          backgroundColor: "#FEEBE9",
          borderColor: "#FEEBE9",
        }
      },
      onOk: () => {
        dispatch(cartActions.deleteMenu({ idResto, idMenu }))
        dispatch(menuActions.updateStock({ idResto, idMenu: idMenu, stock: stock + qty }))
        message.success("item deleted")
      }
    })
  }
  // console.log("id resto", idResto)
  // console.log("id menu", idMenu)
  // console.log("qty", qty)
  // console.log("stock", stock)
  // dispatch(cartActions.deleteMenu({ idResto, idMenu }))
  // dispatch(menuActions.updateStock({ idResto, idMenu: idMenu, stock: stock + qty }));
  // message.success("item deleted")

return (
  <div>
    <div className='rounded-md px-5 py-2 m-5 space-y-3'>
      <ul className='gap-2'>
        {listMenu.map(resto => (
          <div className='border p-4' key={resto.idResto}>
            <div className='flex gap-2'>
              <ShoppingOutlined />
              <h1 className='font-medium'>{resto.namaResto}</h1>
            </div>
            {resto.menu.map(menu => (
              <ListMenuCart
                key={menu.id}
                namaMenu={menu.namaMenu}
                harga={menu.harga}
                qty={menu.qty}
                stock={menu.stock}
                subTotal={menu.qty * menu.harga}
                // incrementClick={() => incrementQuantity(resto.idResto, menu.idMenu, menu.stock)}
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
      onOk={okeDelete}
      onCancel={() => setShowModalDecrement(false)}
      footer={false}
    >
      <p>Are you sure you want to delete this item?</p>
      <div className='flex gap-1 justify-end'>
        <ButtonBasic title={"No"} textColor={"primary"} color={"secondary"} fontWeight={"semibold"} onClick={() => setShowModalDecrement(false)} />
        <ButtonBasic title={"Yes"} onClick={okeDelete} textColor={"white"} color={"primary"} fontWeight={"semibold"} />
      </div>
    </Modal>
  </div>
);
}

export default CardCart;

