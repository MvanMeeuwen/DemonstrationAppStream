import React, {useState, useEffect, createContext} from 'react';
import {API} from 'aws-amplify';
import {groupBy} from 'lodash';


const AppContext = createContext();


const AppProvider = (props) => {

    const [data, setData] = useState(null)

    const fetchData = async () => {
      let apiName = 'stream';
      let path = '/application_context'
      let myInit = { 
          headers: {}
      } 
      const result = await API.get(apiName, path, myInit);
      setData(result);
    };
  
    useEffect(() => {
      fetchData();
    }, []);

    const test = () => {
      if (data === null) {
          
      } else {
        const items = data['ledger']
        var state_grouping = groupBy(items, function(n) {
          return n.state;
        });

        const states = Object.keys(state_grouping)
        const data_per_state = Object.values(state_grouping)
        const arrSum = arr => arr.reduce((a,b) => a + b, 0);
        const datalist = [];
        states.map(state => {
          const data_object = {}
          let amount = [];
          let state_data = state_grouping[state]
          for (let i = 0; i < state_data.length; i++) {
            amount.push(state_data[i].amount)
          }
          data_object.state = state;
          data_object.total_amount = arrSum(amount)
          data_object.nr_documents = state_data.length
          let doctypes = groupBy(state_data, function(n) {
            return n.document_type
          })
        
          let types = Object.keys(doctypes)
          let values = Object.values(doctypes)
          let jsonObject = {}
          for (let i = 0; i < types.length; i++){
            jsonObject[types[i]] = values[i].length
          }
          data_object.distribution = jsonObject
          datalist.push(data_object)
        })
        data.documents_grouped_state = datalist;
        
      }
    }
    test()


    if (data  === null) {
        return null 
      } 
    
    


    return (

        <AppContext.Provider value={data}>
                {props.children}
        </AppContext.Provider>
    )


}

export {AppContext, AppProvider};