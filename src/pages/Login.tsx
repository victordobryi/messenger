import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../redux-hooks';
import { userLogin } from '../store/reducers/auth/ActionCreator';
import { Spinner } from 'react-bootstrap';

const Login = () => {
  const [username, setUsername] = useState('');
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { isLoading } = useAppSelector((state) => state.auth);

  const login = async (username: string) => {
    await dispatch(userLogin(username));
    navigate('/chat');
  };

  return isLoading ? (
    <Spinner animation="border" role="status">
      <span className="visually-hidden">Loading...</span>
    </Spinner>
  ) : (
    <Container>
      <Form
        className="d-flex justify-content-center flex-column"
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
