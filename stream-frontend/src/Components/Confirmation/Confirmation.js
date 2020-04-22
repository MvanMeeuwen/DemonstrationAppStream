import React, {useState, useContext, useEffect} from 'react';
import { AppContext } from '../Context';
import { map, without, filter} from 'lodash';
import { Storage } from 'aws-amplify'
import { Form, Input, Button, Select, message, Typography, AutoComplete, Row, Col, Checkbox, Progress, Result} from 'antd';
import styled from 'styled-components';
import { CheckOutlined, RollbackOutlined, ExclamationOutlined} from '@ant-design/icons';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";


const formItemLayout = {
    labelCol: {
        sm: { span: 8 },
    }, 
  
};


function isString(x) {
    return Object.prototype.toString.call(x) === "[object String]"
  }


const { TextArea } = Input;
const { Title } = Typography; 
const { Option } = Select;
const AppLayout = styled.div`
  display: grid;
  padding: 2em;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1000px;
` 



const Confirmation = () => {
    
    const data = useContext(AppContext)
    const docData = data['demo']['Items']
    const entities_list = data['entities_list']
    const [count, setCount] = useState(0)
    const [image, setImage] = useState(null)
     
    const doc_unique_ids = []
    docData.map(notice => {
        doc_unique_ids.push(notice.unique_id)
    })
     
    const fetchData = () => {
        Storage.get(doc_unique_ids[count] + '.jpeg', {level: 'public'})
        .then(data => setImage(data))
        .catch(err => console.log(err))
        }

        useEffect(() => {
            fetchData();
          }, [count]);
        

    
    const data_elements = ["TAX YEAR", "NOTICE DATE", "AMOUNT", "NOTICE NUMBER",  "DUE DATE"]

    const initialValues = docData[count]
    
    console.log(doc_unique_ids[count])
    
    let keys = Object.keys(initialValues)
    let values = Object.values(initialValues)
    const initialFormValues = {}
    
    keys.map(key => {
        let item = initialValues[key]
        if ( isString(item) ) {
            initialFormValues[key]  = item
        } else {
            initialFormValues[key] = item[0]
        }
        
    })

    
    const [form] = Form.useForm();
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


    let announcement_types = ["Apportionment issues", "Information request", "Audit", "Net operating losses"]
    let announcement_types_json = []
    announcement_types.map(type => {
        announcement_types_json.push({'value' : type})

    })
 
    


    let form_list = [
        <Form.Item
            name = "state"
            label = "STATE"
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
          label = "NOTICE CATEGORY"
          key = "document_type"       
          >
              <AutoComplete
              options = {document_type_json}
              >
                  <Input size = "large"/>
              </AutoComplete>
            </Form.Item>,
            <Form.Item
                name = "label"
                label = "NOTICE TYPE"
                key = "label"
            >   
                <Input size = "large"/>
            </Form.Item>]




if(keys.includes("announcement_type")) {
    let announcement_type_item = 
        <Form.Item
            label = "ANNOUNCEMENT TYPE"
            name = "announcement_type"
            key = "announcement_type"
        >

        <AutoComplete
            options = {announcement_types_json}>
            <Input size = "large"/>
        </AutoComplete>
    
        
    </Form.Item>
form_list.push(announcement_type_item)   


   }





  let entity_field =      <Form.Item
             name = "entity"
             label = "ENTITY"
             key = "entity_name"
             >   
             <AutoComplete
                 options = {entities_list_json}
                 >         
                 <Input size = "large"/>
                 </AutoComplete>
             </Form.Item>
    
    form_list.push(entity_field)   


  let id_field =      <Form.Item
  name = "ID"
  label = "FEIN / ACCOUNT ID"
  key = "ID"
  >   
           
      <Input size = "large"/>
  
  </Form.Item>

form_list.push(id_field)   

    
  

    keys.map(field => {
        if (data_elements.includes(field)) {
    
            let defaultvalue = initialValues[field][0]
            let optionvalues = []
            initialValues[field].map(option => {
                optionvalues.push({'value' : option})
            })

            let formitem = <Form.Item
                            label = {field}
                            name = {field}
                            key = {field}
                            >
                                 <AutoComplete
                                    options = {optionvalues}
                                 >
                                <Input size = "large"/>
                                </AutoComplete>
                            </Form.Item>
            form_list.push(formitem)   
        } 
    })
        let form_list_tail =  <Form.Item
                                name="remarks"
                                label="REMARKS"
                                key="remarks">
                            <TextArea
                                placeholder="Additional remarks"
                                autoSize={{ minRows: 2, maxRows: 6 }}
                            />
                            </Form.Item>         
        form_list.push(form_list_tail)
    const progress_percentage = Math.round((count/(docData.length-1))*100)

    const showFeedback = () => {
        message.info('Notice has been confirmed');
        setCount(count + 1)
        form.resetFields();
    }

    const showNegative = () => {
        message.info('Notice will be manually reviewed');
        setCount(count + 1)
        form.resetFields();
    }
    
    if (count == 13) {
        return <>
            <Result
                status="success"
                title="The backlog is empty!"
                
                    extra={
      <Button type="primary" key="console">
            <Link to ='/management' >Go to Notice management</Link>
      </Button>}
  />

        </>


    }
    return <>
        <AppLayout>
            <div>
            <img src = {image} width = '700px' />

            </div>
            <div className = "rightHandside">
                <div style = {{padding: '1em'}}>
                    <div className ="actualTitle" style ={{marginBottom: '1em'}}>     
                    <Row>
                        <Col sm={8}>
                        </Col>
                        <Col>
                        <Title level = {4}> 
                            Classification
                        </Title>
                        
                        </Col>
                    </Row>    

                        <Progress percent={progress_percentage} status="active" />
                    </div>
                </div>
                    <Form
                        {...formItemLayout}
                        layout = "horizontal"
                        form = {form}
                        initialValues={initialFormValues}
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
                                <CheckOutlined />
                                Confirm classification
                            </Button>
                            </Col>
                        </Row> 
                    </Form>

                 
            </div>
        </AppLayout>

    </> 
}


export default Confirmation;