import React from 'react';
import { isEmail } from 'validator';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { get } from 'lodash';

import Loading from '../../components/Loading';
import { Container } from '../../styles/GlobalStyles';
import * as actions from '../../store/modules/auth/actions';
import * as S from './styles';

export default function Login(props) {
  const dispatch = useDispatch();
  const prevPath = get(props, 'location.state.prevPath', '/');
  const isLoading = useSelector((state) => state.auth.isLoading);

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

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
    dispatch(actions.loginRequest({ email, password, prevPath }));
  };

  return (
    <Container>
      <Loading isLoading={isLoading} />
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
