import React, { useState } from 'react'
import CardMenu from '../component/CardMenu.jsx'
import { restoData } from '../../public/data/restoData.js'
import { useParams } from 'react-router-dom'
import { Typography, Modal, Form, Input, message, Button } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { cartActions } from '../redux/cart.js'
import ButtonBasic from '../component/ButtonBasic.jsx'
import UploadCustom from '../component/UploadCustom.jsx'
import { menuActions } from '../redux/menu.js'


const RestoMenuPage = () => {
    const { id } = useParams();
    // const resto = restoData.find((r) => r.id === id);
    const dispatch = useDispatch();
    const isCustEmpty = useSelector((state) => state.cart.isCustEmpty)
    const resto = useSelector((state) => state.menu.resto);
    const restoMenu = resto.find((r) => r.id === id);

    const addToCartHandler = (idResto, namaResto, id, name, price) => {
        if (isCustEmpty === true) {
            dispatch(cartActions.toggleDrawer(false));
            dispatch(cartActions.addMenuItem({ idResto, namaResto, idMenu: id, namaMenu: name, harga: price, qty: 1 }));
        } else {
            dispatch(cartActions.addMenuItem({ idResto, namaResto, idMenu: id, namaMenu: name, harga: price, qty: 1 }));
            message.success("item added");
        }
    };

    const [isAddMenuOpen, setIsAddMenuOpen] = useState(false);
    const showAddMenu = () => {
        setIsAddMenuOpen(true);
    };

    const [menuData, setMenuData] = useState({
        name: "",
        description: "",
        imageUrl: "",
        price: "",
        stock: ""
    })

    const onChange = (event) => {
        setMenuData({
            ...menuData,
            [event.target.name]: event.target.value,
        });
    };

    const handleAddMenu = (values) => {
        dispatch(menuActions.addMenu({
            idResto: id, 
            // menu: { ...menuData }
            menu: values

        }));
        message.success("successfully added menu");
        setIsAddMenuOpen(false);
        console.log(values)
    };

    return (
        <>
            <div className='flex justify-between'>
                <Typography.Title level={3}>{resto?.title}</Typography.Title>
                <div className='flex gap-2'>
                    <ButtonBasic title={"Edit Menu"} color={"secondary"} textColor={"primary"} />
                    <ButtonBasic title={"Add Menu"} color={"secondary"} textColor={"primary"} onClick={showAddMenu} />
                </div>
            </div>
            <div>
                {restoMenu && (
                    <div>
                        <Typography.Title level={3}>Menu Resto</Typography.Title>
                        <div className='flex flex-wrap gap-2'>
                            {restoMenu.menus.map(card => (
                                <CardMenu
                                    key={card.id}
                                    name={card.name}
                                    description={card.description}
                                    imageUrl={card.imageUrl}
                                    id={card.id}
                                    price={card.price}
                                    stock={card.stock}
                                    onClick={() => addToCartHandler(resto.id, resto.title, card.id, card.name, card.price)}
                                />
                            ))}
                        </div>
                    </div>
                )}
            </div>
            <Modal title="Add Menu Resto" open={isAddMenuOpen} okType='danger' onCancel={() => setIsAddMenuOpen(false)}>
                <Form className='m-2 mt-5'
                    name="basic"
                    onFinish={handleAddMenu}
                    autoComplete="off"
                    layout='vertical'
                >
                    <Form.Item
                        label="Name"
                        name="name"
                    >
                        <Input onChange={onChange} value={menuData.name} required />
                    </Form.Item>
                    <Form.Item
                        label="Description"
                        name="description"
                    >
                        <Input onChange={onChange} value={menuData.description} required />
                    </Form.Item>
                    <Form.Item
                        label="Image"
                        name="imageUrl"
                    >
                        <Input onChange={onChange} value={menuData.imageUrl} required />
                        {/* <UploadCustom /> */}
                    </Form.Item>
                    <Form.Item
                        label="Price"
                        name="price"
                    >
                        <Input onChange={onChange} value={menuData.price} required type='number' />
                    </Form.Item>
                    <Form.Item
                        label="Stock"
                        name="stock"
                    >
                        <Input onChange={onChange} value={menuData.stock} required type='number' />
                    </Form.Item>
                    <Form.Item
                        wrapperCol={{
                            offset: 8,
                            span: 16,
                        }}
                    >
                        <Button type="primary" htmlType="submit" className='bg-primary'>
                            Add Menu
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};


export default RestoMenuPage
