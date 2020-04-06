import React, {useState, useContext} from 'react';
import { AppContext } from '../Context';
import { map, without, filter} from 'lodash';
import { Form, Input, Button, Select, message, Typography, AutoComplete, Row, Col, Checkbox} from 'antd';
import styled from 'styled-components';
import { SolutionOutlined, RollbackOutlined} from '@ant-design/icons';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

const formItemLayout = {
    labelCol: {
        sm: { span: 8 },
    }
};


const titleLayout = {
    labelCol: {
        sm: { span: 8 },
    }
};


const { Title } = Typography; 
const { TextArea } = Input;
const { Option } = Select;



const AppLayout = styled.div`
  display: grid;
  padding: 2em;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1000px;
`



const Document = (props) => {
    const unique_id = props.location.param

    console.log(unique_id)
    const data = useContext(AppContext)
    const docData = data['ledger']
    console.log(docData)
    const entities_list = data['entities_list']
    const temp_id = "00065925-46d0-4e2d-a39d-11cc72e7e728"

    const specific_doc = filter(docData, function(o){
        return o.unique_id == temp_id;
    })


    console.log(specific_doc)
    let keys = Object.keys(specific_doc[0])
    let values = Object.values(specific_doc[0])


    const [form] = Form.useForm();
    const initialValues = specific_doc[0]
        
    const document_types = ["Announcement", "Refund", "Payment"]
    const document_type_json = []
    document_types.map(type => {
        document_type_json.push({'value' : type})
    })

    const entities_list_json = []
    entities_list.map(entity => {
        entities_list_json.push({'value': entity})
    })


    const states = ["Alabama","Alaska","Arkansas","Arizona","California","Colorado","Connecticut","Delaware","Florida","Georgia","Hawaii","Iowa","Idaho","Illinois","Indiana","Kansas","Kentucky","Louisiana","Maine","Maryland","Massachusetts","Michigan","Minnesota","Missouri","Mississippi","Montana","North Carolina","North Dakota","Nebraska","New Hampshire","New Jersey","New Mexico","Nevada","New York","Ohio","Oklahoma","Oregon","Pennsylvania","Rhode Island","South Carolina","South Dakota","Tennessee","Texas","Utah","Virginia","Vermont","Washington","Wisconsin","West Virginia","Wyoming"]
    let statesjson = []
    states.map(state => {
        statesjson.push({'value' : state})

    })


    let form_list = [
        <Form.Item
        name = "state"
        label = "State"
        key ="state"
        >
                    <AutoComplete
                            options = {statesjson}
                            filterOption={(inputValue, option) =>
                                option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                              }>
        <Input size = "large"/>
        </AutoComplete>
        </Form.Item>,
           <Form.Item
           name = "document_type"
           label = "NOTICE TYPE"
           key = "document_type"
                           
           >
               <AutoComplete
               options = {document_type_json}
               >
                   <Input size = "large"/>
               </AutoComplete>
               
       </Form.Item>]

let announcement_types = ["Apportionment issues", "Information request", "Audit", "Net operating losses"]

const announcement_list_json = []
announcement_types.map(type => {
    announcement_list_json.push({'value': type})
})


if (specific_doc[0].document_type === "Announcement" ) {

    let announce_form = <Form.Item
           name = "announcement_type"
           label = "ANNOUNCEMENT TYPE"
           key = "announcement_type"
           
           >   
               <AutoComplete
                        options = {announcement_list_json}
                   >         
                   <Input size = "large"/>
                   </AutoComplete>
       </Form.Item>


    form_list.push(announce_form)

    
    
}




let form_tail = [
            <Form.Item
           name = "entity_name"
           label = "ENTITY"
           key = "entity"
           
           >   
               <AutoComplete
                   options = {entities_list_json}
                   >         
                   <Input size = "large"/>
                   </AutoComplete>
       </Form.Item>,

     
        <Form.Item
            name = "amount"
            
            label = "AMOUNT USD"
            key = "amount">
                
            <Input size = "large"/>
        </Form.Item>,
        <Form.Item
            name = "notice_date"
            label ="NOTICE DATE"
            
            key = "notice_date">
                <Input size = 'large'/>
        </Form.Item>,

        <Form.Item
            name = "status"
            label ="STATUS"
            key = "">
                <Select defaultValue = {initialValues.status} size = "large">
                    <Option value="in_progress">In Progress</Option>
                    <Option value="filed">Filed</Option>
                    <Option value="complete">Complete</Option>
                    <Option value="extension">Extension</Option>
                    <Option value="rxed">Notice Rx'd</Option>

                </Select>
        </Form.Item>,
          <Form.Item
          name="remarks"
          label="REMARKS"
          key="remarks">

                  <TextArea
                      placeholder="Additional remarks"
                      autoSize={{ minRows: 2, maxRows: 6 }}
                  />
          
      </Form.Item>
         

    ]

    form_list.push(form_tail)

    const showFeedback = () => {
        message.info('Notice has been updated');
    }
    return <>
    <AppLayout>
    <div>
    <img 
      src={encodeURI("https://jpeg-bucket-stream.s3-eu-west-1.amazonaws.com/Maarten_QA_16f5b202-c619-462d-9d73-90543a307920.jpeg")}
      alt="new"
      width={595}
    />
            </div>

            <div className = "rightHandside">
                <div style = {{padding: '1em'}}>
            
                        <div className ="actualTitle" style ={titleLayout}>    
                        <Row>
                                    <Col sm={8}>
                                    </Col>
                                    <Col>
                                    <Title level = {4}> 
                                        Classification
                                    </Title>
                                </Col>
                        </Row>     
                            
                            
                          
                    </div>
                <Form
                {...formItemLayout}
                layout = "horizontal"
                initialValues={initialValues}
                onFinish = {showFeedback}
                >
                {form_list.map(field => {
                    return (
                        field
                    )
                })
                }
                <Row>
                                    <Col sm={8}>
                                    </Col>
                                    <Col>
                                         <Button type = "primary" 
                                                    htmlType = "submit"
                                                    style = {{float:'center'}}
                                                    >
                                                <SolutionOutlined />
                                                Update classification
                                            </Button>
                                            <Button style = {{float:'right'}}>
                                                <RollbackOutlined />
                                                <Link to="/management">
                                                Return to document system
                                                </Link>
                                                </Button>


                                    </Col>
                </Row> 


                

           
          
                </Form>
                </div>


                <div style = {{paddingLeft: '50px', marginTop:'1em'}}>
         

            
               </div>

            </div>


    </AppLayout>
        

    </>
}

export default Document;