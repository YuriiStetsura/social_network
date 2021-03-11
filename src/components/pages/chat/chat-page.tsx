import React, { useEffect, useState } from 'react'
import { Avatar, Input } from 'antd';
import { Row, Col } from 'antd';
import { Button } from 'antd';
import { UserOutlined } from '@ant-design/icons';

const { TextArea } = Input;

type MessageResponseType = {
    message: string
    photo: null | string
    userId: number
    userName: string
}
export const ChatPage: React.FC = () => {

    return (
        <div>
            <Chat />
        </div>
    )
}

const Chat: React.FC = () => {
    const [wsChannel, setWsChannel] = useState<WebSocket | null>(null)

    useEffect(() => {
        let ws : WebSocket;

        const closeHandler = () => {
            console.log('close')
            setTimeout(createChannel, 3000)
        }

        function createChannel() {
            ws?.removeEventListener('close', closeHandler)
            ws?.close()
            ws = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx')
            ws.addEventListener('close', closeHandler)
            setWsChannel(ws)  
        }
        createChannel();

        return () => {
            ws.removeEventListener('close', closeHandler)
            ws.close()
        }
    }, [])


    return (
        <div>
            <Messages wsChannel={wsChannel}/>
            <SendMessageForm wsChannel={wsChannel}/>
        </div>
    )
}

const Messages: React.FC<{wsChannel: WebSocket | null}> = ({wsChannel}) => {

    const [messages, setMessages] = useState<MessageResponseType[]>([])

    useEffect(() => {
        const messagesHandles = (e: MessageEvent) => {
            let newMessages = JSON.parse(e.data)
            setMessages(prevState =>([ ...prevState, ...newMessages ]));
        }
        wsChannel?.addEventListener('message', messagesHandles)

        return () => {
            wsChannel?.removeEventListener('message', messagesHandles)
        }
    }, [wsChannel])
    
    
    return (
        <div style={{height: '400px', overflow: 'auto'}}>
            {messages.map((message, index) => <Message key={index} message={message}/>)}   
        </div>
    )
}

const Message: React.FC<{message: MessageResponseType}> = ({message}) => {
    return (
          <>
            <Row gutter={[0,10]}>
                <Col span={1}>
                    {message.photo
                        ?   <Avatar size={40} src={message.photo}/>
                        :   <Avatar size={40} icon={<UserOutlined />} />
                    }    
                </Col>
                <Col span={20}>
                    <b>{message.userName}</b>
                </Col>
                
            </Row>
            <Row>
                <Col span={20}>
                        {message.message}
                </Col>
            </Row> 
                <hr /> 
            </>
       
    )
}

const SendMessageForm: React.FC<{wsChannel: WebSocket | null}> = ({wsChannel}) => {

    const [message, setMessage] = useState('')
    const [readyStatus, setReadyStatus] = useState<'pending' | 'ready'>('pending')

    useEffect(() => {
        const openHandler = () => {
            setReadyStatus('ready')
            console.log('ready')
        }
        wsChannel?.addEventListener('open', openHandler)
        return () => {
            wsChannel?.removeEventListener('open', openHandler)
        }
    }, [wsChannel])

    const sendMessage = () => {
        if(!message) {
            return 
        }
        wsChannel?.send(message)
        setMessage('')
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
                        <Button disabled={wsChannel == null || readyStatus !== 'ready'} onClick={sendMessage} type="primary">Send</Button> 
                    </Col>
                </Row>
            </Col>
        </Row>
        </>
    )
}