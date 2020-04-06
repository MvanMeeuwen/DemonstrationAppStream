import React, { useState } from 'react'
import {Auth} from 'aws-amplify';


import { Button, Descriptions, Divider, List, Drawer, Form, Input, Select , Typography, notification} from 'antd';

const { Option } = Select;
const DrawerComponent = (drawervisibility, setDrawervisibility) => {
    const [form] = Form.useForm();
    const [verificationform] = Form.useForm();

    const [confirmcodeVisibility, setConfirmcodeVisibility] = useState(false)
    const [newuser, setNewuser] = useState('user')
    
    const closeDrawer = () => {
        setDrawervisibility(false)
    };

    const confirmNotification = (email) => {

      notification.open({
        message: 'Sent confirmation',
        description:
          'An invitation as well as a verification code has been sent to' + email 
      });



    }

    const submitCredentials = (values) => {
        setConfirmcodeVisibility(true)
        console.log('values:', values);
        let username = values.name
        setNewuser(username)
        let password = values.password
        let email  = values.email
        let customer = values.customer
        let access_level = values.access_level
        Auth.signUp({
            username,
            password,
            attributes: {
                'email': email,          // optional
                'custom:customer': customer,
                 'custom:access_level': access_level  // optional - E.164 number convention
                // other custom attributes 
            },
            validationData: []  //optional
            })
            .then(data => {
              console.log(data)
              confirmNotification(values.email)
            })
            .catch(err => console.log(err));

      }


    const verifyUser = (values) => {
        console.log(values)
        let code = values.code
        let username = newuser
        Auth.confirmSignUp(username, code, {
            // Optional. Force user confirmation irrespective of existing alias. By default set to True.
            forceAliasCreation: true    
          }).then(data => console.log(data))
          .catch(err => console.log(err));
        

    }
    return <>
     
     <Drawer
        title="Create a new account"
        width={360}
         visible={drawervisibility}
         onClose={closeDrawer}
         bodyStyle={{ paddingBottom: 80, border: "1px solid rgb(230,230,230)" }}
         footer={
           <div
             style={{
               textAlign: 'right',
             }}
           >
           </div>
         }
        >

        <Form 
            layout="vertical"
            form = {form} 
            onFinish={submitCredentials}
            hideRequiredMark>
                <Form.Item
                  name="name"
                  label="Name"
                  rules={[{ required: true, message: 'Please enter user name' }]}
                >
                  <Input placeholder="Please enter user name" />
                </Form.Item>
                <Form.Item
                  name="email"
                  label="Email"
                  rules={[{ required: true, message: 'Please enter your email' }]}
                >
                  <Input placeholder="Please enter email address" />
                </Form.Item>
                
                <Form.Item
                  name="password"
                  label="Temporary password"
                  rules={[{ required: true, message: 'Please select a temporary password' }]}
                >
             <Input.Password placeholder="Please select temporary password" />
                </Form.Item>     
                <Form.Item
                  name="access_level"
                  label="Access level"
                  rules={[{ required: true, message: 'Please indicate access rights' }]}
                >
                  <Select placeholder="Indicate access rights">
                    <Option value="admin">Administrator access</Option>
                    <Option value="full">Full access</Option>
                    <Option value="third-party">Customized access</Option>
                  </Select>
                </Form.Item>     

                <Form.Item
                  name="customer"
                  label="Customer"
                  rules={[{ required: true, message: 'Please the name of your organization' }]}
                >
                  <Input placeholder="Please the name of your organization" />
                </Form.Item>
           
              <Button type="primary" htmlType="submit">
                Add user
              </Button>
          </Form>

       

       
              
          
          
          
   
        </Drawer>
    </>
}

export default DrawerComponent