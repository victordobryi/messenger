import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import Accordion from 'react-bootstrap/Accordion';
import MessageService from '../API/MessageService';
import { IMessage } from '../models/IMessage';
import { useAppSelector } from '../redux-hooks';
import SocketContext from '../context/SocketContext';

const Messages = () => {
  const { user } = useAppSelector((state) => state.auth);
  const [allMessages, setAllMessages] = useState<IMessage[]>([]);
  const { socket, users, uid, messages } =
    useContext(SocketContext).SocketState;

  useEffect(() => {
    const getMessages = async () => {
      const allMessages = (await MessageService.getMessages()).data;
      const messageToCurrentuser = allMessages.filter(
        (message) => message.toUserId === user.id
      );
      setAllMessages(messageToCurrentuser);
    };
    getMessages();
  }, [messages]);

  return (
    <Accordion>
      {allMessages.map(({ message, title, id, currentDate, fromUserName }) => (
        <Accordion.Item key={id} eventKey={String(id)}>
          <Accordion.Header>
            <Span>
              <b>From: </b>
              {fromUserName}
            </Span>
            <Span>
              <b>Title: </b>
              {title}
            </Span>
            <Span style={{ marginRight: '10px' }}>
              <b>When: </b> {currentDate}
            </Span>
          </Accordion.Header>
          <Accordion.Body>{message}</Accordion.Body>
        </Accordion.Item>
      ))}
    </Accordion>
  );
};

const Span = styled.button`
  margin-right: 10px;
  background: transparent;
  opacity: 0;
  animation: ani 2.5s forwards;
  @keyframes ani {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
`;

export default Messages;
