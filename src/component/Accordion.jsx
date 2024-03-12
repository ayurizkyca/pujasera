import React from 'react';
import { Collapse } from 'antd';
import CardCart from './CardCart';
import ListMenuCart from './ListMenuCart';
import { useSelector } from 'react-redux';

const { Panel } = Collapse;

const Accordion = () => {
  const purchaseHistory = useSelector((state) => state.cart.purchaseHistory);

  return (
    <div>
      <Collapse accordion>
        {purchaseHistory.map((purchase, index) => (
          <Panel header={generateHeader(purchase)} key={index}>
            <div>
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
              <p>Subtotal: {purchase.subtotal}</p>
              <p>Total: {purchase.total}</p>
            </div>
          </Panel>
        ))}
      </Collapse>
    </div>
  );
};

const generateHeader = (purchase) => {
  const customer = purchase.customer;
  const meja = purchase.meja;
  const total = purchase.total;
  const restos = purchase.menuItem.map((resto) => resto.namaResto).join(', ');
  const totalMenu = purchase.menuItem.reduce((total, resto) => total + resto.menu.length, 0);

  return(
    <div className='grid grid-cols-5 gap-10'>
      <p>Customer : {customer}</p>
      <p>Table : {meja}</p>
      <p>Items : {totalMenu}</p>
      <p>Restos : {restos}</p>
      <p>Total :{total}</p>
    </div>
  )
};

export default Accordion;

