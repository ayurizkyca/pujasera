import React, { useState } from 'react';
import {
  HomeOutlined,
  BookOutlined,
  FileTextOutlined,
  DashboardOutlined,
  SnippetsOutlined,
} from '@ant-design/icons';
import { Layout, Menu, theme } from 'antd';
import { Outlet } from 'react-router-dom';
import { ROUTES } from '../constant/routesConstant';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Typography } from 'antd';
import Navbar from './Navbar';


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
  getItem('Stats', ROUTES.REPORT, <SnippetsOutlined />, [
    getItem('Dashboard', ROUTES.DASHBOARD, <DashboardOutlined />),
    getItem('Report', ROUTES.REPORT, <FileTextOutlined />),
  ]),
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
    <Layout className=""
      style={{
        minHeight: '100vh',
      }}
    >
      <Sider className="left-0 -z-1" collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)} theme='light'>
        <div className="demo-logo-vertical" />
        <Menu className='sticky left-0' defaultSelectedKeys={['1']} mode="inline" items={items} onClick={handleClick} />
      </Sider>
      <Layout className="">
        <Header className='md:flex items-center hidden'
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          <h1 className='pl-[20px] text-primary font-bold text-2xl z-1'>Hello, {username}. Welcome to Pujasera, your one-stop destination for a variety of delicious snacks and treats!</h1>
        </Header>

        <Content
          style={{
            margin: '16px 16px',
            height: "calc(100vh-64px)",
            overflow: "auto"
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