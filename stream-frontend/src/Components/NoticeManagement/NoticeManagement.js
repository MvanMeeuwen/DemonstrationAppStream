import React, {useContext, useState} from 'react'
import { Button, Select, Divider, Typography, Table, Checkbox} from 'antd';
import { AppContext } from '../Context';
import styled from 'styled-components';
import moment from 'moment'
import { BrowserRouter as Router, Route, Link  } from "react-router-dom";
import { filter } from 'lodash'
import ReactExport from "react-data-export";


import Export from './Export'

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;


const AppLayout = styled.div`
  display: grid;
  padding: 2em;
  grid-template-columns: 1fr 4fr;
  grid-template-rows: 1000px;
`

const { Option } = Select;
const { Title } = Typography;

const states = ["Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware", "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming"]
const years = [2015, 2016, 2017, 2018, 2019, 2020]


const columns = [
    {
        title: 'STATE',
        dataIndex: 'state',
        key: 'state'
      },
    {
      title: 'ENTITY NAME',
      dataIndex: 'entity_name',
      key: 'entity'
    },
    {
        title: 'TAX YEAR',
        dataIndex: 'tax_year',
        key: 'tax_year'
      },
    {
        title: 'NOTICE DATE',
        dataIndex: 'notice_date',
        sorter: (a, b) => moment(a.notice_date).unix() - moment(b.notice_date).unix()
      },
      {
        title: 'AMOUNT USD',
        dataIndex: 'amount',
        key: 'amount',
        sorter: (a, b) => a.amount - b.amount,
      },
      {
        title: 'NOTICE TYPE',
        dataIndex: 'document_type',
        key: 'notice_type'
      },
      {
        title: 'ANNOUNCEMENT TYPE',
        dataIndex: 'announcement_type',
        key: 'announcement_type'
      },
      {
        title: 'STATUS',
        dataIndex: 'status',
        key: 'status'
      },

    {
        title: 'ACTION',
        key: 'action',
        render: (text, record) => {

                if (record.document_type == "Payment") {
                    return <>
                        <span>
                        <Link to= {{pathname: '/document', param: record.unique_id}}>
                                Review                       
                        </Link>
                        </span>
                    <br/>
                    <span>  
                        <Link >
                            Initiate payment                       
                            </Link>
                    </span >
                </>
            } else if (record.document_type == "Refund") {
                return <>
                <span>
                <Link to= {{pathname: '/document', param: record.unique_id}}>
                        Review                       
                </Link>
                </span>
            <br/>
            <span>  
                <Link >
                    Create account record                     
                    </Link>
            </span >
        </>
            } else {
                return (
                    <span>
                <Link to= {{pathname: '/document', param: record.unique_id}}>
                        Review                       
                </Link>
                </span>
                )
            }
        }
                 
        
       }
  ]
  


const NoticeManagement = () => {
    const data = useContext(AppContext)
    const documents = data['ledger']
    const entities = data['entities_list']

    const document_types = ["Refund", "Payment", "Announcement"]

    const [selectedStates, setSelectedStates] = useState(states)
    const [selectedEntities, setSelectedEntities] = useState(entities)
    const [selectedYears, setSelectedYears] = useState(years)
    const [selectedDocumentTypes, setSelectedDocumentTypes] = useState(document_types)

    const handlestateChange = (event) => {
        if (event.length == 0) {
            setSelectedStates(states)
        } else {
            setSelectedStates(event)
        }
    }

    const handleentityChange = (event) => {
        if (event.length == 0) {
            setSelectedEntities(entities)
        } else {
            setSelectedEntities(event)
        }
    }

    const handleyearChange = (event) => {
        let event_numeric = event.map(x => +x)
        if (event_numeric.length == 0) {
            setSelectedYears(years)
        } else {
            setSelectedYears(event_numeric)
        }
    }

    const handledocumenttypeChange = (event) => {
        let event_numeric = event.map(x => +x)
        if (event_numeric.length == 0) {
            setSelectedDocumentTypes(document_types)
        } else {
            setSelectedDocumentTypes(event)
        }
    }
 

    const documents_multiple = []
    documents.map(item => {
        if(selectedYears.includes(item.tax_year) && 
           selectedEntities.includes(item.entity_name) && 
           selectedStates.includes(item.state) &&
           selectedDocumentTypes.includes(item.document_type)
           ) {
            if (item.third_party == true ) {
                item['thirdparty'] = "Yes"
            } else {
                item['thirdparty'] = "No"
            }

            documents_multiple.push(item)
        }
    })
    

    const documents_exported = documents_multiple;



    const documenttypechildren = [];
    document_types.map(type =>{
            documenttypechildren.push(<Option key={type}>{type}</Option>)
    })
    
    const statechildren = [];
    states.map(state =>{
            statechildren.push(<Option key={state}>{state}</Option>)
    })

    const entitychildren = [];
    entities.map(entity =>{
            entitychildren.push(<Option key={entity}>{entity}</Option>)
    })

    const yearschildren = []
    years.map(year =>{
        yearschildren.push(<Option key={year}>{year}</Option>)
    })


    return <>
        <AppLayout>
        <div className="selectionpane" style = {{paddingRight: '5px'}}>
        <Title level = {2}> Selection criteria </Title>
        <div className = "block" style = {{display: 'block', paddingBottom: "20px"}}>

        <Title level = {4}> Notice types</Title>
            <Select
                    mode="multiple"
                    placeholder="All notice types selected"
                    onChange={handledocumenttypeChange}
                    style={{ width: '80%' }}
                >
                    {documenttypechildren}
            </Select>

        <Title level = {4}> States</Title>
            <Select
                    mode="multiple"
                    placeholder="All states selected"
                    onChange={handlestateChange}
                    style={{ width: '80%' }}
                >
                    {statechildren}
            </Select>

            <Title level = {4}> Entities</Title>
            <Select
                    mode="multiple"
                    placeholder="All entities selected"
                    onChange={handleentityChange}
                    style={{ width: '80%' }}
                >
                    {entitychildren}
            </Select>

            <Title level = {4}> Years </Title>
            <Select
                    mode="multiple"
                    placeholder="All years selected"
                    onChange= {handleyearChange}
                    style={{ width: '80%' }}
                >
                    {yearschildren}
            </Select>

        
                
            </div>

            {Export(documents_exported)}
            </div>



            <div className = "table">

            <Table   
                dataSource={documents_exported} 
                columns={columns} 
                />


            </div>

        </AppLayout>
    </>
}


export default NoticeManagement;