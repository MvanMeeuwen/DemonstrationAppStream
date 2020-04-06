import React, {useContext, useState} from 'react';
import { AppContext } from '../Context';
import styled from 'styled-components';
import moment from 'moment';


import { Select, Typography, Spin, DatePicker, Row, Col,  Radio, Input, Button } from 'antd';

import { FilePptOutlined, FileExcelOutlined} from '@ant-design/icons'


import LineChart  from './LineChart'
import BarEntities from './BarEntities'
import StateLevel from './StateLevel'

import group_month from './utils'

const {Option} = Select;
const { MonthPicker } = DatePicker;
const {Title} = Typography;

const AppLayout = styled.div`
  display: grid;
  padding: 1em;
  grid-template-columns: 1fr 4fr;
  grid-template-rows: 1000px;
`

const Dashboard = () => {
    const contextData = useContext(AppContext)
    const documents = contextData['ledger'];
    const entities = contextData['entities_list']
    
    const [selectedEntities, setSelectedEntities] = useState(entities)

    const [variable, setVariable] = useState("notices")
    const dateFormat = 'YYYY-MM-DD';
    const startStr = moment('2019-01-01', dateFormat) 
    const [startDate, setstartDate] = useState(startStr)
    
    const now = moment().toDate()
    const endStr = moment(now, dateFormat) 
    const [endDate, setendDate] = useState(endStr)

    const [radiostate, setRadiostate] = useState("time")

      

    const handleentityChange = (event) => {
      if (event.length == 0) {
          setSelectedEntities(entities)
      } else {
          setSelectedEntities(event)
      }
  }

  function handlestartChange(date, dateString) {
    setstartDate(date)
  }

  function handleendChange(date, dateString) {
    setendDate(date)
}

    let dateFormatown = "MM/DD/YYYY"
    

    const documents_filtered = []
    documents.map(item => {
          let date_check = moment(item.notice_date, dateFormatown)          
          item.month = moment(item.notice_date).format('YYYY/MM')
          if (selectedEntities.includes(item.entity_name) && 
             date_check.isAfter(startDate) &&
             date_check.isBefore(endDate)
          ) {
            documents_filtered.push(item)
          }
    })
    
    const filtered_data = group_month(documents_filtered)

   


    const entitieschildren = []
    entities.map(entity =>{
        entitieschildren.push(<Option key={entity}>{entity}</Option>)
    })


    


    const radioStyle = {
        display: 'block',
        height: '30px',
        lineHeight: '30px',
      };


      const onviewChange = (value) => {
          console.log(value)
          setRadiostate(value.target.value)
      }


        let selectedView;
        if (radiostate === "time") {
            selectedView = <LineChart data = {filtered_data} variable = {variable}/>
        } else if (radiostate == "states") {
            selectedView = <StateLevel documents = {documents_filtered} variable = {variable}  />
        } else {
            selectedView = <BarEntities documents = {documents_filtered} variable = {variable}  />
        }


    
    return (
        <AppLayout>
            <div style ={{padding: '20px'}}>
             <div>
             <Title level={4}>
                View
            </Title>

            <Radio.Group onChange={onviewChange} value={radiostate}>
        <Radio style={radioStyle} value={"time"}>
          Time
        </Radio>
        <Radio style={radioStyle} value={"states"}>
          States
        </Radio>
        <Radio style={radioStyle} value={"entities"}>
          Entities 
        </Radio>
     
      </Radio.Group>

 


        

                 </div>   
            <Title level={4}>
                Selection criteria
            </Title>
            <p>
            Variable:
            </p>
            <Select
             style={{ width: 300 }}
             defaultValue={variable}
             onChange ={event => setVariable(event)}
             >
                <Option value="dollar">Dollar value </Option>
                <Option value="notices">Number of notices</Option>
            </Select>
            
        
            <div style = {{paddingTop: '1em'}}>
            <Row gutter = {10}>
                <Col>
                <p>
                Starting date
                </p>
                <MonthPicker 
            defaultValue={startStr}
            onChange={handlestartChange}
            />
                </Col>
            <Col>
            <p>
                Ending date:
                </p>
            <MonthPicker 
            style = {{float:'right'}}
            defaultValue={endDate}
            onChange={handleendChange}
            />
            </Col>
    
            </Row>
            </div>

            <div style = {{paddingTop: '50px'}}>
                <Button type = "primary">
                <FileExcelOutlined />
                    Export to Excel
                </Button>
                <Button style = {{marginTop: '20px'}} type = "primary">
                <FilePptOutlined />
                    Export to PowerPoint
                </Button>
            </div>
    
        </div>

        <div style ={{padding: '20px', 
                  marginLeft: '20px'}}>
                      {selectedView}
            
        </div>                
        </AppLayout>


        )
    
}


export default Dashboard;