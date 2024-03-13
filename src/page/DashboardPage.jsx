import React from 'react';
import { useSelector } from 'react-redux';
import { Typography, Table } from 'antd';
import CardDashboard from '../component/CardDashboard';
import SalesChartTest from '../component/SalesChartTest';
import {
  WalletOutlined,
  TeamOutlined,
  TrophyOutlined
} from '@ant-design/icons';

const DashboardPage = () => {
  const purchaseHistory = useSelector(state => state.cart.purchaseHistory);

  const totalRevenue = purchaseHistory.reduce((total, purchase) => total + purchase.total, 0);

  const totalCustomers = purchaseHistory.length;

  const columns = [
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
        <span>{record.menuItem.map((item) => item.namaResto).join(', ')}</span>
      ),
    },
    {
      title: 'Total',
      dataIndex: 'total',
      key: 'total',
    },
  ];

  const salesData = [
    { name: 'RM. Sederhana', quantity: 150, revenue: 300000 },
    { name: 'Warung Nasi Bali', quantity: 200, revenue: 450000 },
  ];

  // Menghitung penjualan dan pendapatan masing-masing restoran
  const restoSales = purchaseHistory.reduce((restoData, purchase) => {
    const { menuItem } = purchase;
    menuItem.forEach(item => {
      const { idResto, harga, qty } = item;
      if (!restoData[idResto]) {
        restoData[idResto] = {
          totalSales: 0,
          totalRevenue: 0
        };
      }
      restoData[idResto].totalSales += qty;
      restoData[idResto].totalRevenue += harga * qty;
    });
    return restoData;
  }, {});

  //resto favorite ne logic
  const restoPurchases = purchaseHistory.reduce((restoCounts, purchase) => {
    purchase.menuItem.forEach(item => {
      const { namaResto } = item;
      restoCounts[namaResto] = (restoCounts[namaResto] || 0) + 1;
    });
    return restoCounts;
  }, {});

  // Temukan restoran dengan pembelian terbanyak
  let favoriteResto = '-';
  let maxPurchaseCount = 0;
  for (const resto in restoPurchases) {
    if (restoPurchases[resto] > maxPurchaseCount) {
      maxPurchaseCount = restoPurchases[resto];
      favoriteResto = resto;
    }
  }

  return (
    <div>
      <Typography.Title>Dashboard</Typography.Title>
      <div className=''>
        <div>

        </div>
        <CardDashboard title={"Revenue"} value={`Rp. ${totalRevenue}`} icon={<WalletOutlined />} />
        <CardDashboard title={"Customers"} value={totalCustomers} icon={<TeamOutlined />} />
        <CardDashboard title={"Favorite Restaurant"} value={favoriteResto} icon={<TrophyOutlined />} />
        <div className='border p-5 rounded-md'>
          <h3 className='text-xl'>Purchase History</h3>
          <Table columns={columns} dataSource={purchaseHistory} pagination={{ pageSize: 5 }} />
        </div>
        {/* <div>
          <h2>Sales Report</h2>
          <ul>
            {Object.entries(restoSales).map(([restoId, salesData]) => (
              <li key={restoId}>
                <h3>Resto ID: {restoId}</h3>
                <p>Total Sales: {salesData.totalSales}</p>
                <p>Total Revenue: {salesData.totalRevenue}</p>
              </li>
            ))}
          </ul>
        </div> */}
        {/* <div>
          <BarChart />
        </div> */}
        {/* <div>
          <SalesChart/>
        </div> */}
        {/* <div>
          <PieChart/>
        </div> */}
        {/* <ChartExamples/> */}
      </div>
      <SalesChartTest data={salesData} />

    </div>
  );
};

export default DashboardPage;


// import React from 'react';
// import SalesChartTest from '../component/SalesChartTest';

// const DashboardPage = () => {
//   const salesData = [
//     { name: 'RM. Sederhana', quantity: 150, revenue: 300000 },
//     { name: 'Warung Nasi Bali', quantity: 200, revenue: 450000 },
//     // More restaurants...
//   ];

//   return (
//     <div>
//       <h1>Dashboard</h1>
//       <SalesChartTest data={salesData} />
//     </div>
//   );
// };

// export default DashboardPage;
