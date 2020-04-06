import React, {useContext, useState} from 'react';
import { AppContext } from '../Context';
import { Button, Table, Typography} from 'antd';
import { PlusOutlined, LogoutOutlined } from '@ant-design/icons';
const { Title } = Typography;




const columns = [
    {
      title: 'Username',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Access level',
      dataIndex: 'access_level',
      key: 'access_level',
    },
    {
    title: 'Action',
    key: 'action',
    render: (text, record) => (
      <span>
        <a style={{ marginRight: 16 }}>Change {record.username}</a>
        <a>Delete</a>
      </span>
    ),
  },

  ];


const UserList = () => {
  const data = useContext(AppContext)
  const user_list = data['user_list']
  console.log(user_list)

return <>
   <div id = "dataelementslist"
            style ={{padding: '20px', 
                  backgroundColor: 'white', 
                  border: "1px solid rgb(230,230,230)", 
                  marginTop: '20px'}}
                  >

        <Title level = {4}>  List of users </Title>

        <Table dataSource={user_list} columns={columns} />

        </div>
        </>

}


export default UserList;
