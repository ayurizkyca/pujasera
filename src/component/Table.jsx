import React from 'react';
import { Table } from 'antd';
const columns = [
  {
    title: 'Nomor Pesanan',
    dataIndex: 'nomor_pesanan',
    key: 'nomor_pesanan',
  },
  {
    title: 'Resto',
    dataIndex: 'resto',
    key: 'resto',
  },
  {
    title: 'Menu',
    dataIndex: 'menu',
    key: 'menu',
  },
  {
    title: 'Jumlah',
    dataIndex: 'jumlah',
    key: 'jumlah',
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
    nomor_pesanan: '001',
    resto: 'Pizza Palace',
    menu: 'Hawaiian Pizza',
    jumlah : 31,
    total : 'Rp.20.000',
    note: 'Hawaiian Pizza without Pineapple',
  },
  {
    key: 2,
    nomor_pesanan: '002',
    resto: 'Burger Barn',
    menu: 'Classic Cheesburger',
    jumlah : 3,
    total : 'Rp.80.000',
    note: 'Add more cheese please',
  },
  {
    key: 3,
    name: 'Not Expandable',
    nomor_pesanan: '003',
    resto: 'Pizza Palace',
    menu: 'Vegetarian Pizza',
    jumlah : 31,
    total : 'Rp.20.000',
    note: '',
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
          {record.note}
        </p>
      ),
      rowExpandable: (record) => record.name !== 'Not Expandable',
    }}
    dataSource={data}
  />
);
export default TableCustom;