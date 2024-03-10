import React from 'react';
import { useSelector } from 'react-redux';
import CardCart from '../component/CardCart';
import ListMenuCart from '../component/ListMenuCart';
import ButtonBasic from '../component/ButtonBasic';
import logo from "../assets/image/pujasera.png"

const CartPage = () => {
    const menuItem = useSelector(state => state.cart.menuItem);
    const total = useSelector((state) => state.cart.total)
    const cartItemCount = useSelector((state) => state.cart.menuItem.reduce((acc, resto) => acc + resto.menu.length, 0));


    return (
        <div>
            <div className='flex h-[100px] items-center justify-between p-[30px] shadow'>
                <img src={logo} alt="logo" />
                <h1 className='text-2xl'>Keranjang Belanja</h1>
            </div>
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
            <div className='sticky bottom-0 left-0 w-full bg-white border-t border-primary p-4 flex justify-between items-center'>
                <h3 className=''>Total ({cartItemCount}) produk : <span className='font-bold text-2xl text-primary'>Rp. {total}</span></h3>
                <ButtonBasic className="" title={"checkout"}/>
            </div>

        </div>
    );
};

export default CartPage;
