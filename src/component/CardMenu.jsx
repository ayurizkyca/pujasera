import React from 'react';
import { Card, Typography, Tooltip, Button } from 'antd';
const { Meta } = Card;
import ButtonBasic from './ButtonBasic';
import { formatRupiah } from '../util/format';

const CardMenu = ({ name, description, imageUrl, price, stock, onClick }) => {
  // const addToCartHandler = (idResto, namaResto, id, name, price) => {
  //   if (isCustEmpty === true) {
  //     dispatch(cartActions.toggleDrawer(false));
  //     dispatch(cartActions.addMenuItem({ idResto, namaResto, idMenu: id, namaMenu: name, harga: price, qty: 1 }));
  //   } else {
  //     dispatch(cartActions.addMenuItem({ idResto, namaResto, idMenu: id, namaMenu: name, harga: price, qty: 1 }));
  //     message.success("item added");
  //   }
  // };

  return (
    <div className=''>
      <Card
        hoverable
        style={{
          width: 240,
        }}
        cover={<img className='h-[200px] object-cover' alt="card-image" src={imageUrl} />}
      >
        <div className='flex flex-col justify-between h-full'>
          <div className='space-y-[2vh]'>
            <Meta title={name} description={
              <Tooltip title={description}>
                <div className="line-clamp-2">{description}</div>
              </Tooltip>
            }
            />
            <div className='flex justify-between items-end'>
              <h1>Stok : {stock}</h1>
              <h1 className='font-bold text-sm text-primary'>{formatRupiah(price)}</h1>
            </div>
            <ButtonBasic title={"add to cart"} onClick={onClick} textColor={'primary'} color={'secondary'} />
            {/* <Button className="bg-secondary text-primary w-full font-bold border-none hover:bg-primary">add to chart</Button> */}
          </div>
        </div>
      </Card>
    </div>
  )
}

export default CardMenu;
