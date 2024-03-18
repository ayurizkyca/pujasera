import React, { useState } from 'react'
import CardMenu from '../component/CardMenu.jsx'
import { restoData } from '../../public/data/restoData.js'
import { useParams } from 'react-router-dom'
import { Typography, Modal, Form, Input } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { cartActions } from '../redux/cart.js'
import { message } from 'antd/es/index.js'
import ButtonBasic from '../component/ButtonBasic.jsx'


const RestoMenuPage = () => {
    const { id } = useParams();
    const resto = restoData.find((r) => r.id === id);
    const dispatch = useDispatch();
    const isCustEmpty = useSelector((state) => state.cart.isCustEmpty)

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

    return (
        <>
            <div className='flex justify-between'>
                <Typography.Title level={3}>{resto?.title}</Typography.Title>
                <div className='flex gap-2'>
                    <ButtonBasic title={"Edit Menu"} color={"secondary"} textColor={"primary"} />
                    <ButtonBasic title={"Add Menu"} color={"secondary"} textColor={"primary"} onClick={showAddMenu} />
                </div>
            </div>
            <div className='flex flex-wrap gap-2'>
                {resto?.menus.map(card => (
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
            <Modal title="Add Menu Resto" open={isAddMenuOpen} okType='danger' onCancel={() => setIsAddMenuOpen(false)}>
                <Form className='m-2 mt-5'
                    name="basic"
                    // onFinish={onFinish}
                    autoComplete="off"
                    layout='vertical'
                >
                    <Form.Item
                        label="Menu Name"
                        name="name"
                    >
                        <Input onChange={""} value={""} required />
                    </Form.Item>
                    <Form.Item
                        label="Description"
                        name="description"
                    >
                        <Input onChange={""} value={""} required />
                    </Form.Item>
                    <Form.Item
                        label="Image"
                        name="imageUrl"
                    >
                        <Input onChange={""} value={""} required />
                    </Form.Item>
                    <Form.Item
                        label="Price"
                        name="price"
                    >
                        <Input onChange={""} value={""} required type='number' />
                    </Form.Item>
                    <Form.Item
                        label="Stock"
                        name="stock"
                    >
                        <Input onChange={""} value={""} required type='number' />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};


export default RestoMenuPage
