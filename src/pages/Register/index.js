import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { isEmail } from 'validator';
import { useSelector, useDispatch } from 'react-redux';

import Loading from '../../components/Loading';
import { Container } from '../../styles/GlobalStyles';
import * as actions from '../../store/modules/auth/actions';
import * as S from './styles';

export default function Register() {
  const id = useSelector((state) => state.auth.user.id);
  const nomeStored = useSelector((state) => state.auth.user.nome);
  const emailStored = useSelector((state) => state.auth.user.email);
  const isLoading = useSelector((state) => state.auth.isLoading);
  const dispatch = useDispatch();

  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  React.useEffect(() => {
    if (!id) return;
    setNome(nomeStored);
    setEmail(emailStored);
  }, [emailStored, id, nomeStored]);

  async function handleSubmit(e) {
    let formErrors = false;
    e.preventDefault();
    if (nome.length < 4 || nome.length > 255) {
      formErrors = true;
      toast.error('o nome deve ter entre 4 e 255 caracteres');
    }
    if (!isEmail(email)) {
      formErrors = true;
      toast.error('Email-invalido');
    }
    if (!id && (password.length < 6 || password.length > 50)) {
      formErrors = true;
      toast.error('senha deve estar entre 6 e 50 caracteres');
    }

    // eslint-disable-next-line no-useless-return
    if (formErrors) return;
    dispatch(actions.registerRequest({ nome, email, password, id }));
  }

  return (
    <Container>
      <Loading isLoading={isLoading} />
      <h1>{id ? 'Editar Dados' : 'Crie sua Conta'}</h1>
      <S.Form onSubmit={handleSubmit}>
        <label htmlFor='nome'>
          Nome:{' '}
          <input
            type='text'
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            placeholder='Digite seu nome'
          />
        </label>
        <label htmlFor='email'>
          E-mail:{' '}
          <input
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder='Digite seu E-mail'
          />
        </label>
        <label htmlFor='password'>
          Senha:
          <input
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder='Digite sua Senha'
          />
        </label>
        <button type='submit'>Criar minha Conta</button>
      </S.Form>
    </Container>
  );
}
