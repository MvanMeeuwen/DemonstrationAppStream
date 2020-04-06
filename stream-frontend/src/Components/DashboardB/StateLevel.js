import React, {useState, useEffect, useContext} from 'react';
import { Typography } from 'antd'
import MergeData from '../Backlog/MergeData';
import GeoChart from '../Backlog/GeoChart';
import Legend from '../Backlog/Legend';
import { AppContext } from '../Context';
import geodata from "../Backlog/gz_2010_us_040_00_500k.json";
const StateLevel = (props) => {
    const contextData = useContext(AppContext)
    const groupedData = contextData['documents_grouped_state']
    console.log(groupedData)
    const data = MergeData({geodata, groupedData})

    console.log(data)
    
    let property = props.variable === "dollar" ? "amount" : "documents"



    return <>
        <Typography.Title level = {2} >
          State-level view
        </Typography.Title>
        <Typography.Paragraph>
          Total {props.variable === "dollar"? "dollar value" : "number of notices"} across states
        </Typography.Paragraph>

        <Legend data={data} property={property} />
        <GeoChart data={data} property={property} />


    


    </>

    
}

export default StateLevel