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
import {
  ShoppingOutlined,
  SortAscendingOutlined,
  SortDescendingOutlined,
} from '@ant-design/icons';
import ButtonBasic from '../component/ButtonBasic';
import moment from 'moment';

const { Search } = Input;
const { RangePicker } = DatePicker;

const HistoryPage = () => {
  const purchaseHistory = useSelector((state) => state.cart.purchaseHistory);
  // const purchaseHistory = useSelector((state) => [...state.cart.purchaseHistory]);
  const [detailVisible, setDetailVisible] = useState(false);
  const [detail, setDetail] = useState("");
  const [searchText, setSearchText] = useState('');
  const [dateRange, setDateRange] = useState([]);

  const disableFutureDates = (currentDate) => {
    return currentDate && currentDate > moment().endOf("day");
  };

  const onChangeDatePicker = (dates) => {
    if (!dates || dates.length === 0) {
      setDateRange([]);
    } else {
      setDateRange(dates.map(date => date.format('DD/MM/YYYY')));
    }
  };

  const filteredData = [...purchaseHistory].reverse().filter(item => {
    const searchTextMatch = searchText
      ? Object.values(item).some(value =>
        typeof value === 'string' &&
        value.toLowerCase().includes(searchText.toLowerCase())
      )
      : true;

    const dateRangeMatch = dateRange.length === 0
      ? true
      : moment(item.date, 'DD/MM/YYYY').isSameOrAfter(moment(dateRange[0], 'DD/MM/YYYY'), 'day') &&
      moment(item.date, 'DD/MM/YYYY').isSameOrBefore(moment(dateRange[1], 'DD/MM/YYYY'), 'day');
    return searchTextMatch && dateRangeMatch;
  });

  const columns = [
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      // sorter: (a, b) => {
      //   return moment(a.date, 'DD/MM/YYYY').unix() - moment(b.date, 'DD/MM/YYYY').unix();
      // },
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
    <div className='space-y-2'>
      <div className='md:flex justify-between'>
        <Typography.Title level={3}>History</Typography.Title>
        <div className='md:flex gap-2 space-y-1 md:space-y-0'>
          <div className="search-container">
            <Search
              placeholder="Customer or Table"
              value={searchText}
              onChange={e => setSearchText(e.target.value)}
            />
          </div>
          <Space direction="vertical" size={12}>
            <RangePicker
              onChange={onChangeDatePicker}
              format="DD/MM/YYYY"
              disabledDate={disableFutureDates}
            />
          </Space>
          {/* sorting */}
          {/* <div className='border px-2 py-1 rounded-md w-fit h-[32px]'>
            <SortAscendingOutlined />
          </div> */}
        </div>
      </div>
      <div className='overflow-auto'>
        <Table
          columns={columns}
          dataSource={filteredData}
          pagination={{ pageSize: 5 }}
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
        okType='danger'
        onOk={() => setDetailVisible(false)}
        footer={false}
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
