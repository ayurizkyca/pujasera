import React from 'react';
import { useSelector } from 'react-redux';
import CardCart from '../component/CardCart';
import ListMenuCart from '../component/ListMenuCart';

const CartMenuList = () => {
    const menuItem = useSelector(state => state.cart.menuItem);
    const total = useSelector((state) => state.cart.total)

    return (
        <div>
            <h2>Daftar Menu</h2>
            <ul>
                {menuItem.map(resto => (
                    <CardCart 
                        key={resto.idResto}
                        namaResto={resto.namaResto}
                    >
                        {resto.menu.map(menu => (
                            <ListMenuCart
                                key={menu.idMenu}
                                namaMenu={menu.namaMenu}
                                harga={menu.harga}
                                qty={menu.qty}
                                subTotal={menu.qty * menu.harga}
                            />
                        ))}
                    </CardCart>
                ))}
            </ul>
            <h3>Total: Rp. {total}</h3>
        </div>
    );
};

export default CartMenuList;
