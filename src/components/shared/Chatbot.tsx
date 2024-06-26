import { Input, Col, Row } from 'antd'
import type { SearchProps } from 'antd/es/input/Search';
import {
    SendOutlined
} from "@ant-design/icons";
import { useState } from 'react';
import { GetAI } from '@/lib/api/chatbot-api';
const Chatbot = () => {
    const { Search } = Input;
    const [inputValue, setInputValue] = useState<string>('');
    const [messages, setMessages] = useState<{ text: string, fromUser: boolean }[]>([]);
    const onSearch: SearchProps['onSearch'] = (value) => {
        setMessages(prevMessages => [...prevMessages, { text: value, fromUser: true }]);
        GetAI(value)
            .then((res) => {
                if (res.ids == null) {
                    const aiResponse = res.message;
                    setMessages(prevMessages => [...prevMessages, { text: aiResponse, fromUser: false }]);
                }
                else {
                    const aiResponse = `https://web-booking-tour.vercel.app/tour/${res.ids[0]}`;
                    setMessages(prevMessages => [...prevMessages, { text: aiResponse, fromUser: false }]);
                }
            })
        setInputValue("")
    };
    return (
        <div className="chatbot__container">
            <div className="chatbot__messages">
                {messages.map((message, index) => (
                    <Row key={index} className="chatbot__item" justify={`${message.fromUser ? 'end' : 'start'}`}>
                        <Col className='item__message' style={{ backgroundColor: message.fromUser ? "" : "rgb(123, 188, 176)" }}>{message.text}</Col>
                    </Row>
                ))}
            </div>
            <div className="chatbot__input">
                <Search
                    placeholder="Nhập nội dung câu hỏi"
                    size="large"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onSearch={onSearch}
                    enterButton={<SendOutlined />}
                />
            </div>
        </div>
    )
}

export default Chatbot