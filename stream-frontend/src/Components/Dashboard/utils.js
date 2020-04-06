import {groupBy, filter} from 'lodash';
import moment from 'moment';

const group_month = (documents) => {
    var month_grouping = groupBy(documents, function(n) {
      return n.month;
    });


 let months = Object.keys(month_grouping);

 const arrSum = arr => arr.reduce((a,b) => a + b, 0);

  const list_of_objects = [];
  for(let i =0; i< months.length; i++){
      const data_object = {}
      let index = months[i]
      let month_docs = month_grouping[index];
      let amount_payment = []
      let amount_refund = []
      for (let i = 0; i < month_docs.length; i++) {
        if (month_docs[i].document_type == "Payment") {
          amount_payment.push(month_docs[i].amount)
          
        } else if (month_docs[i].document_type == "Refund") { 
          amount_refund.push(Math.round(month_docs[i].amount/0.75))
        }
        
      }

      data_object.amount_payment = arrSum(amount_payment)
      data_object.amount_refund = arrSum(amount_refund)


      var groups = groupBy(month_docs, function(n){
            return n.document_type        
      })
      data_object.month = index 
      data_object.refunds = groups['Refund'].length
      data_object.payments = groups['Payment'].length
      data_object.announcements = groups['Announcement'].length
      data_object.epoch = moment(index, "YYYY/MM").valueOf()
      list_of_objects.push(data_object)
  }
  
  list_of_objects.sort(function(a, b) {
    return a.epoch - b.epoch;
  })
 return list_of_objects

}

export default group_month