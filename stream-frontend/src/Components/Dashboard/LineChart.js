import React, { PureComponent } from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';
import { line, map } from 'd3';




const Graphed = ({data, variable}) => {

    

    const colors = ['#1890ff', "#389e0d", "#d4380d"]
    const types = ["refunds", "payments", "announcements"] 
    
    const typelist = [];
    for (let i = 0; i < types.length; i++){
        let line = <Line type="monotone" dataKey={types[i]} stroke={colors[i]} strokeWidth={2} />
        typelist.push(line)
    }

    const amount_list = []

    
    const amount = [<Line type="monotone" dataKey={"amount_refund"} stroke={colors[0]} strokeWidth={2} />,
                    <Line type="monotone" dataKey={"amount_payment"} stroke={colors[1]} strokeWidth={2} />]

    let unit = variable === "dollar" ? "$" : ""
   
    return (
      <LineChart
        width={800}
        height={400}
        data={data}
        margin={{
          top: 5, right: 30, left: 20, bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis unit={unit}/>
        <Tooltip />
        <Legend />
        {variable === "dollar" ? amount : typelist}
        
        
    
      
      </LineChart>
    );
  
}

export default Graphed;