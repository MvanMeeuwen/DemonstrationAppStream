import React from 'react';
import {useDropzone} from 'react-dropzone';
import {List, Typography} from 'antd';

import Amplify, { Auth, Storage } from 'aws-amplify';

import awsconfig from '../../aws-exports';
Amplify.configure(awsconfig);

const { Title } = Typography

function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);    
    });
  }



const Upload = () => {
    let auth = Auth;


    const onDrop = async(acceptedFiles) => {
        let authcontext = await auth.currentAuthenticatedUser()
        let username = authcontext.username
        console.log(username)
        let customer = authcontext.attributes['custom:customer']
        acceptedFiles.forEach((file) => {
          let uuid = uuidv4()
          //let filename = username +  "_" + customer +  "_" + uuid + ".pdf"
          let filename = file.name
          const reader = new FileReader()
          reader.onabort = () => console.log('file reading was aborted')
          reader.onerror = () => console.log('file reading has failed')
          reader.readAsBinaryString(file);
          reader.onload = () => {
          
            Storage.put(filename, file, {
              level: 'public'
              })
              .then(() => {
                  console.log("sucessfully saved file!")
              }).catch(err => {
            console.log('error uploading files!', err)
          }) 
    
          }
        })
    }
    const {getRootProps, getInputProps, acceptedFiles, rejectedFiles} = useDropzone({
        onDrop, 
        accept: ".pdf"})    

    return <>
      
        <div style ={{padding: '20px', 
                      backgroundColor: 'white',
                      marginTop: '60px'}}
                      >

        <div {...getRootProps()}>
          <input {...getInputProps()} />
          <Title level = {3}>Drag and drop notices </Title>
          <List
          size="small"
          header={<div>Accepted files:</div>}
          bordered
          dataSource={acceptedFiles}
          renderItem={item => <List.Item> {item.path}</List.Item>}
        />
             <List
          size="small"
          header={<div>Rejected files:</div>}
          bordered
          dataSource={rejectedFiles}
          renderItem={item => <List.Item>  {item.path}</List.Item>}
        />

        </div>
        
        </div>
    </>
}   

export default Upload;