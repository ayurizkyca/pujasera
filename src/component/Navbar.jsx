import React, { useState } from 'react'
import ImagePujasera from "../assets/image/pujasera.png"
import ButtonBasic from './ButtonBasic'
import { useDispatch, useSelector } from 'react-redux'
import { authActions } from '../redux/auth'
import {
  ShoppingCartOutlined,
  UserOutlined,
  DeleteOutlined,
} from '@ant-design/icons';
import { Drawer, Button, Form, Input, Badge, message, Modal } from 'antd';
import { cartActions } from '../redux/cart'
import { useNavigate, Link } from 'react-router-dom'
import { ROUTES } from '../constant/routesConstant'
import { menuActions } from '../redux/menu'


export default function Navbar() {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const customerExist = useSelector((state) => state.cart.customer);
  const tableExist = useSelector((state) => state.cart.meja);
  const menuPending = useSelector((state) => state.cart.pendingAddToCart);
  const menuItems = useSelector((state) => state.cart.menuItem)

  //modal delete Customer
  const [modalDeleteOpen, setModalDeleteOpen] = useState(false);
  const showModalDelete = () => {
    setModalDeleteOpen(true);
    console.log(menuItems)
  };
  const handleCancelDelete = () => {
    setModalDeleteOpen(false);
  };

  const handleDeleteCust = () => {
    if (!menuItems.length == 0) {
      message.error("Please Delete Menu First")
    } else {
      dispatch(cartActions.deleteCustomer());
      message.success("Customer Deleted");
      setModalDeleteOpen(false);
      setTimeout(() => {
        dispatch(cartActions.toggleDrawer(false));
      }, 800)
    }
  }

  //modal logout
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const logoutClick = () => {
    setTimeout(() => {
      dispatch(authActions.logout());
      message.success("Logout Success");
    }, 800)
  }

  //drawer
  const open = useSelector((state) => state.cart.isDrawerOpen);
  const isCustEmpty = useSelector((state) => state.cart.isCustEmpty)
  const handleDrawerOpen = () => {
    dispatch(cartActions.toggleDrawer(false));
  }
  
  const handleDrawerClose = () => {
    if (isCustEmpty && menuPending !== null) {
      dispatch(cartActions.deleteCustomer());
    }
    dispatch(cartActions.toggleDrawer(true));
  }

  const [customerData, setCustomerData] = useState({
    customer: "",
    meja: 0
  });

  //submit form customer data
  const onFinish = (values) => {
    dispatch(cartActions.addCustomer(values));
    setTimeout(() => {
      message.success("You get the table, now choose your meal");
    })
    const { idResto, idMenu, stock } = menuPending;
    if (stock > 0) {
      dispatch(menuActions.updateStock({ idResto, idMenu: idMenu, stock: stock - 1 }));
    }
    dispatch(menuActions.updateStock(idResto, idMenu, stock));
    dispatch(cartActions.toggleDrawer(false));
  };


  //input form custumer data
  const onChange = (event) => {
    setCustomerData({
      ...customerData,
      [event.target.name]: event.target.value,
    });
  };

  //navigate to cart page
  const showCart = () => {
    navigate(ROUTES.CART);
  }
  //show username in navbar
  const username = useSelector((state) => state.auth.username);

  //count qty items for cart badge
  const cartItemCount = useSelector((state) => {
    return state.cart.menuItem.reduce((acc, resto) => {
      return acc + resto.menu.reduce((acc, item) => acc + item.qty, 0);
    }, 0);
  });


  return (
    <>
      <div className='flex justify-between border h-[80px] bg-white shadow-lg shadow-slate-200 sticky top-0 z-50'>
        <div className='flex justify-between w-full items-center mx-2 lg:mx-10'>
          <Link to={ROUTES.PORTAL_RESTO}>
            <img src={ImagePujasera} alt="image-pujasera" className='w-[100px] lg:w-[200px]' />
          </Link>
          <div>
            <div className='flex gap-5 items-center'>
              <Badge className='' count={cartItemCount}>
                <ShoppingCartOutlined className='w-5' onClick={showCart} />
              </Badge>
              <div className='flex gap-2'>
                <p className='hidden md:flex'>{username}</p>
                <UserOutlined onClick={handleDrawerOpen} />
              </div>
              <ButtonBasic color={'primary'} title={"Logout"} onClick={showModal} textColor={'white'} />
            </div>
          </div>
        </div>
      </div>
      <Drawer title={isCustEmpty ? "Input Customer Detail" : "Customer Detail"} onClose={handleDrawerClose} open={open}>
        {isCustEmpty ? (
          <Form
            name="basic"
            onFinish={onFinish}
            autoComplete="off"
            layout='vertical'
          >
            <Form.Item
              label="Customer"
              name="customer"
              rules={[
                { min: 3, message: 'Customer name must be at least 3 characters!' }
              ]}
            >
              <Input onChange={onChange} value={customerData.customer} required />
            </Form.Item>

            <Form.Item
              label="Table"
              name="meja"
            >
              <Input onChange={onChange} value={customerData.meja} required type="number" />
            </Form.Item>

            <Form.Item
              wrapperCol={{
                offset: 8,
                span: 16,
              }}
            >
              <Button type="primary" htmlType="submit" className='bg-primary'>
                Get Table
              </Button>
            </Form.Item>
          </Form>
        ) : (
          <div className='flex justify-between border p-5 rounded-md'>
            <div>
              <p><span className='font-bold'>Customer :</span> {customerExist}</p>
              <p><span className='font-bold'>Table :</span> {tableExist}</p>
            </div>
            <DeleteOutlined onClick={showModalDelete} />
          </div>
        )}

      </Drawer>
      <Modal
        title="Logout"
        open={isModalOpen}
        onOk={logoutClick}
        onCancel={handleCancel}
        okType='danger'
        footer={false}
      >
        <p>Are you sure want to exit?</p>
        <div className='flex gap-1 justify-end'>
          <ButtonBasic title={"No"} textColor={"primary"} color={"secondary"} fontWeight={"semibold"} onClick={handleCancel} />
          <ButtonBasic title={"Yes"} onClick={logoutClick} textColor={"white"} color={"primary"} fontWeight={"semibold"} />
        </div>
      </Modal>
      <Modal
        title="Delete Customer"
        open={modalDeleteOpen}
        onOk={handleDeleteCust}
        onCancel={handleCancelDelete}
        okType='danger'
        footer={false}
      >
        <p>Are you sure to delete customer?<br /> It will be delete your shopping cart list</p>
        <div className='flex gap-1 justify-end'>
          <ButtonBasic title={"No"} textColor={"primary"} color={"secondary"} fontWeight={"semibold"} onClick={handleCancelDelete} />
          <ButtonBasic title={"Yes"} onClick={handleDeleteCust} textColor={"white"} color={"primary"} fontWeight={"semibold"} />
        </div>
      </Modal>
    </>

  )
}
