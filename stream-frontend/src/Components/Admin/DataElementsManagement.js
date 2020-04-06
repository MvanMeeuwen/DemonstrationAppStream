import React from 'react';

import { Button, Descriptions, Divider, 
    List, Drawer, Form, Input, Select, Typography,
    Checkbox, notification
} from 'antd';

import { SyncOutlined } from '@ant-design/icons';

const { Title } = Typography;

const allDataElements = ["State", "Entity name", "FEIN", "Notice category", "Notice Type",  "Amount USD", "Notice Date"]
const selectedDataElements = ["State", "Entity name", "Notice category", "Amount USD", "Notice Date"]


const DataElementsManagement = () => {
    const [elementsForm] = Form.useForm();
    const dataelements_fieldlist = [];
    allDataElements.map(item => {
        if (selectedDataElements.includes(item)) {
        const formitem = <Form.Item>
                        <Checkbox defaultChecked = "true">
                            {item}</Checkbox>
                    </Form.Item>
        dataelements_fieldlist.push(formitem)

        } else {
        let formitem = <Form.Item >
                         <Checkbox>{item}</Checkbox>
                   </Form.Item>
        dataelements_fieldlist.push(formitem)
            
        }
    })

    const openNotification = () => {
        notification.open({
          message: 'Data elements have been updated',
          description:
            'Please refresh your browser for the results to be propagated.',
          onClick: () => {
            console.log('Notification Clicked!');
          },
        });
      };



    return (
        <div id = "dataelementslist"
            style ={{padding: '20px', 
                  backgroundColor: 'white', 
                  border: "1px solid rgb(230,230,230)", 
                  marginTop: '20px'}}
                  >

        <Title level = {4}>  Selected data elements </Title>


        <Form
            layout="vertical"
            form = {elementsForm} 
            onFinish={openNotification}
            hideRequiredMark>
                {
                    dataelements_fieldlist.map(field => {
                        return (

                            field
                             
                        )
                    })
                }
            <Button type = "primary" htmlType="submit">
            <SyncOutlined /> Update
              </Button>

        </Form>
    
        </div>
    )
    
}

export default DataElementsManagement;