import React from 'react';
import { Table } from 'antd';
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
  },
  {
    title: 'Total',
    dataIndex: 'total',
    key: 'total',
  },
  {
    title: 'Action',
    dataIndex: '',
    key: 'x',
    render: () => <a>Delete</a>,
  },
];
const data = [
  {
    key: 1,
    customer: '001',
    restaurant: 'Hawaiian Pizza',
    meja : 31,
    total : 'Rp.20.000',
    detail: 'Hawaiian Pizza without Pineapple',
  },
  {
    key: 2,
    customer: '002',
    restaurant: 'Classic Cheesburger',
    meja : 3,
    total : 'Rp.80.000',
    detail: 'Add more cheese please',
  },
  {
    key: 3,
    name: 'Not Expandable',
    customer: '003',
    restaurant: 'Vegetarian Pizza',
    meja : 31,
    total : 'Rp.20.000',
    detail: '',
  },
];
const TableCustom = () => (
  <Table
    columns={columns}
    expandable={{
      expandedRowRender: (record) => (
        <p
          style={{
            margin: 0,
          }}
        >
          {record.detail}
        </p>
      ),
      rowExpandable: (record) => record.name !== 'Not Expandable',
    }}
    dataSource={data}
  />
);
export default TableCustom;