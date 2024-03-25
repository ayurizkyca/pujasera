import React from 'react';
import { Collapse, Tooltip } from 'antd';
import { useSelector } from 'react-redux';
import { formatRupiah } from '../util/format';
import { ShoppingOutlined } from '@ant-design/icons';
import moment from 'moment';

const { Panel } = Collapse;

const Accordion = ({ searchText, dateRange }) => {
  const purchaseHistory = useSelector((state) => state.cart.purchaseHistory);

  const filteredHistory = [...purchaseHistory].reverse().filter(purchase => {
    const searchString = (searchText || '').toLowerCase(); // Ensure searchText is always a string
    const isDateInRange = dateRange.length === 0 || (
      moment(purchase.date, 'DD/MM/YYYY').isSameOrAfter(moment(dateRange[0], 'DD/MM/YYYY'), 'day') &&
      moment(purchase.date, 'DD/MM/YYYY').isSameOrBefore(moment(dateRange[1], 'DD/MM/YYYY'), 'day')
    );

    return (
      isDateInRange &&
      (
        purchase.date.toLowerCase().includes(searchString) ||
        purchase.customer.toLowerCase().includes(searchString) ||
        purchase.meja.toLowerCase().includes(searchString) ||
        purchase.menuItem.some(resto => 
          (resto.namaResto || '').toLowerCase().includes(searchString) || // Ensure resto.namaResto is always a string
          resto.menu.some(menu => (menu.namaMenu || '').toLowerCase().includes(searchString)) // Ensure menu.namaMenu is always a string
        )
      )
    );
  });

  return (
    <div className='overflow-auto'>
      <Collapse accordion>
        {filteredHistory.map((purchase, index) => (
          <Panel header={generateHeader(purchase)} key={index}>
            <div>
              <p>Date : {purchase.date}</p>
              <p>Customer: {purchase.customer}</p>
              <p>Table: {purchase.meja}</p>
              <ul>
                {purchase.menuItem.map((resto, restoIndex) => (
                  <div className='border p-4' key={resto.idResto}>
                    <div className='flex gap-2'>
                      <ShoppingOutlined />
                      <h1 className='font-medium'>{resto.namaResto}</h1>
                    </div>
                    {resto.menu.map(menu => (
                      <div className='grid grid-cols-3 gap-3'>
                        <h2 className='col-span-1'>{menu.namaMenu}</h2>
                        <div className='col-span-2'>
                          <div className='grid grid-cols-3'>
                            <h2 className=''>{formatRupiah(menu.harga)}</h2>
                            <div className='text-center'>
                              <h2>{menu.qty}</h2>
                            </div>
                            <h2 className='font-semibold text-end'>{formatRupiah(menu.harga * menu.qty)}</h2>
                          </div>
                        </div>
                      </div>
                    ))}
                    <div className='flex justify-between'>
                      <h1 className='font-semibold'>Total Resto :</h1>
                      <h1 className='font-semibold text-primary'>{formatRupiah(resto.subtotal)}</h1>
                    </div>
                  </div>
                ))}
              </ul>
              <div className='flex justify-end gap-2 p-2'>
                <p className='font-bold'>Grand Total: </p>
                <p className='font-bold text-primary'>{formatRupiah(purchase.total)}</p>
              </div>
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
  const qty = purchase.menuItem.reduce((acc, resto) => acc + resto.menu.reduce((acc, item) => acc + item.qty, 0), 0);
  const restos = purchase.menuItem.map((resto) => resto.namaResto).join(', ');
  const totalMenu = purchase.menuItem.reduce((total, resto) => total + resto.menu.length, 0);

  return (
    <div className='grid grid-cols-7 gap-10'>
      <p>{date}</p>
      <p>{customer}</p>
      <p className='text-center'>{meja}</p>
      <p className='text-center'>{totalMenu}</p>
      <p className='text-center'>{qty}</p>
      <Tooltip title={restos} trigger="hover">
        <p className='truncate'>{restos}</p>
      </Tooltip>
      <p>{formatRupiah(total)}</p>
    </div>
  )
};

export default Accordion;

