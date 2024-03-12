import React, { useState } from 'react';
import { Table, Button, Typography, Modal } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { cartActions } from '../redux/cart';
import CardCart from '../component/CardCart';
import ListMenuCart from '../component/ListMenuCart';

const HistoryPage = () => {
  const purchaseHistory = useSelector((state) => state.cart.purchaseHistory);
  const dispatch = useDispatch();
  const [detailVisible, setDetailVisible] = useState(false);
  const [deleteVisible, setDeleteVisible] = useState(false);
  const [detail, setDetail] = useState(""); 
  const [deleteIndex, setDeleteIndex] = useState(null);

  const columns = [
    {
      title: 'Customer',
      dataIndex: 'customer',
      key: 'customer',
    },
    {
      title: 'Meja',
      dataIndex: 'meja',
      key: 'meja',
    },
    {
      title: 'Restaurants',
      dataIndex: 'restaurant',
      key: 'restaurant',
      render: (text, record) => (
        <span>{record.menuItem.map((item) => item.namaResto).join(', ')}</span>
      ),
    },
    {
      title: 'Total',
      dataIndex: 'total',
      key: 'total',
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record, index) => (
        <div>
          <Button onClick={() => showDeleteConfirm(index)}>Delete</Button>
          <Button onClick={() => handleDetail(record)}>Detail</Button>
        </div>
      ),
    },
  ];

  const showDeleteConfirm = (index) => {
    setDeleteIndex(index);
    setDeleteVisible(true);
  };

  const handleDelete = () => {
    if (deleteIndex !== null) {
      dispatch(cartActions.removePurchase({ index: deleteIndex }));
      setDeleteIndex(null);
    }
    setDeleteVisible(false);
  };

  const handleDetail = (record) => {
    setDetail(record);
    setDetailVisible(true);
  };

  return (
    <div>
      <Typography.Title>History Page</Typography.Title>
      <Table columns={columns} dataSource={purchaseHistory} />
      <Modal
        title="Confirmation"
        open={deleteVisible}
        okType='danger'
        onCancel={() => setDeleteVisible(false)}
        onOk={handleDelete}
      >
        <p>Are you sure you want to delete this order?</p>
      </Modal>
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
            <p><strong>Meja:</strong> {detail.meja}</p>
            <p><strong>Pesanan : </strong></p>
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
            <p><strong>Total: </strong><span className='text-primary font-bold'>{detail.total}</span></p>            
          </div>
        )}
      </Modal>
    </div>
  );
};

export default HistoryPage;

