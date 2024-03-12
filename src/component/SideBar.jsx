import React, { useState } from 'react';
import {
  HomeOutlined,
  BookOutlined,
  FileTextOutlined
} from '@ant-design/icons';
import { Layout, Menu, theme } from 'antd';
import { Outlet } from 'react-router-dom';
import { ROUTES } from '../constant/routesConstant';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Typography } from 'antd';


const { Header, Content, Footer, Sider } = Layout;
function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}
const items = [
  getItem('Portal Resto', ROUTES.PORTAL_RESTO, <HomeOutlined />),
  getItem('History', ROUTES.HISTORY, <BookOutlined />),
  getItem('Report', ROUTES.REPORT, <FileTextOutlined />),
];



const SideBar = () => {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const handleClick = (e) => {
    navigate(e.key)
  }

  const username = useSelector((state) => state.auth.username)

  return (
    <Layout
      style={{
        minHeight: '100vh',
      }}
    >
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)} theme='light'>
        <div className="demo-logo-vertical" />
        <Menu className='' defaultSelectedKeys={['1']} mode="inline" items={items} onClick={handleClick} />
      </Sider>
      <Layout>
        <Header className='flex items-center'
          style={{
            padding: 0,
            background: colorBgContainer,
            minHeight:200,
          }}
        >
          <h1 className='pl-[20px] text-primary font-bold text-2xl'>Hello, {username}. <br /> Welcome to Pujasera, your one-stop destination for a variety of delicious snacks and treats!</h1>
        </Header>
        <Content
          style={{
            margin: '16px 16px',
          }}
        >
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <Outlet />
          </div>
        </Content>
        <Footer
          style={{
            textAlign: 'center',
          }}
        >
          Pujasera ©{new Date().getFullYear()}
        </Footer>
      </Layout>
    </Layout>
  );
};
export default SideBar;