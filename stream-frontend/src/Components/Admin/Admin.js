import React, {useState, useContext} from 'react';
import {Auth} from 'aws-amplify';
import { AppContext } from '../Context';
import { Button, Descriptions, Divider, 
    List, Drawer, Form, Input, Select, Typography,
    Checkbox, notification
} from 'antd';
import { PlusOutlined, LogoutOutlined, UserAddOutlined } from '@ant-design/icons';

import { signOut } from './AdminUtils'
import  Feedback from '../Feedback'
import DrawerComponent  from './DrawerComponent'
import EntityManagement from './EntityManagement'
import DataElementsManagement from './DataElementsManagement'
import Userlist from './UserList'
const { Title } = Typography;

const allDataElements = ["State", "Entity name", "Notice type", "Amount due", "Notice Date", "Some other"]
const selectedDataElements = ["State", "Entity name", "Notice type", "Amount due", "Notice Date"]



const Admin = () => {
    const data = useContext(AppContext)
    const authData = data['auth']
    

    const [user, setUser] = useState(null)
    const [drawervisibility, setDrawervisibility] = useState(false)
    
            


    const showDrawer = () => {
        setDrawervisibility(true)
      };
  

    const onChangeElements = (values) => {
        console.log(values)
    }



 
    return <>
    <div className = "feedback" style = {{float: 'left', marginLeft: '100px', paddingTop : '20px'}}>
    <Feedback />
    </div>
    <div className = "signoutbutton" style = {{paddingTop : '20px'}}>
            <Button onClick={signOut} style = {{float: 'right', marginRight: '100px'}} type  ="primary"> <LogoutOutlined /> Sign out</Button>
    </div>
    <div className = "container" style = {{marginLeft: '100px', marginRight: '100px'}}>
           
      
     
        <div id = "userinfo"
            style ={{padding: '20px', 
                  backgroundColor: 'white', 
                  border: "1px solid rgb(230,230,230)", 
                  marginTop: '60px'}}
                  >

     

        <Title level = {4}>  User information </Title>
    <Descriptions style = {{marginTop: '20px'}}
                bordered
                >
        <Descriptions.Item label="Username">{authData.username}</Descriptions.Item>
        <Descriptions.Item label="Organization">{authData.customer}</Descriptions.Item>
    </Descriptions>

        </div>

        <Button type="primary" onClick={showDrawer} style = {{marginTop: '20px'}}>
        <UserAddOutlined /> New user
        </Button>



   
    
        <Userlist/>
        <DataElementsManagement />
        <EntityManagement />


        {DrawerComponent(drawervisibility, setDrawervisibility)}

    
      </div>

      </>

}


export default Admin;