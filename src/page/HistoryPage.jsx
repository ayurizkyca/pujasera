import React, { useState } from 'react';
import { Table, Button, Typography, Modal, Tooltip } from 'antd';
import { useSelector } from 'react-redux';
import CardCart from '../component/CardCart';
import ListMenuCart from '../component/ListMenuCart';
import { formatRupiah } from '../util/format';

const HistoryPage = () => {
  const purchaseHistory = useSelector((state) => state.cart.purchaseHistory);
  const purchaseDataSorted = [...purchaseHistory].reverse();
  const [detailVisible, setDetailVisible] = useState(false);
  const [detail, setDetail] = useState("");

  const columns = [
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: 'Customer',
      dataIndex: 'customer',
      key: 'customer',
    },
    {
      title: 'Table',
      dataIndex: 'meja',
      key: 'meja',
    },
    {
      title: 'Restaurants',
      dataIndex: 'restaurant',
      key: 'restaurant',
      render: (text, record) => (
        <Tooltip title={record.menuItem.map((item) => item.namaResto).join(', ')}>
          <span className='truncate'>
            {record.menuItem.map((item) => item.namaResto).join(', ')}
          </span>
        </Tooltip>
      ),
    },
    {
      title: 'Total',
      dataIndex: 'total',
      key: 'total',
      render: (text, record) => (
        <span>{formatRupiah(record.total)}</span>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (record) => (
        <div>
          <Button onClick={() => handleDetail(record)}>Detail</Button>
        </div>
      ),
    },
  ];

  const handleDetail = (record) => {
    setDetail(record);
    setDetailVisible(true);
  };

  return (
    <div>
      <Typography.Title>History Page</Typography.Title>
      <div className='overflow-auto'>
        <Table columns={columns} dataSource={purchaseDataSorted} pagination={{ pageSize: 5 }} />
      </div>
      <Modal
        title="Order Detail"
        open={detailVisible}
        onCancel={() => setDetailVisible(false)}
        footer={[
          <Button key="close" onClick={() => setDetailVisible(false)}>
            Close
          </Button>,
        ]}
      >
        {detail && (
          <div>
            <p><strong>Customer:</strong> {detail.customer}</p>
            <p><strong>Table:</strong> {detail.meja}</p>
            <p><strong>Orders : </strong></p>
            {detail.menuItem.map(resto => (
              <CardCart
                key={resto.idResto}
                namaResto={resto.namaResto}
              >
                {resto.menu.map(menu => (
                  <ListMenuCart
                    key={menu.id}
                    namaMenu={menu.namaMenu}
                    harga={menu.harga}
                    qty={menu.qty}
                    subTotal={menu.qty * menu.harga}
                    incrementClick={() => incrementQuantity(resto.id, menu.id)}
                    decrementClick={() => decrementQuantity(resto.id, menu.id)}
                  />
                ))}
              </CardCart>
            ))}
            <p><strong>Total: </strong><span className='text-primary font-bold'>{formatRupiah(detail.total)}</span></p>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default HistoryPage;

