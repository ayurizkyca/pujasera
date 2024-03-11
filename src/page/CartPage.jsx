import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CardCart from '../component/CardCart';
import ListMenuCart from '../component/ListMenuCart';
import ButtonBasic from '../component/ButtonBasic';
import logo from "../assets/image/pujasera.png"
import { cartActions } from '../redux/cart';
import { Modal, message } from 'antd';

const CartPage = () => {
    const menuItem = useSelector(state => state.cart.menuItem);
    const total = useSelector((state) => state.cart.total)
    const cartItemCount = useSelector((state) => state.cart.menuItem.reduce((acc, resto) => acc + resto.menu.length, 0));
    const customer = useSelector((state) => state.cart.customer)
    const meja = useSelector((state) => state.cart.meja);
    const dispatch = useDispatch();
    const handleCheckout = () => {
        dispatch(cartActions.clearCart());
        setIsModalOpen(false);
        setTimeout(() => {
            message.info("Silahkan menunggu makanan di meja")
        }, 800)
    }

    const incrementQuantity = (idResto, idMenu) => {
        dispatch(cartActions.incrementQuantity({ idResto, idMenu }));
    };

    const decrementQuantity = (idResto, idMenu) => {
        dispatch(cartActions.decrementQuantity({ idResto, idMenu }));
    };

    //modal
    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        if(total>0){
            setIsModalOpen(true);
        }else{
            message.error("Keranjang belanja masih kosong")
        }
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    return (
        <div className='h-screen flex flex-col'>
            <div className='flex h-24 items-center justify-between p-8 shadow'>
                <img src={logo} alt="logo" />
                <h1 className='text-2xl'>Keranjang Belanja</h1>
            </div>
            <div className='px-8 py-3'>
                <h1 className='text-xl font-medium'>Customer : {customer}</h1>
                <h1 className='text-xl font-medium'>Meja : {meja}</h1>
            </div>
            <ul className=' flex-grow'>
                {menuItem.map(resto => (
                    <CardCart
                        key={resto.idResto}
                        namaResto={resto.namaResto}
                    >
                        {resto.menu.map(menu => (
                            <ListMenuCart
                                key={menu.id}
                                namaMenu={menu.namaMenu}
                                harga={menu.harga}
                                qty={menu.qty}
                                subTotal={menu.qty * menu.harga}
                                incrementClick={() => incrementQuantity(resto.id, menu.id)}
                                decrementClick={() => decrementQuantity(resto.id, menu.id)}
                            />
                        ))}
                    </CardCart>
                ))}
            </ul>
            <div className='sticky bottom-0 bg-white border-t border-primary p-4 flex justify-between items-center'>
                <h3 className=''>Total ({cartItemCount}) produk : <span className='font-bold text-2xl text-primary'>Rp. {total}</span></h3>
                <ButtonBasic className="" title={"checkout"} onClick={showModal} />
            </div>
            <Modal title="Checkout" open={isModalOpen} onOk={handleCheckout} onCancel={handleCancel} okType='danger'>
                <p>Pastikan pesanan sudah benar, checkout sekarang?</p>
            </Modal>
        </div>
    );
};

export default CartPage;
