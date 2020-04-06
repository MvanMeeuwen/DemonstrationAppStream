import React from 'react'
import Flowchart from './flowchart.svg'

import { Typography, Row, Col } from 'antd'

import ProblemIcon from './problem.svg'
import SolutionIcon from './solution.svg'
import './style.css'

const { Title, Paragraph, Text} = Typography





const Home = () => {

     
    const side = 4
    const center = 24 - 2 * side 


const problem_text = <div>
        <Title level = {2}>
            The problem
        </Title>
        <Paragraph>
            As many investors know, earning effectively connected income (ECI) within the United States means that one has to file State Income Tax returns in addition to Federal Income Tax returns.
        </Paragraph>
        <Paragraph>
            These state filings easily pile up as investors have large numbers of legal entities and some of the 50 states have multiple tax systems. 
        </Paragraph>
        <Paragraph>
            Furthermore, tax compliance, workflow management and document handling is not getting any easier by the fact that State Tax Notices are in paper form, sent over mail.
        </Paragraph>



</div>

const solution_text = <div>
        <Title level = {2}>
          Our solution
        </Title>

        <Paragraph>
        Stream is a web-based application that processes, manages and gives structured insight into State Tax Notices. Deep learning and machine learning methods are used to, automatically classify and extract the content of State Tax Notices.

        </Paragraph>

        <Paragraph>
            Stream is:
        </Paragraph>

        <Paragraph>
            <ul>
        <li>
        An <Text strong>automated classification system</Text>. Stream automatically classifies and derives the content of State Tax Notices. 

        </li>
        <li>
        A <Text strong>structured filing and archiving system</Text>. This content is stored in a structured way, meaning you can easily find and access State Tax Notices.
        </li>
        <li>
        A <Text strong>workflow management system</Text>. Required actions can easily be handled by other departments or third parties, through customized access to the system.
        </li>
        <li>
        A <Text strong>tax compliance dashboard</Text>. Reporting can be done easily through the Stream dashboard function. This contains an overview of the number of notices, dollar value payments, dollar value refunds, in time, per State or per legal entity.
        </li>
      </ul>
            </Paragraph>



</div>


    return (
        <div style = {{paddingTop: '50px'}}>
            <Row>
                <Col span = {side}>
                        <div style = {{float: 'right', paddingRight: '2em'}}>
                            <img src = {ProblemIcon} alt = 'problem' height = '100px'/>
                        </div>
                </Col>
                <Col span = {center}>
                {problem_text}
                </Col> 
                <Col span = {side}>
                </Col>
            </Row>

            <Row>
                <Col span = {side}>
                        <div style = {{float: 'right', paddingRight: '2em'}}>
                            <img src = {SolutionIcon} alt = 'problem' height = '100px'/>
                        </div>
                </Col>
                <Col span = {center}>
                {solution_text}
                </Col> 
                <Col span = {side}>
                </Col>
            </Row>

            <Row>
                <Col span = {side}>
                        
                </Col>
                <Col span = {center}>
                <Title>
                    Stream web application flow
                </Title>
                <Paragraph>
                    Lifecycle of a state tax notice
                </Paragraph>
                <div className="container-div">
                    <img src = {Flowchart} alt = "flowchart" height = '600px'/>

                </div>
                

                </Col> 
                <Col span = {side}>
                </Col>
            </Row>
                      
            
        </div>
    )
}




export default Home;