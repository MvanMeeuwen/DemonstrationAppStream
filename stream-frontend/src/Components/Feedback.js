import React, {useState, useContext} from 'react';
import { Modal, Button, Input, Rate, notification, Typography } from 'antd';
import { AppContext } from './Context';
const { Title, Paragraph, Text } = Typography;
const { TextArea } = Input;

const Feedback = () => {
    const contextData = useContext(AppContext)
    const auth = contextData['auth'];
    let message = "Hi " + auth.username + "!" 

    const [feedbackvisible, setFeedbackvisible] = useState(false)
    

    const showFeedback = () => {
        setFeedbackvisible(true)
    }

    const hideFeedback = () => {
        setFeedbackvisible(false)
    }

    const submitFeedback = () => {
            setFeedbackvisible(false)
        
        notification.open({
                message: 'Thank you for thinking with us!',
                description: 'We highly appreciate your feedback. We aim to respond to your comments or questions within a few business days.',
                duration: 10
              });
        }



    return <>
    <Button type="primary" onClick={showFeedback}>
          Talk to us!
    </Button>

    <Modal
          title= {message}
          visible={feedbackvisible}
          onOk={submitFeedback}
          onCancel={hideFeedback}
        >
            Ask us anything, or share your feedback.
            <Input placeholder="Topic" />


            <Rate />

            <TextArea    
                placeholder="PLACEHOLDER"
                autoSize={{ minRows: 3, maxRows: 5 }}
        />
    </Modal>



    </>
}


export default Feedback;