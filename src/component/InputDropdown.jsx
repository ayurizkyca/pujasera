import React from 'react';
import { DownOutlined } from '@ant-design/icons';
import { Dropdown, Space } from 'antd';
const items = [
  {
    label: <a href="#">EN</a>,
    key: '0',
  },
  {
    label: <a href="#">ID</a>,
    key: '1',
  },
];

const InputDropdown = ({ title }) => (
  <Dropdown
    menu={{
      items,
    }}
    trigger={['click']}
  >
    <a onClick={(e) => e.preventDefault()}>
      <Space>
        {title}
        <DownOutlined />
      </Space>
    </a>
  </Dropdown>
);
export default InputDropdown;