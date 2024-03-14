import React from 'react';
import { Collapse, Tooltip } from 'antd';
import CardCart from './CardCart';
import ListMenuCart from './ListMenuCart';
import { useSelector } from 'react-redux';
import { formatRupiah } from '../util/format';

const { Panel } = Collapse;

const Accordion = () => {
  const purchaseHistory = useSelector((state) => state.cart.purchaseHistory);

  return (
    <div className='overflow-auto'>
      <Collapse accordion>
        {purchaseHistory.map((purchase, index) => (
          <Panel header={generateHeader(purchase)} key={index}>
            <div>
              <p>Date : {purchase.date}</p>
              <p>Customer: {purchase.customer}</p>
              <p>Table: {purchase.meja}</p>
              <ul>
                {purchase.menuItem.map((resto, restoIndex) => (
                  <CardCart key={restoIndex} namaResto={resto.namaResto}>
                    {resto.menu.map((menu, menuIndex) => (
                      <ListMenuCart
                        key={menuIndex}
                        namaMenu={menu.namaMenu}
                        harga={menu.harga}
                        qty={menu.qty}
                        subTotal={menu.qty * menu.harga}
                      />
                    ))}
                  </CardCart>
                ))}
              </ul>
              <p>Subtotal: {formatRupiah(purchase.subtotal)}</p>
              <p>Total: {formatRupiah(purchase.total)}</p>
            </div>
          </Panel>
        ))}
      </Collapse>
    </div>
  );
};

const generateHeader = (purchase) => {
  const date = purchase.date;
  const customer = purchase.customer;
  const meja = purchase.meja;
  const total = purchase.total;
  const restos = purchase.menuItem.map((resto) => resto.namaResto).join(', ');
  const totalMenu = purchase.menuItem.reduce((total, resto) => total + resto.menu.length, 0);

  return (
    <div className='grid grid-cols-6 gap-10'>
      <p>{date}</p>
      <p>{customer}</p>
      <p>Table : {meja}</p>
      <p>Items : {totalMenu}</p>
      <Tooltip title={restos} trigger="hover">
        <p className='truncate'>Restos : {restos}</p>
      </Tooltip>
      <p>{formatRupiah(total)}</p>
    </div>
  )
};

export default Accordion;

