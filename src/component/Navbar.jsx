import React, { useState } from 'react'
import ImagePujasera from "../assets/image/pujasera.png"
import ButtonBasic from './ButtonBasic'
import { useDispatch, useSelector } from 'react-redux'
import { authActions } from '../redux/auth'
import {
    ShoppingCartOutlined,
    UserOutlined
} from '@ant-design/icons';
import { Drawer, Button, Form, Input, Badge, message, Modal } from 'antd';
import { cartActions } from '../redux/cart'
import { useNavigate, Link } from 'react-router-dom'
import { ROUTES } from '../constant/routesConstant'


export default function Navbar() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const customerExist = useSelector((state) => state.cart.customer)
    const tableExist = useSelector((state) => state.cart.meja)

    //modal
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
                <div className='flex justify-between w-full items-center mx-10'>
                    <Link to={ROUTES.PORTAL_RESTO}>
                        <img src={ImagePujasera} alt="image-pujasera" className='w-[200px]' />
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
                {/* <Form
                    name="basic"
                    onFinish={onFinish}
                    autoComplete="off"
                    layout='vertical'
                >
                    <Form.Item
                        label="Customer"
                        name="customer"
                        placeholder="eg.ayu"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your name',
                            },
                        ]}
                    >
                        <Input placeholder="eg. ayu" onChange={onChange} value={customerData.customer} />
                    </Form.Item>

                    <Form.Item
                        label="Table"
                        name="meja"
                        rules={[
                            {
                                required: true,
                                message: 'Please input table',
                            },
                        ]}
                    >
                        <Input placeholder="eg. 10" onChange={onChange} value={customerData.meja} />
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
                </Form> */}
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
                                {
                                    required: true,
                                    message: 'Please input your name',
                                },
                            ]}
                        >
                            <Input onChange={onChange} value={customerData.customer} />
                        </Form.Item>

                        <Form.Item
                            label="Table"
                            name="meja"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input table',
                                },
                            ]}
                        >
                            <Input onChange={onChange} value={customerData.meja} />
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
                    <div>
                        <p><span className='font-bold'>Customer :</span> {customerExist}</p>
                        <p><span className='font-bold'>Table :</span> {tableExist}</p>
                    </div>
                )}

            </Drawer>
            <Modal title="Logout" open={isModalOpen} onOk={logoutClick} onCancel={handleCancel} okType='danger'>
                <p>Are you sure you want to exit?</p>
            </Modal>
        </>

    )
}
