import React from 'react';
import ReactExport from "react-data-export";
import { Button, Select, Divider, Typography, Table} from 'antd';
import { FileExcelOutlined } from '@ant-design/icons';

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;




const Export = (data) => {

      const columns_new = [
        { title: "Tax Authority", width: {wch: 20}},
        { title: "Tax Year", width: {wch: 10}},
        { title: "Entity name", width: {wch: 50}},
        { title: "Document type", width: {wch: 20} },
        { title: "Announcement type", width: {wch: 20} },
        { title: "Status", width: {wch: 20}},
        { title: "Dollar value", width: {wch: 10}},
        { title: "Notice date", width: {wch: 15}},
        { title: "Payment due", width: {wch: 15}}
        
      ]
    const ordered_documents = []
    data.map(item => {
        let ordered_item = {
            'state': item.state,
            'tax_year': item.tax_year,
            'entity_name': item.entity_name,
            'document_type': item.document_type,
            'announcement_type' : item.announcement_type,
            'status': item.status,
            'amount': item.amount, 
            'notice_date': item.notice_date,
            'payment_due': item.payment_due
        }
        let row = []
        const values = Object.values(ordered_item)
        for (let i = 0; i < values.length; i ++ ){
            let element = {value: values[i]}
            row.push(element)
        }
        ordered_documents.push(row)
    })


   

    const documentsExport = [{
        columns: columns_new,
        data: ordered_documents
    }];

    
    return <>

            <div>
            <div className = "block" style = {{display: 'block', paddingBottom: "20px"}}>
            Number of documents in selection: {data.length}
            </div>
                <ExcelFile  filename ="StreamDownload" 
                    element={<Button type = "primary">
                            <FileExcelOutlined /> Export to Excel </Button>}>
                    <ExcelSheet dataSet={documentsExport} name="Organization"/>
                </ExcelFile>
            </div>
    

    


    </>
    
}

export default Export; 