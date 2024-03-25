import React from 'react';
import { useSelector } from 'react-redux';
import { Typography, Table } from 'antd';
import CardDashboard from '../component/CardDashboard';
import BarChart from '../component/BarChart';
import PieChart from '../component/PieChart';
import {
  WalletOutlined,
  TeamOutlined,
  TrophyOutlined,
  BarChartOutlined,
  PieChartOutlined,
  RestOutlined,
  ShoppingCartOutlined,
} from '@ant-design/icons';
import { formatRupiah } from '../util/format';

const DashboardPage = () => {
  const purchaseHistory = useSelector(state => state.cart.purchaseHistory);
  const restos = useSelector((state) => state.menu.resto)
  const totalRevenue = purchaseHistory.reduce((total, purchase) => total + purchase.total, 0);
  const totalCustomers = purchaseHistory.length;
  const totalResto = restos.length;
  const totalOrders = purchaseHistory.reduce((total, purchase) => total + purchase.menuItem.length, 0);
  const sortedPurchaseHistory = [...purchaseHistory].reverse();

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
        <span>{record.menuItem.map((item) => item.namaResto).join(', ')}</span>
      ),
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
          '#C2161E',
          '#A0153E',
          '#5D0E41',
          '#5D0E41',
          '#430A5D',
          '#5F374B',
          '#8C6A5D',
          '#EEE4B1',
          '#222831',
          '#31363F'
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
        color: '[]',
        backgroundColor: [
          '#C2161E',
          '#A0153E',
          '#5D0E41',
          '#5D0E41',
          '#430A5D',
          '#5F374B',
          '#8C6A5D',
          '#EEE4B1',
          '#222831',
          '#31363F'
        ],
        borderWidth: 1,
      },
    ],
  };


  return (
    <div className='grid grid-flow-row gap-2'>
      <Typography.Title level={3}>Dashboard</Typography.Title>
      <div className='grid grid-cols-5 gap-2'>
        <CardDashboard title={"Revenue"} value={formatRupiah(totalRevenue)} icon={<WalletOutlined />} />
        <CardDashboard title={"Total Restaurants"} value={totalResto} icon={<RestOutlined />} />
        <CardDashboard title={"Customers"} value={totalCustomers} icon={<TeamOutlined />} />
        <CardDashboard title={"Total Orders"} value={totalOrders} icon={<ShoppingCartOutlined />} />
        <CardDashboard title={"Favorite Restaurant"} value={favoriteResto} icon={<TrophyOutlined />} />
      </div>

      <div className='space-y-5'>
        <div className='grid grid-grid-cols-1 lg:grid-cols-2 gap-5'>
          <div className='bg-[#FAFAFA] rounded-md p-5'>
            <div className='flex items-center gap-3'>
              <BarChartOutlined />
              <h3 className='text-[18px]'>Restaurant Revenue</h3>
            </div>
            <div className='p-5 h-full flex items-center justify-center'>
              <BarChart data={barChartData} />
            </div>
          </div>

          {/* chart card */}
          <div className='bg-[#FAFAFA] rounded-md p-5'>
            <div className='flex items-center gap-3'>
              <PieChartOutlined />
              <h3 className='text-[18px]'>Restaurant Sales Quantity Breakdown</h3>
            </div>
            <div className='p-5 flex h-full items-center justify-center'>
              <PieChart data={pieChartData} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
