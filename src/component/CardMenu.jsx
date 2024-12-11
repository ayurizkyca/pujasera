import React, { useState } from 'react';
import {
  Card,
  Input,
  Tooltip,
  Button,
  Form,
  Modal,
  message,
} from 'antd';
const { Meta } = Card;
import {
  DeleteOutlined,
  EditOutlined,
} from '@ant-design/icons';
import ButtonBasic from './ButtonBasic';
import { formatRupiah } from '../util/format';
import { useDispatch, useSelector } from 'react-redux';
import { menuActions } from '../redux/menu';
import { cartActions } from '../redux/cart.js'
import { deleteMenuFromResto, editMenuInResto, updateStock } from '../service/menuService.js';


const CardMenu = ({ id, idResto, name, description, imageUrl, price, stock }) => {
  const isCustEmpty = useSelector((state) => state.cart.isCustEmpty)
  const restos = useSelector((state) => state.menu.resto);
  const resto = restos.find((resto) => resto.id === idResto);
  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);
  const [isModalEditOpen, setIsModalEditOpen] = useState(false);
  const [form] = Form.useForm();
  const dispatch = useDispatch()
  const menuItems = useSelector((state) => state.cart.menuItem);

  // Add to Cart
  const addToCartHandler = () => {
    if (stock > 0) {
      if (isCustEmpty === true) {
        dispatch(cartActions.toggleDrawer(false));
        dispatch(cartActions.addMenuItem({ idResto, namaResto: resto.title, idMenu: id, namaMenu: name, harga: price, qty: 1, stock }));
        console.log("id resto", idResto)
      } else {
        dispatch(cartActions.addMenuItem({ idResto, namaResto: resto.title, idMenu: id, namaMenu: name, harga: price, qty: 1, stock: stock - 1 }));
        dispatch(menuActions.updateStock({ idResto, idMenu: id, stock: stock - 1 }));
        message.success("item added");
        console.log("id resto", idResto)
      }
    } else {
      message.error("item out of stock");
    }
  };

  // Delete Menu
  const showDeleteConfirm = () => {
    if (menuItems.length === 0) {
      setIsModalDeleteOpen(true);
    } else {
      message.error("Complete your order first");
    }
  };

  const handleOkDelete = () => {
    const deleteMenu = deleteMenuFromResto(restos, { restoId: idResto, menuId: id })
    dispatch(menuActions.updateMenu(deleteMenu));
    setIsModalDeleteOpen(false);
    message.success("Menu Deleted");
  }

  const handleCancelDelete = () => {
    setIsModalDeleteOpen(false);
  };

  // Edit Menu
  const showModalEdit = () => {
    if (menuItems.length === 0) {
      form.setFieldsValue({
        name: name,
        description: description,
        imageUrl: imageUrl,
        price: price,
        stock: stock
      });
      setIsModalEditOpen(true);
    } else {
      message.error("Complete your order first");
    }

  };

  const handleCancelEdit = () => {
    setIsModalEditOpen(false);
    form.resetFields();
  };

  const onFinishEdit = (values) => {
    const editData = editMenuInResto(
      restos, {
      restoId: idResto,
      menuId: id,
      menu: {
        id: id,
        name: values.name,
        description: values.description,
        imageUrl: values.imageUrl,
        price: Number(values.price),
        stock: Number(values.stock)
      }
    })
    dispatch(menuActions.updateMenu(editData));
    message.success("Menu Edited");
    setIsModalEditOpen(false);
  };

  return (
    <div className=''>
      <Card
        hoverable
        style={{
          width: 240,
        }}
        cover={
          <img className='h-[200px] object-cover'
            alt={name}
            src={imageUrl}
            onError={(e) => {
              e.target.src = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQemdrplmJ3RHsLCcP-3Wwgxs34KcEPIQR5h8T0l65ZXw&s';
            }}
          />
        }
      >
        <div className='flex flex-col justify-between h-full'>
          <div className='space-y-[2vh]'>
            <Meta
              title={
                <div className='flex justify-between'>
                  <Tooltip title={name}>
                    <h1 className='truncate'>{name}</h1>
                  </Tooltip>
                  <div>
                    <EditOutlined className=' text-black hover:text-red-700 bg-white p-1 hover:bg-secondary' onClick={showModalEdit} />
                    <DeleteOutlined className='text-black hover:text-red-700 bg-white p-1 hover:bg-secondary' onClick={showDeleteConfirm} />
                  </div>
                </div>
              }
              description={
                <Tooltip title={description}>
                  <div className="line-clamp-2">{description}</div>
                </Tooltip>
              }
            />
            <div className='flex justify-between items-end'>
              <h1 className='font-bold'>Stock : {stock}</h1>
              <h1 className='font-bold text-sm text-primary'>{formatRupiah(price)}</h1>
            </div>
            <ButtonBasic title={"add to cart"} onClick={addToCartHandler} textColor={'primary'} color={'secondary'} />
          </div>
        </div>
      </Card>

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
            <Input />
          </Form.Item>
          <Form.Item
            label="Description"
            name="description"
            rules={[
              { required: true, message: 'Please input the description of the menu!' },
              { min: 3, message: 'Description must be at least 3 characters!' }
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Image"
            name="imageUrl"
            rules={[
              { required: true, message: 'Please input the image URL of the menu!' },
              { type: 'url', message: 'Please input a valid image URL!' }
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Price"
            name="price"
            rules={[
              { required: true, message: 'Please input the price of the menu!' }
            ]}
          >
            <Input type='number' />
          </Form.Item>
          <Form.Item
            label="Stock"
            name="stock"
            rules={[
              { required: true, message: 'Please input the stock of the menu!' }
            ]}
          >
            <Input type='number' />
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
    </div>
  );
}

export default CardMenu;
