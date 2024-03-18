import React, { useState } from 'react';
import {
  Table,
  Typography,
  Modal,
  Tooltip,
  Input,
  Space,
  DatePicker
} from 'antd';
import { useSelector } from 'react-redux';
import { formatRupiah } from '../util/format';
import { ShoppingOutlined } from '@ant-design/icons';
import ButtonBasic from '../component/ButtonBasic';

const { Search } = Input;
const { RangePicker } = DatePicker;

const HistoryPage = () => {
  const purchaseHistory = useSelector((state) => state.cart.purchaseHistory);
  const [detailVisible, setDetailVisible] = useState(false);
  const [detail, setDetail] = useState("");
  const [searchText, setSearchText] = useState('');
  const [dateRange, setDateRange] = useState([]);

  const handleDateChange = (dates) => {
    setDateRange(dates);
  };

  const purchaseDataFiltered = purchaseHistory.filter(item => {
    if (dateRange.length === 0) return true;
    const itemDate = new Date(item.date);
    return itemDate >= dateRange[0] && itemDate <= dateRange[1];
  });

  const purchaseDataSorted = [...purchaseDataFiltered].reverse().filter(item =>
    Object.keys(item).some(key =>
      item[key].toString().toLowerCase().includes(searchText.toLowerCase())
    )
  );

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
          <ButtonBasic textColor={"primary"} color={"secondary"} title={"Detail"} onClick={() => handleDetail(record)} />
        </div>
      ),
    },
  ];

  const handleDetail = (record) => {
    setDetail(record);
    setDetailVisible(true);
  };
  const thStyle = {
    backgroundColor: '#c2161e',
    color: 'white',
  };

  return (
    <div>
      <div className='flex justify-between'>
        <Typography.Title level={3}>History</Typography.Title>
        <div className='flex gap-2'>
          <div className="search-container">
            <Search
              placeholder="Search"
              value={searchText}
              onChange={e => setSearchText(e.target.value)}
            />
          </div>
          <Space direction="vertical" size={12}>
            <RangePicker onChange={handleDateChange} />
          </Space>
        </div>
      </div>
      <div className='overflow-auto'>
        <Table
          columns={columns}
          dataSource={purchaseDataSorted}
          components={{
            header: {
              cell: (props) => (
                <th style={thStyle}>
                  {props.children}
                </th>
              ),
            },
          }}
        />
      </div>
      <Modal
        title="Order Detail"
        open={detailVisible}
        onCancel={() => setDetailVisible(false)}
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
                        <h2 className='font-semibold text-end'> {formatRupiah(menu.harga * menu.qty)}</h2>
                      </div>
                    </div>
                  </div>
                ))}
                <div className='flex justify-between pt-2'>
                  <h1 className='font-semibold'>Total Resto : </h1>
                  <h1 className='font-semibold text-primary'>{formatRupiah(resto.subtotal)}</h1>
                </div>
              </div>
            ))}
            <div className='flex justify-end pt-3 gap-2'>
              <h1 className='font-bold'>Grand Total : </h1>
              <h1 className='font-bold text-primary'> {formatRupiah(detail.total)}</h1>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default HistoryPage;



