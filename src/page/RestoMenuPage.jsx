import React, { useEffect, useState } from 'react'
import CardMenu from '../component/CardMenu.jsx'
import { Link, useParams } from 'react-router-dom'
import { Typography, Modal, Form, Input, message, Button } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { cartActions } from '../redux/cart.js'
import ButtonBasic from '../component/ButtonBasic.jsx'
import UploadCustom from '../component/UploadCustom.jsx'
import { menuActions } from '../redux/menu.js'
import { v4 as uuidv4 } from 'uuid';
import {
    ArrowLeftOutlined,
} from '@ant-design/icons';
import { ROUTES } from '../constant/routesConstant.jsx'


const RestoMenuPage = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const isCustEmpty = useSelector((state) => state.cart.isCustEmpty)
    const restos = useSelector((state) => state.menu.resto);
    const resto = restos.find((resto) => resto.id === id);
    const [menuToDelete, setMenuToDelete] = useState(null);
    const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);
    const [menuToEdit, setMenuToEdit] = useState(null);
    const [form] = Form.useForm();
    const [isModalEditOpen, setIsModalEditOpen] = useState(false);

    // Delete Menu
    const showDeleteConfirm = (card) => {
        setMenuToDelete(card);
        setIsModalDeleteOpen(true);
        console.log("card", menuToDelete)
    };

    const handleOkDelete = () => {
        if (menuToDelete) {
            dispatch(menuActions.deleteMenu({ idResto: id, idMenu: menuToDelete.id }));
            setIsModalDeleteOpen(false);
            setMenuToDelete(null);
            message.success("Menu Deleted");
        }
    }

    const handleCancelDelete = () => {
        setIsModalDeleteOpen(false);
    };

    // Edit Menu
    const showModalEdit = (card) => {
        setMenuToEdit(card);
        form.setFieldsValue({
            name: card.name,
            description: card.description,
            imageUrl: card.imageUrl,
            price: card.price,
            stock: card.stock
        });
        setIsModalEditOpen(true);
        console.log("id show", card.id)
    };

     const handleCancelEdit = () => {
        setIsModalEditOpen(false);
        setMenuToEdit(null);
        form.resetFields();
        console.log ("ini adalah close tapi pakai cancel")
    };

    const onFinishEdit = (values) => {
        const idMenu = uuidv4();
        dispatch(menuActions.editMenu({ 
            idResto: id, 
            idMenu: menuToEdit.id, 
            // idMenu: idMenu, 
            menu: {
                id: idMenu,
                name: values.name,
                description: values.description,
                imageUrl: values.imageUrl,
                price: values.price,
                stock: values.stock
            } 
        }));
        setIsModalEditOpen(false);
        setMenuToEdit(null);
        message.success("successfully edited menu");
        console.log("id on finish", idMenu)
    };

    useEffect(() => {
        console.log("nilai menuToEdit telah berubah", menuToEdit);
    }, [menuToEdit]);

    // Add to Cart
    const addToCartHandler = (idResto, namaResto, id, name, price, stock) => {
        console.log(" add to chart id resto", idResto)
        console.log("add to chart id menu", id)
        console.log("add to chart ini stock", stock)
        if(stock>0) {
            if (isCustEmpty === true) {
                dispatch(cartActions.toggleDrawer(false));
                dispatch(cartActions.addMenuItem({ idResto, namaResto, idMenu: id, namaMenu: name, harga: price, qty: 1 , stock}));
                // dispatch(menuActions.updateStock({ idResto, idMenu: id, stock: stock - 1 }));
                // message.success("item added");
            } else {
                dispatch(cartActions.addMenuItem({ idResto, namaResto, idMenu: id, namaMenu: name, harga: price, qty: 1, stock}));
                dispatch(menuActions.updateStock({ idResto, idMenu: id, stock: stock - 1 }));
                message.success("item added");
            }
        }else{
            message.error("item out of stock");
        }
        
    };

    // Add New Menu
    const [isAddMenuOpen, setIsAddMenuOpen] = useState(false);
    const showAddMenu = () => {
        setIsAddMenuOpen(true);
    };

    const [menuData, setMenuData] = useState({
        id : "",
        name: "",
        description: "",
        imageUrl: "",
        price: 0,
        stock: 0
    })

    const onChange = (event) => {
        setMenuData({
            ...menuData,
            [event.target.name]: event.target.value,
        });
    };

    const handleAddMenu = (values) => {
        const idMenu = uuidv4(); // Generate a UUID for idMenu
        dispatch(menuActions.addMenu({
            idResto: id,
            idMenu : idMenu,
            // menu: { ...menuData }
            menu: {
                id: idMenu,
                name: values.name,
                description: values.description,
                imageUrl: values.imageUrl,
                price: values.price,
                stock: values.stock
            }

        }));
        message.success("successfully added menu");
        setIsAddMenuOpen(false);
    };

    return (
        <>
            <div className='flex justify-between items-start'>
                <div className='flex items-start gap-5'>
                    <Link to={ROUTES.PORTAL_RESTO}>
                        <ArrowLeftOutlined className='h-[35px]' />
                    </Link>
                    <Typography.Title level={3}>{resto?.title}</Typography.Title>
                </div>
                <ButtonBasic title={"Add Menu"} color={"secondary"} textColor={"primary"} onClick={showAddMenu} />
            </div>
            <div>
                {resto && (
                    <div>
                        <div className='flex flex-wrap gap-2'>
                            {resto.menus.map(card => (
                                <CardMenu
                                    key={card.id}
                                    name={card.name}
                                    description={card.description}
                                    imageUrl={card.imageUrl}
                                    id={card.id}
                                    price={card.price}
                                    stock={card.stock}
                                    idResto={resto.id}
                                    addCart={() => addToCartHandler(resto.id, resto.title, card.id, card.name, card.price, card.stock)}
                                    deleteMenu={showDeleteConfirm}
                                    editMenu={showModalEdit}
                                />
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* Modal Add Menu */}
            <Modal title="Add Menu Resto"
                open={isAddMenuOpen}
                okType='danger'
                onCancel={() => setIsAddMenuOpen(false)}
                footer={false}
            >
                <Form className='m-2 mt-5'
                    name="basic"
                    onFinish={handleAddMenu}
                    autoComplete="off"
                    layout='vertical'
                    requiredMark={false}
                >
                    <Form.Item
                        label="Name"
                        name="name"
                        rules={[
                            { required: true, message: 'Name is required!' },
                            { min: 3, message: 'Name must be at least 3 characters!' }
                        ]}
                    >
                        <Input onChange={onChange} value={menuData.name} />
                    </Form.Item>
                    <Form.Item
                        label="Description"
                        name="description"
                        rules={[
                            { required: true, message: 'Description is required!' },
                            { min: 3, message: 'Description must be at least 3 characters!' }
                        ]}
                    >
                        <Input onChange={onChange} value={menuData.description} />
                    </Form.Item>
                    <Form.Item
                        label="Image URL"
                        name="imageUrl"
                        rules={[
                            { required: true, message: 'Image URL is required!' },
                            { type: 'url', message: 'Please enter a valid image URL' }
                        ]}
                    >
                        <Input onChange={onChange} value={menuData.imageUrl} />
                        {/* <UploadCustom /> */}
                    </Form.Item>
                    <Form.Item
                        label="Price"
                        name="price"
                        rules={[
                            { required: true, message: 'Price is required!' },
                        ]}
                    >
                        <Input onChange={onChange} value={menuData.price} type='number' />
                    </Form.Item>
                    <Form.Item
                        label="Stock"
                        name="stock"
                        rules={[
                            { required: true, message: 'Stock is required!' },
                        ]}
                    >
                        <Input onChange={onChange} value={menuData.stock} type='number' />
                    </Form.Item>
                    <Form.Item
                        wrapperCol={{ span: 20, offset: 19 }}
                    >
                        <Button type="primary" htmlType="submit" className='bg-primary'>
                            Add Menu
                        </Button>
                        {/* <ButtonBasic title={"Add Menu"} htmlType="submit" color={"secondary"} textColor={"primary"}/> */}
                    </Form.Item>
                </Form>
            </Modal>

            {/* Modal Delete Menu */}
            <Modal
                title="Delete Menu"
                open={isModalDeleteOpen}
                onOk={handleOkDelete}
                onCancel={handleCancelDelete}
                okType='danger'
                footer={false}
            >
                <p>Are you sure you want to delete this menu?</p>
                <div className='flex gap-1 justify-end'>
                    <ButtonBasic title={"No"} textColor={"primary"} color={"secondary"} fontWeight={"semibold"} onClick={handleCancelDelete} />
                    <ButtonBasic title={"Yes"} onClick={handleOkDelete} textColor={"white"} color={"primary"} fontWeight={"semibold"} />
                </div>
            </Modal>

            {/* Modal Edit Menu */}
            <Modal
                title="Edit Menu"
                open={isModalEditOpen}
                onCancel={handleCancelEdit}
                okType='danger'
                footer={false}
            >
                <Form
                    className='m-2 mt-5'
                    name="basic"
                    onFinish={onFinishEdit}
                    autoComplete="off"
                    layout='vertical'
                    form={form}
                    requiredMark={false}
                >
                    <Form.Item
                        label="Name"
                        name="name"
                        rules={[
                            { required: true, message: 'Please input the name of the menu!' },
                            { min: 3, message: 'Name must be at least 3 characters!' }
                        ]}
                    >
                        <Input  />
                    </Form.Item>
                    <Form.Item
                        label="Description"
                        name="description"
                        rules={[
                            { required: true, message: 'Please input the description of the menu!' },
                            { min: 3, message: 'Description must be at least 3 characters!' }
                        ]}
                    >
                        <Input  />
                    </Form.Item>
                    <Form.Item
                        label="Image"
                        name="imageUrl"
                        rules={[
                            { required: true, message: 'Please input the image URL of the menu!' },
                            { type: 'url', message: 'Please input a valid image URL!' }
                        ]}
                    >
                        <Input  />
                    </Form.Item>
                    <Form.Item
                        label="Price"
                        name="price"
                        rules={[
                            { required: true, message: 'Please input the price of the menu!' }
                        ]}
                    >
                        <Input type='number'  />
                    </Form.Item>
                    <Form.Item
                        label="Stock"
                        name="stock"
                        rules={[
                            { required: true, message: 'Please input the stock of the menu!' }
                        ]}
                    >
                        <Input type='number'  />
                    </Form.Item>
                    <Form.Item
                        wrapperCol={{ span: 20, offset: 18 }}
                    >
                        <Button type="primary" htmlType="submit" className='bg-primary'>
                            Update Menu
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};

export default RestoMenuPage
