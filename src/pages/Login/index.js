import React from 'react';
import { useDispatch } from 'react-redux';
import { Title } from './styles';
import { Container } from '../../styles/GlobalStyles';
import * as EX from '../../store/modules/example/actions';

export default function Login() {
  const dispatch = useDispatch();

  function handleClick(e) {
    e.preventDefault();
    dispatch(EX.buttonClickSuccess());
  }
  return (
    <Container>
      <Title isRed>
        <h1>Login</h1>
        <small>beleza user</small>
      </Title>
      <button type='button' onClick={handleClick}>
        enviar
      </button>
    </Container>
  );
}
