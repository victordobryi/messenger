import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../redux-hooks';
import { userLogout } from '../../store/reducers/auth/ActionCreator';

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { isAuth } = useAppSelector((state) => state.auth);

  const logout = async () => {
    await dispatch(userLogout());
    navigate('/main');
  };

  return (
    <Navbar expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand>
          <LinkContainer to="/">
            <Nav.Link>VK-app</Nav.Link>
          </LinkContainer>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          {!isAuth ? (
            <Nav className="ms-auto">
              <LinkContainer to="/login">
                <Nav.Link eventKey={2}>LogIn</Nav.Link>
              </LinkContainer>
            </Nav>
          ) : (
            <Nav className="ms-auto">
              <LinkContainer to="/messages">
                <Nav.Link eventKey={2}>All messages</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/messageForm">
                <Nav.Link eventKey={2}>Send Message</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/main">
                <Nav.Link onClick={logout} eventKey={2}>
                  LogOut
                </Nav.Link>
              </LinkContainer>
            </Nav>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
