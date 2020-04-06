import React, { PureComponent } from 'react';
import {
  BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ComposedChart,
} from 'recharts';

import {groupBy, filter} from 'lodash';
import { Typography } from 'antd';
import styled from 'styled-components';
import './style.css'


const AppLayout = styled.div`
  display: grid;
  padding: 2em;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1000px;
` 




const BarEntities = (props) => {
    
      
        var grouped_entities = groupBy(props.documents, function(n) {
          return n.entity_name;
        })

        console.log(grouped_entities)

        let entities = Object.keys(grouped_entities);
        
      
        const arrSum = arr => arr.reduce((a,b) => a + b, 0);
        const list_of_objects = [];
        for(let i = 0; i < entities.length; i++) {
            const data_object = {};
            let index = entities[i];
            let entity_docs = grouped_entities[index];
            data_object.entity_name = index
            let amount_refund = []
            let amount_payment = []
            for (let i = 0; i < entity_docs.length; i++) {
                if (entity_docs[i].document_type == "Payment") {
                    amount_payment.push(entity_docs[i].amount)
                    
                  } else if (entity_docs[i].document_type == "Refund") { 
                    amount_refund.push(Math.round(entity_docs[i].amount))
                  }
            }

            data_object.amount_payment = arrSum(amount_payment)
            data_object.amount_refund = arrSum(amount_refund)
            data_object.amount_total = data_object.amount_refund + data_object.amount_payment
            data_object.nr_payments = amount_payment.length
            data_object.nr_refunds = amount_refund.length
            data_object.nr_announcements = entity_docs.length - amount_payment.length - amount_refund.length




            list_of_objects.push(data_object)




        }
        console.log(list_of_objects)

        const sorted_list = list_of_objects.sort((a, b) => (b.amount_payment - a.amount_payment))


        const bar_list = []
        const reduced_data = []
        for (let i = 0; i < 8; i++) {
            reduced_data.push(sorted_list[i])
            let barelement = <Bar dataKey="amount_refund" fill="#8884d8" />;
            bar_list.push(barelement)
        }

        
        let unit = props.variable === "dollar" ? "$" : ""
        let label = props.variable === "dollar" ? "Dollar value" : "Nr. of notices"
    return <>

<Typography.Title level = {2} >
          Entity-level view
        </Typography.Title>
        <Typography.Paragraph>
          Cumulative {props.variable === "dollar"? "dollar value" : "number of notices"} for 8 entities
        </Typography.Paragraph>
    <AppLayout>
      
      
      <div>
      <Typography.Title level = {4} >
          Payments
        </Typography.Title>
        <ComposedChart
        layout = 'vertical'
        width={450}
        height={700}
        data = {reduced_data}
        margin={{
          top: 5, right: 30, left: 50, bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis type="number" unit = {unit} label = {label} />
        <YAxis dataKey="entity_name" type="category"/>
        <Bar dataKey= {props.variable == "dollar" ? "amount_payment" : "nr_payments"} fill="#91d5ff" />
        <Tooltip />
      </ComposedChart>
      </div>

      <div>
        <Typography.Title level = {4} >
          Refunds
        </Typography.Title>
        <ComposedChart
        layout = 'vertical'
        width={450}
        height={700}
        data = {reduced_data}
        margin={{
          top: 5, right: 30, left: 50, bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis type="number" unit = {unit} label = {label} width = {400 } />
        <YAxis dataKey="entity_name" type="category"/>
        <Bar dataKey={props.variable == "dollar" ? "amount_refund" : "nr_refunds"}  fill="#002766" />
        <Tooltip />
      </ComposedChart>
      </div>

      

      </AppLayout>
    </>
}


export default BarEntities;