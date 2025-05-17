import React, { useEffect, useState } from 'react';
import { Message, Persons } from '../interfaces/Interface';
import {
  Button,
  TextInput,
  TextArea,
  Toggle,
  InlineNotification,
  Grid,
  Row,
  Column
} from '@carbon/react';
import { useParams } from 'react-router';

const MessageChat = () => {
  const {id} = useParams()
  const [person,setPerson] = useState<Persons | null>(null)
  const [mode, setMode] = useState<'email' | 'websocket'>('email');
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [error, setError] = useState('');

  const handleToggle = () => {
    setMode(prev => (prev === 'email' ? 'websocket' : 'email'));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setInput(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

useEffect(()=>{
  const fetchData = async ()=>{
    const response = await fetch(`http://elai-backend:4000/api/person/${id}`,{
      "method":'GET',
      "headers":{
        "Content-type":"application/json"
      }
    })
    const data = await response.json()
    setPerson(data)
  }
  fetchData()
},[id])
  const handleSubmit = () => {
    if (!input.name || !input.message || (mode === 'email' && !input.email)) {
      setError('Please fill out all required fields.');
      return;
    }

    const newMessage: Message = {
      id: Date.now(),
      name: input.name,
      email: input.email,
      subject: input.subject,
      message: input.message,
      createdAt: new Date(),
      updatedAt: new Date(),
      type: mode,
    };

    setMessages(prev => [newMessage, ...prev]);
    setInput({ name: '', email: '', subject: '', message: '' });
    setError('');
  };

  return (
    <>
     <h2>Send a {mode} Message</h2>
    <hr />
    <Grid fullWidth style={{ marginTop: 0, paddingTop: 0 }}>
    <Column lg={8} md={8} sm={4} className="person-card"  >
          <img
            src={person?.image}
            width={50}
            height={50}
            alt={`${person?.name}-image`}
            style={{borderRadius: "50%",margin:"5px"}}
          />
          <div>
          <h4>{person?.name}</h4>
          <p> {person?.email}</p>
          <p>{person?.phone}</p>
          </div>

        </Column>

        <Column lg={10} md={8} sm={4}>
         
          <h4 style={{ marginTop: '2rem' }}>Message Flow</h4>
          <ul style={{ listStyle: 'none', padding: 0, maxHeight: '16rem', overflowY: 'auto' }}>
            {messages.map((msg) => (
              <li
                key={msg.id}
                style={{
                  borderLeft: `4px solid ${msg.type === 'email' ? '#0f62fe' : '#42be65'}`,
                  backgroundColor: '#f4f4f4',
                  padding: '1rem',
                  marginBottom: '1rem',
                  borderRadius: '4px'
                }}
              >
                <div style={{ fontSize: '0.875rem', marginBottom: '0.25rem' }}>
                  [{msg.type.toUpperCase()}] {msg.name} @ {msg.createdAt.toLocaleTimeString()}
                </div>
                {msg.subject && <strong>{msg.subject}</strong>}
                <div>{msg.message}</div>
              </li>
            ))}
          </ul>
          <Toggle
            id="mode-toggle"
            labelA="Email"
            labelB="WebSocket"
            toggled={mode === 'websocket'}
            onToggle={handleToggle}
          />

          {error && (
            <InlineNotification
              kind="error"
              title="Form error"
              subtitle={error}
              onCloseButtonClick={() => setError('')}
            />
          )}

          <TextInput
            id="name"
            labelText="Name"
            name="name"
            value={input.name}
            onChange={handleChange}
            required
          />

          {mode === 'email' && (
            <>
              <TextInput
                id="email"
                labelText="Email"
                name="email"
                type="email"
                value={input.email}
                onChange={handleChange}
                required
              />
              <TextInput
                id="subject"
                labelText="Subject"
                name="subject"
                value={input.subject}
                onChange={handleChange}
              />
            </>
          )}

          <TextArea
            id="message"
            labelText="Message"
            name="message"
            rows={4}
            value={input.message}
            onChange={handleChange}
            required
          />

          <Button kind="primary" onClick={handleSubmit}>
            Send {mode} Message
          </Button>

        </Column>
    </Grid>
    </>
  );
};

export default MessageChat;
