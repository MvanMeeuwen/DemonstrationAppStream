import React, {useContext, useState} from 'react';
import { AppContext } from '../Context';
import styled from 'styled-components';
import moment from 'moment';


import {Select, Typography, Spin, DatePicker, Row, Col} from 'antd';


import LineChart  from './LineChart'

import group_month from './utils'

const {Option} = Select;
const { MonthPicker } = DatePicker;
const {Title} = Typography;

const AppLayout = styled.div`
  display: grid;
  padding: 1em;
  grid-template-columns: 1fr 3fr;
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

    
    return (
        <AppLayout>
            <div style ={{padding: '20px'}}>
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
    
        </div>


        <div style ={{padding: '20px', 
                  marginLeft: '20px'}}>
            <LineChart data = {filtered_data} variable = {variable}/>
        </div>        


        
        </AppLayout>


        )
    
}


export default Dashboard;