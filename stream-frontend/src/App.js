import React from 'react';
import { withAuthenticator } from 'aws-amplify-react';
import Amplify, { Auth } from 'aws-amplify';
import { BrowserRouter as Router, Route } from "react-router-dom";
import awsconfig from './aws-exports';

import { Layout} from 'antd';
import 'antd/dist/antd.css';



import FullHeader from './Components/Header/Header';
import Home from './Components/Home/Home'
import Upload from './Components/Upload/Upload';
import Backlog from './Components/Backlog/Backlog';
import Confirmation from './Components/Confirmation/Confirmation'
import NoticeManagement from './Components/NoticeManagement/NoticeManagement';

import Document from "./Components/NoticeManagement/Document";

import Dashboard from './Components/DashboardB/Dashboard'

import Admin from './Components/Admin/Admin';

import { AppProvider } from './Components/Context'

const { Content } = Layout;

Amplify.configure({
  API: {
      endpoints: [
          {
              name: "stream",
              endpoint: "https://oinzv0e099.execute-api.eu-west-1.amazonaws.com/api/",         
              custom_header: async () => {
                 return { Authorization: (await Auth.currentSession()).idToken.jwtToken }
              }
            }
            ]}
          });

          Amplify.configure(awsconfig);

          const App = () => {  
          
            return (
            
              <Router>
              <Layout className="layout">
              <FullHeader/> 
              <AppProvider>
              <Content style={{ paddingLeft: '50px', paddingRight: '50px', marginBottom: '200px'}}>                
                <Route exact path='/'           component={Home} />
                <Route exact path='/upload'           component={Upload} />
                <Route exact path='/backlog'          component={Backlog} />
                <Route exact path='/confirmation'     component={Confirmation} />
                <Route exact path='/management'       component={NoticeManagement} />
                <Route path="/document"         component ={Document} />
                <Route exact path="/dashboard"        component ={Dashboard} />
                <Route exact path='/admin'            component={Admin} />
              </Content>
              </AppProvider>
              
              
              </Layout>
            </Router>
              
            )
          
          }
          
  export default withAuthenticator(App);
          

