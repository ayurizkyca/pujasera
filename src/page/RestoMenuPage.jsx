import React, { useEffect, useState } from 'react'
import CardMenu from '../component/CardMenu.jsx'
import { Link, useParams } from 'react-router-dom'
import { Typography, Modal, Form, Input, message, Button } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import ButtonBasic from '../component/ButtonBasic.jsx'
import menu, { menuActions } from '../redux/menu.js'
import { v4 as uuidv4 } from 'uuid';
import {
  ArrowLeftOutlined,
} from '@ant-design/icons';
import { ROUTES } from '../constant/routesConstant.jsx'
import { addMenuToResto } from '../service/menuService.js'


const RestoMenuPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const restos = useSelector((state) => state.menu.resto);
  const resto = restos.find((resto) => resto.id === id);

  
  const onFinish = (values) =>{
    const addData = addMenuToResto(
      restos, {
        restoId: id, 
        menu: {
          id: uuidv4(),
          name: values.name,
          description: values.description,
          imageUrl: values.imageUrl,
          price: Number(values.price),
          stock: Number(values.stock)
        }
      })
      console.log(addData)
    dispatch(menuActions.updateMenu(addData));
    message.success("successfully added menu");
    setIsAddMenuOpen(false);
  }

  // Add New Menu
  const [isAddMenuOpen, setIsAddMenuOpen] = useState(false);
  const showAddMenu = () => {
    setIsAddMenuOpen(true);
  };

  const [menuData, setMenuData] = useState({
    id: "",
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

  // const handleAddMenu = (values) => {
  //   const idMenu = uuidv4(); // Generate a UUID for idMenu
  //   dispatch(menuActions.addMenu({
  //     idResto: id,
  //     idMenu: idMenu,
  //     menu: {
  //       id: idMenu,
  //       name: values.name,
  //       description: values.description,
  //       imageUrl: values.imageUrl,
  //       price: Number(values.price),
  //       stock: Number(values.stock)
  //     }

  //   }));
  //   message.success("successfully added menu");
  //   setIsAddMenuOpen(false);
  // };

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
          // onFinish={handleAddMenu}
          onFinish={onFinish}
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
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default RestoMenuPage
