import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../actions/userActions';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Container } from "react-bootstrap";


const UserLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const userState = useSelector((state) => state.user);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(loginUser(email, password));
  };

  useEffect(() => {
    if (userState.isAuthenticated) {
      navigate('/home');
    }
  }, [userState.isAuthenticated, navigate]);

  return (
    <Container className='user-login'>
    <div className='login'>
         <div className="login-form">
      <h1 className='text-white'>User Login</h1>
      <Form onSubmit={handleLogin}>
        <div>
        <Form.Group controlId="email">
          <Form.Label>Email:</Form.Label>
          <Form.Control
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          </Form.Group>
        </div>
        <div>
        <Form.Group controlId="password">
          <Form.Label>Password:</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          </Form.Group>
        </div>
        <Button className='mt-2' type="submit" >Login</Button>
      </Form>
      {userState.loading && <p>Loading...</p>}
      {userState.error && <p style={{ color: 'red' }}>{userState.error}</p>}
    </div>
    </div>
    </Container>
  );
};

export default UserLogin;
