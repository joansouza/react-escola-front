import React from 'react';
import { isEmail } from 'validator';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';

import { Container } from '../../styles/GlobalStyles';
import * as actions from '../../store/modules/auth/actions';
import * as S from './styles';

export default function Login() {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const dispatch = useDispatch();
  const handleSubmit = async (e) => {
    e.preventDefault();
    let formErrors = false;
    if (!isEmail(email)) {
      formErrors = true;
      toast.error('Email-invalido');
    }
    if (password.length < 3 || password.length > 50) {
      formErrors = true;
      toast.error('senha inválida');
    }
    console.log(formErrors);
    dispatch(actions.loginRequest({ email, password }));
  };

  return (
    <Container>
      <h1>Faça seu login</h1>
      <S.Form onSubmit={handleSubmit}>
        <input
          type='text'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder='digite seu E-mail'
        />

        <input
          type='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder='digite seu E-mail'
        />

        <button type='submit'>Entrar</button>
      </S.Form>
    </Container>
  );
}
