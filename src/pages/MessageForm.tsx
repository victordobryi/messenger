import React, { useState, useEffect } from 'react';
import { Typeahead } from 'react-bootstrap-typeahead';
import { Container } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import UserService from '../API/UserService';
import { IUser } from '../models/IUser';
import { useNavigate } from 'react-router-dom';

const MessageForm = () => {
  const [selected, setSelected] = useState([]);
  const [usersNames, setUsersNames] = useState<string[]>([]);
  const [users, setUsers] = useState<IUser[]>([]);
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const users = (await UserService.getUsers()).data;
      const userNames: string[] = [];
      users.forEach((user) => {
        userNames.push(user.username);
      });
      setUsersNames(userNames);
      setUsers(users);
    };
    fetchData();
  }, []);

  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(selected);
    console.log(title);
    console.log(message);
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
