import React, { useState } from 'react';
import { Table, Button, Typography, Modal, Tooltip } from 'antd';
import { useSelector } from 'react-redux';
import { formatRupiah } from '../util/format';
import { ShoppingOutlined } from '@ant-design/icons';
import ButtonBasic from '../component/ButtonBasic';
import { COLORS } from '../constant/propertiesConstant';


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
      style : {
        background : COLORS.PRIMARY
      }
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
          <ButtonBasic textColor={"primary"} color={"secondary"} title={"Detail"} onClick={() => handleDetail(record)}/>
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
      <Typography.Title level={3}>History</Typography.Title>
      <div className='overflow-auto'>
        <Table columns={columns} dataSource={purchaseDataSorted} pagination={{ pageSize: 5 }} />
      </div>
      <Modal
        title="Order Detail"
        open={detailVisible}
        onCancel={() => setDetailVisible(false)}
        footer={[
          // <ButtonBasic textColor={"primary"} color={"secondary"} title={"Close"} onClick={() => setDetailVisible(false)}/>,
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
                        <h2 className='font-semibold text-primary'> {formatRupiah(menu.harga * menu.qty)}</h2>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ))}
            <p><strong>Total: </strong><span className='text-primary font-bold'> {formatRupiah(detail.total)}</span></p>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default HistoryPage;

