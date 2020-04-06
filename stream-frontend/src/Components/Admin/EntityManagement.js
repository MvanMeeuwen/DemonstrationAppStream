import React, {useContext, useState} from 'react';
import { AppContext } from '../Context';
import { Button, Descriptions, Divider, List, Drawer, Form, Input, Select, Typography} from 'antd';
import { PlusOutlined, LogoutOutlined } from '@ant-design/icons';
const { Title } = Typography;







const EntityManagement = () => {
  const data = useContext(AppContext)
  const entity_list = data['entities_list']

  console.log(entity_list)

  const entities = []
  entity_list.map(item => {
    entities.push({title: item})
  })

  
  


    const [orgs, setOrgs] = useState(entities)
    const [visible, setvisible] = useState(false)


    const [formorg] = Form.useForm();

    const onFinish = values => {
        console.log('values:', values);
        setOrgs(orgs => [...orgs, {'title': values.entity}])
        setvisible(false)
      };
      
    
    const entityform =     <Form
                                style = {{marginTop: '20px'}}
                                form = {formorg}
                                name = "adduser"
                                onFinish={onFinish}
                                hideRequiredMark>
                            <Form.Item
                                name="entity"
                                label="Entity"
                                rules={[{ required: true, message: 'Please enter entity name' }]}>
                            <Input />
                                </Form.Item>
                            <Button type="primary" htmlType="submit">
                                Submit
                            </Button>
                            </Form> 

return <>

<div style ={{padding: '20px', 
                  backgroundColor: 'white', 
                  border: "1px solid rgb(230,230,230)", 
                  marginTop: '20px'}}>
    <Title level = {4}>  List of managed entitities </Title>
 <List
    itemLayout="horizontal"
    dataSource={orgs}
    renderItem={item => (
      <List.Item
          actions={[<a key="list-loadmore-edit">edit</a>, <a key="list-loadmore-more">delete</a>]}

        >
        <List.Item.Meta
          title={item.title}
        />
      </List.Item>
    )}
    
  />      
    <Button onClick={() => setvisible(true)} type ="primary">
        <PlusOutlined/> New entity
    </Button>

    {visible === false ? null : entityform}


    </div>
        </>

}


export default EntityManagement;
