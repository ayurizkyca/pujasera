import React from 'react';
import { useSelector } from 'react-redux';
import { Typography, Table } from 'antd';
import CardDashboard from '../component/CardDashboard';
import BarChart from '../component/BarChart';
import PieChart from '../component/PieChart';
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

  // RESTO FAVORITE
  //resto favorite logic
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

  //REVENUE CHART
  //revenue every resto
  function getTotalPriceByResto(purchaseHistory) {
    const totalPriceByResto = {};

    purchaseHistory.forEach(purchase => {
      purchase.menuItem.forEach(resto => {
        const { namaResto, menu } = resto;
        if (!totalPriceByResto[namaResto]) {
          totalPriceByResto[namaResto] = 0;
        }
        menu.forEach(item => {
          totalPriceByResto[namaResto] += item.harga * item.qty;
        });
      });
    });
    return totalPriceByResto;
  }
  const revenueData = getTotalPriceByResto(purchaseHistory);

  // Generate data for BarChart component
  const barChartData = {
    labels: Object.keys(revenueData),
    datasets: [
      {
        label: 'Revenue',
        data: Object.values(revenueData),
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  //QUANTITY CHART
  //quantity every resto
  function getTotalQuantityByResto(purchaseHistory) {
    const totalQuantityByResto = {};
    purchaseHistory.forEach(purchase => {
      purchase.menuItem.forEach(resto => {
        const { namaResto, menu } = resto;
        if (!totalQuantityByResto[namaResto]) {
          totalQuantityByResto[namaResto] = 0;
        }
        menu.forEach(item => {
          totalQuantityByResto[namaResto] += item.qty;
        });
      });
    });
    return totalQuantityByResto;
  }
  const quantityData = getTotalQuantityByResto(purchaseHistory);

  // Generate data for PieChart component
  const pieChartData = {
    labels: Object.keys(quantityData),
    datasets: [
      {
        label: 'Quantity Orders',
        data: Object.values(quantityData),
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };


  return (
    <div className='grid grid-flow-row gap-10'>
      <Typography.Title>Dashboard</Typography.Title>
      <div className='grid grid-cols-2 gap-5'>
        <div className='grid grid-cols-1 gap-2'>
          <CardDashboard title={"Revenue"} value={`Rp. ${totalRevenue}`} icon={<WalletOutlined />} />
          <CardDashboard title={"Customers"} value={totalCustomers} icon={<TeamOutlined />} />
          <CardDashboard title={"Favorite Restaurant"} value={favoriteResto} icon={<TrophyOutlined />} />
        </div>
        <div className='border p-5 rounded-md'>
          <h3 className='text-xl'>Latest Purchase</h3>
          <Table columns={columns} dataSource={purchaseHistory} pagination={{ pageSize: 3 }} />
        </div>
      </div>
      <div className='space-y-5'>
        <h1 className='text-xl'>Overview</h1>
        <div className='grid grid-cols-2 gap-2'>
          <div className='border p-5 rounded-md'>
            <BarChart data={barChartData} />
          </div>
          <div className='border p-5 rounded-md'>
            <PieChart data={pieChartData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
