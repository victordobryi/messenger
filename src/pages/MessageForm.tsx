import React, { useState, useEffect } from 'react';
import { Typeahead } from 'react-bootstrap-typeahead';
import { Container } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import UserService from '../API/UserService';
import { useNavigate } from 'react-router-dom';
import MessageService from '../API/MessageService';
import { IUser } from '../models/IUser';
import { useAppSelector } from '../redux-hooks';
import { getCurrentDate } from '../utils/getCurrentTime';

const MessageForm = () => {
  const [selected, setSelected] = useState([]);
  const [usersNames, setUsersNames] = useState<string[]>([]);
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [selectedUser, setSelectedUser] = useState<IUser>();
  const navigate = useNavigate();

  const { user } = useAppSelector((state) => state.auth);

  useEffect(() => {
    const fetchData = async () => {
      const users = (await UserService.getUsers()).data;
      const userNames: string[] = [];
      users.forEach((user) => {
        userNames.push(user.username);
      });
      setUsersNames(userNames);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const users = (await UserService.getUsers()).data;
      const selectedUserName = selected[0];
      const currentUser = users.find(
        (user) => user.username === selectedUserName
      );
      if (currentUser) {
        setSelectedUser(currentUser);
      }
    };
    fetchData();
  }, [selected]);

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedUser) {
      await MessageService.addMessage({
        title,
        message,
        fromUserId: user.id,
        toUserId: selectedUser.id,
        currentDate: getCurrentDate(),
        fromUserName: user.username
      });
    }
    navigate(`/messages/${selected}`);
  };

  return (
    <Container>
      <Form onSubmit={sendMessage}>
        <Form.Group className="mb-3">
          <Typeahead
            id="basic-typeahead-single"
            labelKey="name"
            onChange={setSelected}
            options={usersNames}
            placeholder="Choose an addressee..."
            selected={selected}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Control
            type="text"
            placeholder="Title"
            onChange={(e) => setTitle(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Control
            style={{ resize: 'none' }}
            as="textarea"
            placeholder="Text message"
            onChange={(e) => setMessage(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Send
        </Button>
      </Form>
    </Container>
  );
};

export default MessageForm;
