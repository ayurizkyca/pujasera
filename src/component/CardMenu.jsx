import React, { useState } from 'react';
import { Card, Typography, Tooltip, Button, Modal } from 'antd';
const { Meta } = Card;
import {
  DeleteOutlined,
  EditOutlined,
} from '@ant-design/icons';
import ButtonBasic from './ButtonBasic';
import { formatRupiah } from '../util/format';
import { useDispatch } from 'react-redux';
import { menuActions } from '../redux/menu';

const CardMenu = ({ id, idResto, name, description, imageUrl, price, stock, addCart, deleteMenu, editMenu }) => {
  // const addToCartHandler = (idResto, namaResto, id, name, price) => {
  //   if (isCustEmpty === true) {
  //     dispatch(cartActions.toggleDrawer(false));
  //     dispatch(cartActions.addMenuItem({ idResto, namaResto, idMenu: id, namaMenu: name, harga: price, qty: 1 }));
  //   } else {
  //     dispatch(cartActions.addMenuItem({ idResto, namaResto, idMenu: id, namaMenu: name, harga: price, qty: 1 }));
  //     message.success("item added");
  //   }
  // };
  // const dispatch = useDispatch();
  // const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);

  // const showModalDelete = () => {
  //   setIsModalDeleteOpen(true);
  // };

  // const handleOk = () => {
  //   console.log("id resto", idResto)
  //   console.log("id menu", id)
  //   dispatch(menuActions.deleteMenu({ idResto: idResto, idMenu: id }));
  //   setIsModalDeleteOpen(false);
  // };

  // const handleOkeDelete = () => {
  //   console.log("id resto", idResto)
  //   console.log("id menu", id)
  //   dispatch(menuActions.deleteMenu({ idResto: idResto, idMenu: id }));
  //   setIsModalDeleteOpen(false);
  // };

  // const handleCancel = () => {
  //   setIsModalDeleteOpen(false);
  // };

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

              // e.target.src = 'https://media.istockphoto.com/id/170006346/photo/recipe-notepad-surrounded-by-italian-ingredients.webp?b=1&s=170667a&w=0&k=20&c=XWnQ82Nt3uTIrGIy0CSUsMyBi9KlokhZSfK-tHcomB4=';
          }}
          />

          // <div>
          //   <img className='h-[200px] object-cover' alt="card-image" src={imageUrl} />
          //   <div className=''>
          //     <DeleteOutlined className='absolute top-10 right-0 text-black hover:text-red-700 bg-white p-2 hover:bg-secondary' onClick={deleteClick} />
          //     <EditOutlined className='absolute top-20 right-0 text-black hover:text-red-700 bg-white p-2 hover:bg-secondary' onClick={editClick} />
          //   </div>

          // </div>
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
                    <EditOutlined className=' text-black hover:text-red-700 bg-white p-1 hover:bg-secondary' onClick={() => editMenu({ id, idResto, name, description, imageUrl, price, stock })} />
                    <DeleteOutlined className='text-black hover:text-red-700 bg-white p-1 hover:bg-secondary' onClick={() => deleteMenu({ id, idResto })} />
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
              <h1>Stok : {stock}</h1>
              <h1 className='font-bold text-sm text-primary'>{formatRupiah(price)}</h1>
            </div>
            <ButtonBasic title={"add to cart"} onClick={addCart} textColor={'primary'} color={'secondary'} />
            {/* <Button className="bg-secondary text-primary w-full font-bold border-none hover:bg-primary">add to chart</Button> */}
          </div>
        </div>
      </Card>

      {/* Modal Delete Menu */}
      {/* <Modal
        title="Delete Menu"
        open={isModalDeleteOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        okType='danger'
      >
        <p>Are you sure you want to delete this menu?</p>
      </Modal> */}
    </div>
  );
}

export default CardMenu;
