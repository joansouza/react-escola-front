import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { isEmail } from 'validator';
import { get } from 'lodash';

import axios from '../../services/axios';
import history from '../../services/history';
import { Container } from '../../styles/GlobalStyles';
import * as S from './styles';

export default function Register() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

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
    if (password.length < 6 || password.length > 50) {
      formErrors = true;
      toast.error('senha deve estar entre 6 e 50 caracteres');
    }

    if (formErrors) return;

    try {
      const response = await axios.post('/users', {
        nome,
        email,
        password,
      });
      toast.success('Cadastro Realizado');
      history.push('/login');
      console.log(response.data);
    } catch (error) {
      const errors = get(error, 'response.data.errors', []);
      errors.map((erro) => toast.error(erro));
    }
  }

  return (
    <Container>
      <h1>Crie sua Conta</h1>
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
