import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CardCart from '../component/CardCart';
import ListMenuCart from '../component/ListMenuCart';
import ButtonBasic from '../component/ButtonBasic';
import logo from "../assets/image/pujasera.png"
import { cartActions } from '../redux/cart';
import { Modal, message } from 'antd';
import { useNavigate, Link } from 'react-router-dom';
import { ROUTES } from '../constant/routesConstant';
import { formatRupiah } from '../util/format';

const CartPage = () => {
  const total = useSelector((state) => state.cart.total)
  const customer = useSelector((state) => state.cart.customer)
  const table = useSelector((state) => state.cart.meja);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleCheckout = () => {
    setIsModalOpen(false);
    setTimeout(() => {
      navigate(ROUTES.PORTAL_RESTO);
      dispatch(cartActions.clearCart());
      message.info("Checkout Success, Please wait for your food at the table.")
    }, 800)
  }

  //modal checkout
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    if (total > 0) {
      setIsModalOpen(true);
    } else {
      message.error("The shopping cart is empty.")
    }
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleToPortal = () => {
    navigate(ROUTES.PORTAL_RESTO)
  }

  return (
    <div className='h-screen flex flex-col'>
      <div className='flex h-[80px] items-center justify-between p-8 shadow'>
        <Link to={ROUTES.PORTAL_RESTO}>
          <img src={logo} alt="logo" className='w-[100px] md:w-[200px]' />
        </Link>
        <h1 className='md:text-2xl'>Shopping Cart</h1>
      </div>
      <div className='px-8 py-3'>
        <h1 className='text-xl font-medium'>Customer : {customer}</h1>
        <h1 className='text-xl font-medium'>Table : {table}</h1>
      </div>
      <ul className='flex-grow'>
        <CardCart />
      </ul>
      <div className='sticky bottom-0 bg-white border-t border-primary p-4 flex justify-between items-center'>
        <div className='md:flex md:items-center md:justify-center'>
          <h3 className=''>Grand Total : </h3>
          <h3 className='font-bold text-2xl text-primary'> {formatRupiah(total)}</h3>
        </div>
        <div className='flex gap-2'>
          <ButtonBasic color={"secondary"} title={"Cancel"} onClick={handleToPortal} textColor={"primary"} />
          <ButtonBasic color={"primary"} title={"Checkout"} onClick={showModal} textColor={"white"} />
        </div>
      </div>
      <Modal
        title="Checkout"
        open={isModalOpen}
        onOk={handleCheckout}
        onCancel={handleCancel}
        okType='danger'
        footer={false}
      >
        <p className='pb-2'>Please ensure your order is correct. Proceed to checkout now?</p>
        <div className='flex justify-end gap-1'>
          <ButtonBasic color={"secondary"} title={"Cancel"} onClick={handleCancel} textColor={"primary"} />
          <ButtonBasic color={"primary"} title={"Yes"} onClick={handleCheckout} textColor={"white"} />
        </div>
      </Modal>
    </div>
  );
};

export default CartPage;
