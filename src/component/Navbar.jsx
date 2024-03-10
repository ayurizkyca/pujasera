import React, { useState } from 'react'
import ImagePujasera from "../assets/image/pujasera.png"
import ButtonBasic from './ButtonBasic'
import { useDispatch, useSelector } from 'react-redux'
import { authActions } from '../redux/auth'
import {
    ShoppingCartOutlined,
    UserOutlined
} from '@ant-design/icons';
import { Drawer, Button, Form, Input, Badge } from 'antd';
import { cartActions } from '../redux/cart'
import { useNavigate } from 'react-router-dom'
import { ROUTES } from '../constant/routesConstant'


export default function Navbar() {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logoutClick = () => {
        dispatch(authActions.logout());
    }

    //drawer
    const [open, setOpen] = useState(false);
    const showDrawer = () => {
        setOpen(true);
    };
    const onClose = () => {
        setOpen(false);
    };
    const [customerData, setCustomerData] = useState({
        customer: "",
        meja: ""
    });
    const onFinish = (values) => {
        dispatch(cartActions.addCustomer(values));
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
            <div className='flex justify-between border h-[80px] shadow-lg shadow-slate-200 sticky'>
                <div className='flex justify-between w-full items-center mx-10'>
                    <img src={ImagePujasera} alt="image-pujasera" className='w-[200px]' />
                    <div>
                        <div className='flex gap-5 items-center'>
                            <Badge className='' count = {cartItemCount}>
                                <ShoppingCartOutlined className='w-5' onClick={showCart} />
                            </Badge>
                            <div className='flex gap-2'>
                                <p>{username}</p>
                                <UserOutlined onClick={showDrawer} />
                            </div>
                            <ButtonBasic title={"Logout"} onClick={logoutClick} />
                        </div>
                    </div>
                </div>
            </div>
            <Drawer title="Input Customer Data" onClose={onClose} open={open}>
                <Form
                    name="basic"
                    onFinish={onFinish}
                    // onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Form.Item
                        label="Customer"
                        name="customer"
                    >
                        <Input onChange={onChange} value={customerData.customer} />
                    </Form.Item>

                    <Form.Item
                        label="Meja"
                        name="meja"
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
            </Drawer>
        </>

    )
}
