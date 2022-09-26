import React, { useContext, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../redux-hooks';
import { userLogin } from '../store/reducers/auth/ActionCreator';
import { Spinner } from 'react-bootstrap';
import SocketContext from '../context/SocketContext';

const Login = () => {
  const [username, setUsername] = useState('');
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { isLoading, error } = useAppSelector((state) => state.auth);
  const { socket, users, uid } = useContext(SocketContext).SocketState;

  const login = async (username: string) => {
    if (socket) {
      await dispatch(userLogin(username, socket));
    }
    navigate('/messageForm');
  };

  return isLoading ? (
    <Spinner animation="border" role="status">
      <span className="visually-hidden">Loading...</span>
    </Spinner>
  ) : (
    <Container>
      <span>{error}</span>
      <Form
        className="d-flex justify-content-center flex-column mt-3"
        onSubmit={(e) => {
          e.preventDefault();
          login(username);
        }}
      >
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Control
            type="text"
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </Container>
  );
};

export default Login;
