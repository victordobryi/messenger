import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Accordion from 'react-bootstrap/Accordion';
import MessageService from '../API/MessageService';
import { IMessage } from '../models/IMessage';
import { useAppSelector } from '../redux-hooks';

const Messages = () => {
  const { user } = useAppSelector((state) => state.auth);
  const [allMessages, setAllMessages] = useState<IMessage[]>([]);

  useEffect(() => {
    const getMessages = async () => {
      const allMessages = (await MessageService.getMessages()).data;
      const messageToCurrentuser = allMessages.filter(
        (message) => message.toUserId === user.id
      );
      setAllMessages(messageToCurrentuser);
    };
    getMessages();
  }, []);

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
`;

export default Messages;
