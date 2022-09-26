import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import MessageService from '../API/MessageService';
import { IMessage } from '../models/IMessage';
import { useAppSelector } from '../redux-hooks';

const UserMessages = () => {
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const { id } = useParams();
  const { user } = useAppSelector((state) => state.auth);

  useEffect(() => {
    const getMessages = async () => {
      const allMessages = (await MessageService.getMessages()).data;
      const messageToCurrentuser = allMessages.filter(
        (message) => message.toUserId === user.id && message.fromUserName === id
      );
      setMessages(messageToCurrentuser);
    };
    getMessages();
  }, []);

  return <div>{id}</div>;
};

export default UserMessages;
