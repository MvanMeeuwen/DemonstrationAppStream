import React, {useState, useEffect, useContext} from 'react';
import { API } from 'aws-amplify';
import GeoChart from './GeoChart';
import Legend from './Legend';
import {Select, Typography, Spin} from 'antd';
import geodata from "./gz_2010_us_040_00_500k.json";
import "./graph.css";
import MergeData from './MergeData';
import { AppContext } from '../Context';
import {groupBy} from 'lodash';
import { group } from 'd3';

const { Option } = Select;
const { Title, Text } = Typography

const Backlog = () => {
  const contextData = useContext(AppContext)
  
  const groupedData = contextData['documents_grouped_state']

  const newData = contextData['demo']['Items']
  
      
    var state_grouping = groupBy(newData, function(n) {
      return n.state;
    });

  groupedData.map(state => {

      if (state.state == "Pennsylvania") {
        state['demo'] = state_grouping['Pennsylvania'].length
      } else if ( state.state == "Illinois") {
        state['demo'] = state_grouping["Illinois"].length
      } else if ( state.state == "California") {
        state['demo'] = state_grouping["California"].length
      } else {
        state['demo'] = 0
      }
  })

  console.log(groupedData)
  const data = MergeData({geodata, groupedData})
  const [property, setProperty] = useState("demo")

  let legendText = "Number of notices in backlog"

  

  return (
      <>
      <div className = "Graph" style = {{paddingTop : '20px'}}>
      <Title level = {3}>Geographic overview of backlog</Title>
      <Text>
        {legendText}
      </Text>
      <Legend data={data} property={property} />
      <GeoChart data={data} property={property} />
      </div>



    </>
  );
}




export default Backlog;