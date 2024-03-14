import React from 'react';
import { ShoppingOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import ListMenuCart from './ListMenuCart';
import { cartActions } from '../redux/cart';

const CardCart = () => {
    const listMenu = useSelector((state) => state.cart.menuItem);
    const dispatch = useDispatch();

    const incrementQuantity = (idResto, idMenu) => {
        dispatch(cartActions.incrementQuantity({ idResto, idMenu }));
        console.log("hayyuuuu tambah", idResto, idMenu);
    };

    const decrementQuantity = (idResto, idMenu) => {
        dispatch(cartActions.decrementQuantity({ idResto, idMenu }));
    };
    
    const deleteItem = (idResto, idMenu) => {
        // console.log("delete item")
        // dispatch(cartActions.deleteCustomer({ idResto, idMenu }));
        dispatch(cartActions.deleteMenu({ idResto, idMenu }))
    }

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
                                    subTotal={menu.qty * menu.harga}
                                    incrementClick={() => incrementQuantity(resto.idResto, menu.idMenu)}
                                    decrementClick={() => decrementQuantity(resto.idResto, menu.idMenu)}
                                    deleteItemClick={() => deleteItem(resto.idResto, menu.idMenu)}
                                />
                            ))}
                        </div>
                    ))}
                </ul>
                <div className='flex flex-col'>

                </div>
            </div>
        </div>
    );
}

export default CardCart;

