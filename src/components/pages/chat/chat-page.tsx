import React, { useEffect, useState } from 'react'
import { Avatar, Input } from 'antd';
import { Row, Col } from 'antd';
import { Button } from 'antd';
import { UserOutlined } from '@ant-design/icons';

const { TextArea } = Input;
const wsChannel = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx');

type MessageResponseType = {
    message: string
    photo: null | string
    userId: number
    userName: string
}
export const ChatPage: React.FC = () => {
    return (
        <div>
            <Messages />
            <SendMessageForm />
        </div>
    )
}

const Messages: React.FC = () => {

    const [messages, setMessages] = useState<MessageResponseType[]>([])

    useEffect(() => {
        wsChannel.addEventListener('message', (e: MessageEvent) => {
            let newMessage = JSON.parse(e.data)
            setMessages((prevMessage) => [...prevMessage, ...newMessage]);
        })
    }, [])


    return (
        <div style={{height: '380px', overflow: 'auto'}}>
            {messages.map((message) => <Message key={message.userId} message={message}/>)}   
        </div>
    )
}

const Message: React.FC<{message: MessageResponseType}> = ({message}) => {
    return (
          <>
            <Row gutter={[0,20]}>
                <Col span={2}>
                    {message.photo
                        ?   <Avatar size={50} src={message.photo}/>
                        :   <Avatar size={50} icon={<UserOutlined />} />
                    }    
                </Col>
                <Col span={20}>
                    {message.userName}
                </Col>
                
            </Row>
            <Row>
                {/* <Col span={2}></Col> */}
                <Col span={20}>
                        {message.message}
                </Col>
                
            </Row> 
                <hr /> 
            </>
       
    )
}

const SendMessageForm: React.FC = () => {

    const [message, setMessage] = useState('')
    const sendMessage = () => {
        wsChannel.send(message)
    }
   
    return (
        <>
        <Row>
            <Col span={10}>
                <Row gutter={[0,10]}>
                    <Col span={24}>
                        <TextArea onChange={(e) => setMessage(e.currentTarget.value)} value={message}/> 
                    </Col>
                    <Col span={24}>
                        <Button onClick={sendMessage} type="primary">Send</Button> 
                    </Col>
                </Row>
            </Col>
        </Row>
        
        </>
    )
}