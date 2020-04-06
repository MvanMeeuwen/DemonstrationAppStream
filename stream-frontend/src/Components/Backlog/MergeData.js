const MergeData = ({geodata, groupedData}) => {
  
  for (let i = 0; i < groupedData.length; i ++){
    var state = groupedData[i].state;
    var documents = groupedData[i].nr_documents; 
    var amount = groupedData[i].total_amount;
    var demo = groupedData[i].demo 
    for (let j = 0; j < geodata.features.length; j++){
      var jsonState = geodata.features[j].properties.NAME;
      if (state === jsonState) {
        geodata.features[j].properties.documents = documents; 
        geodata.features[j].properties.amount = amount
        geodata.features[j].properties.demo = demo; 
        break;
      }
    }
    
  }
    return geodata
  }


  export default MergeData;