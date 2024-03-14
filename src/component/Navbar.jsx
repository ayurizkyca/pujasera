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


export default function Navbar() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const customerExist = useSelector((state) => state.cart.customer);
    const tableExist = useSelector((state) => state.cart.meja);

    //modal delete Customer
    const [modalDeleteOpen, setModalDeletOpen] = useState(false);
    const showModalDelete = () => {
        setModalDeletOpen(true);
    };
    const handleCancelDelete = () => {
        setModalDeletOpen(false);
    };
    const handleDeleteCust = () => {
        dispatch(cartActions.deleteCustomer());
        message.success("Customer Deleted");
        setModalDeletOpen(false);
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
        dispatch(authActions.logout());
    }

    //drawer
    const open = useSelector((state) => state.cart.isDrawerOpen);
    const isCustEmpty = useSelector((state) => state.cart.isCustEmpty)
    const handleDrawerOpen = () => {
        dispatch(cartActions.toggleDrawer(false));
    }
    const handleDrawerClose = () => {
        dispatch(cartActions.toggleDrawer(true));
    }
    const [customerData, setCustomerData] = useState({
        customer: "",
        meja: ""
    });
    const onFinish = (values) => {
        dispatch(cartActions.addCustomer(values));
        setTimeout(() => {
            message.success("You get the table, now choose your meal");
        })
        dispatch(cartActions.toggleDrawer(true));
    };
    const onChange = (event) => {
        setCustomerData({
            ...customerData,
            [event.target.name]: event.target.value,
        });
    };

    const showCart = () => {
        navigate(ROUTES.CART);
    }
    const username = useSelector((state) => state.auth.username);
    const cartItemCount = useSelector((state) => state.cart.menuItem.reduce((acc, resto) => acc + resto.menu.length, 0));

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
                            <ButtonBasic title={"Logout"} onClick={showModal} />
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
                        >
                            <Input onChange={onChange} value={customerData.customer} required />
                        </Form.Item>

                        <Form.Item
                            label="Table"
                            name="meja"
                        >
                            <Input onChange={onChange} value={customerData.meja} required type="number"/>
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
            <Modal title="Logout" open={isModalOpen} onOk={logoutClick} onCancel={handleCancel} okType='danger'>
                <p>Are you sure want to exit?</p>
            </Modal>
            <Modal title="Delete Customer" open={modalDeleteOpen} onOk={handleDeleteCust} onCancel={handleCancelDelete} okType='danger'>
                <p>Are you sure to delete customer?<br/> It will be delete your shopping card list</p>
            </Modal>
        </>

    )
}
