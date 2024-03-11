// import React from 'react';
// import { useSelector } from 'react-redux';
// import { Typography } from 'antd';
// import TableCustom from '../component/Table';
// import { Table } from 'antd';

// const columns = [
//   {
//     title: 'Customer',
//     dataIndex: 'customer',
//     key: 'customer',
//   },
//   {
//     title: 'Meja',
//     dataIndex: 'meja',
//     key: 'meja',
//   },
//   {
//     title: 'Restaurants',
//     dataIndex: 'restaurant',
//     key: 'restaurant',
//   },
//   {
//     title: 'Total',
//     dataIndex: 'total',
//     key: 'total',
//   },
//   {
//     title: 'Action',
//     dataIndex: '',
//     key: 'x',
//     render: () => <a>Delete</a>,
//   },
// ];

// const HistoryPage = () => {
//   // Mengambil data riwayat pembelian dari state Redux
//   const purchaseHistory = useSelector(state => state.purchaseHistory); // Pastikan slice Redux yang menyimpan riwayat pembelian disesuaikan dengan nama slice yang sebenarnya

//   return (
//     <div>
//       <Typography.Title>History Page</Typography.Title>
//       {/* Meneruskan data riwayat pembelian ke komponen TableCustom */}
//       {/* <TableCustom data={purchaseHistory} /> */}
//       <Table
//         columns={columns}
//         expandable={{
//           expandedRowRender: (record) => (
//             <p
//               style={{
//                 margin: 0,
//               }}
//             >
//               {record.detail}
//             </p>
//           ),
//           rowExpandable: (record) => record.name !== 'Not Expandable',
//         }}
//         dataSource={purchaseHistory}
//       />
//     </div>
//   );
// };

// export default HistoryPage;

import React from 'react';
import { Table, Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { cartActions } from '../redux/cart';

const HistoryPage = () => {
  const purchaseHistory = useSelector((state) => state.cart.purchaseHistory);
  const dispatch = useDispatch();

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
        <Button onClick={() => handleRemove(index)}>Delete</Button>
      ),
    },
  ];

  const handleRemove = (index) => {
    dispatch(cartActions.removePurchase({ index }));
  };

  return (
    <div>
      <h1>History Page</h1>
      <Table columns={columns} dataSource={purchaseHistory} />
    </div>
  );
};

export default HistoryPage;

