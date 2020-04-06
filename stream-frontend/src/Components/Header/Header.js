import React from 'react'
import { BrowserRouter as Router, Link } from "react-router-dom";

import {Layout, Menu } from 'antd';
import { FileTextOutlined, HomeOutlined, FundOutlined, MenuOutlined,  CloudUploadOutlined, SolutionOutlined, FunnelPlotOutlined } from '@ant-design/icons';

import Logo from './logo_stream.png'

const { SubMenu } = Menu;
const { Header } = Layout;


const FullHeader = () => {
    return (
    <Header style={{ width: '100%', 
                  background: 'white'}}>
      <div className="logo" />
      <Menu
        theme="light"
        mode="horizontal"
        defaultSelectedKeys={['1']}
        style={{ lineHeight: '64px' }}
      >
        <Menu.Item key="home">
          <HomeOutlined/>
            <span> Home </span>
            <Link to="/" />
        </Menu.Item>

        <Menu.Item key="upload">
        <CloudUploadOutlined />
              <span>
                Upload
              </span>
              <Link to="/upload" />
        </Menu.Item>
                  <Menu.Item key="geography">
                    <FunnelPlotOutlined />
                  <span> Backlog </span>
                  <Link to="/backlog" />
                  </Menu.Item>

                  <Menu.Item key="backlog">
                    <SolutionOutlined />
                  <span>Classification</span>
                  <Link to="/confirmation" />
                  </Menu.Item>
     
            
        
        
            <Menu.Item key="management">
              <FileTextOutlined />
                  <span>
                    Notice management 
                    </span>
              <Link to="/management" />
            </Menu.Item>
            
            <Menu.Item key="dashboard">
              <FundOutlined/>
                  <span>Dashboard</span>
                  <Link to="/dashboard" />
            </Menu.Item>      
        
            <Menu.Item key="admin">
            <MenuOutlined />
              <span>
                Admin
              </span>
            <Link to="/admin" />
            </Menu.Item>
            <div style = {{float: "right"}}>
            <img src={Logo} alt="website logo" height='45px' />
          </div>
      </Menu>
    </Header>
    )
}


export default FullHeader;