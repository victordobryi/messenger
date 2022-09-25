import React from 'react';
import { Container } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const MessageForm = () => {
  return (
    <Container>
      <Form>
        <Form.Group className="mb-3">
          <Form.Control type="text" placeholder="Addressee" />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Control type="text" placeholder="Title" />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Control
            style={{ resize: 'none' }}
            as="textarea"
            placeholder="Text message"
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
