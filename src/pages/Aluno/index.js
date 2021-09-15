/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { get } from 'lodash';
import PropTypes from 'prop-types';
import { isEmail, isInt, isFloat } from 'validator';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { FaUserCircle, FaEdit } from 'react-icons/fa';
import { Link } from 'react-router-dom';

import history from '../../services/history';
import axios from '../../services/axios';
import * as actions from '../../store/modules/auth/actions';
import Loading from '../../components/Loading/index';
import * as S from './styles';
import { Container } from '../../styles/GlobalStyles';

export default function Aluno({ match }) {
  const id = get(match, 'params.id', 0);
  const dispatch = useDispatch();

  const [nome, setNome] = useState('');
  const [sobrenome, setSobrenome] = useState('');
  const [idade, setIdade] = useState('');
  const [email, setEmail] = useState('');
  const [peso, setPeso] = useState('');
  const [altura, setAltura] = useState('');
  const [image, setImage] = useState('');
  const [isLoading, setIsloading] = useState(false);

  useEffect(() => {
    if (!id) return;
    async function getData() {
      try {
        setIsloading(true);
        const { data } = await axios.get(`/alunos/${id}`);
        const foto = get(data, 'Images[0].url', '');
        setNome(data.nome);
        setSobrenome(data.sobrenome);
        setEmail(data.email);
        setAltura(data.altura);
        setPeso(data.peso);
        setIdade(data.idade);
        setImage(foto);
        setIsloading(false);
      } catch (err) {
        setIsloading(false);
        const status = get(err, 'response.status', 0);
        const errors = get(err, 'response.data.erros', []);

        if (status === 400) {
          errors.map((error) => toast.error(error));
        }
        history.push('/');
      }
    }
    getData();
  }, [id]);

  const handleSubimt = async (e) => {
    e.preventDefault();
    let formErros = false;
    if (nome.length < 3 || nome.length > 255) {
      toast.error('nome precisa ter entre 3 e 255 characteres');
      formErros = true;
    }
    if (sobrenome.length < 3 || sobrenome.length > 255) {
      toast.error('sobrenome precisa ter entre 3 e 255 characteres');
      formErros = true;
    }
    if (!isEmail(email)) {
      toast.error('nome precisa ter entre 3 e 255 characteres');
      formErros = true;
    }
    if (!isInt(String(idade))) {
      toast.error('idade inválida');
      formErros = true;
    }
    if (!isFloat(String(peso))) {
      toast.error('peso inválido');
      formErros = true;
    }
    if (!isFloat(String(altura))) {
      toast.error('altura inválida');
      formErros = true;
    }
    if (formErros) return;
    try {
      setIsloading(true);
      if (id) {
        await axios.put(`/alunos/${id}`, {
          nome,
          sobrenome,
          email,
          idade,
          altura,
          peso,
        });
        toast.success('aluno atualizado!');
      } else {
        const { data } = await axios.post('/alunos/', {
          nome,
          sobrenome,
          email,
          idade,
          altura,
          peso,
        });
        toast.success('aluno cadastrado!');
        history.push(`/aluno/${data.id}/edit`);
      }
      setIsloading(false);
    } catch (err) {
      const status = get(err, 'response.status', 0);
      const errors = get(err, 'status.data.errors', []);
      const data = get(err, 'status.data', {});
      if (errors.length > 0) {
        errors.map((error) => toast.error(error));
      } else {
        toast.error('erro desconhecido');
      }

      if (status === 401) dispatch(actions.loginFailure());
    }
  };

  return (
    <Container>
      <Loading isLoading={isLoading} />
      <S.Title>{id ? 'Editar Aluno' : 'Adicionar Aluno'}</S.Title>

      {id && (
        <S.ProfilePicture>
          {image ? <img src={image} alt={nome} /> : <FaUserCircle size={180} />}
          <Link to={`/images/${id}`}>
            <FaEdit size={24} />
          </Link>
        </S.ProfilePicture>
      )}
      <S.Form onSubmit={handleSubimt}>
        <input
          type='text'
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          placeholder='Nome'
        />

        <input
          type='text'
          value={sobrenome}
          onChange={(e) => setSobrenome(e.target.value)}
          placeholder='Sobrenome'
        />

        <input
          type='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder='Email'
        />

        <input
          type='number'
          value={idade}
          onChange={(e) => setIdade(e.target.value)}
          placeholder='Idade'
        />
        <input
          type='text'
          value={peso}
          onChange={(e) => setPeso(e.target.value)}
          placeholder='Peso'
        />
        <input
          type='text'
          value={altura}
          onChange={(e) => setAltura(e.target.value)}
          placeholder='Altura'
        />
        <button type='submit'>Enviar</button>
      </S.Form>
    </Container>
  );
}
Aluno.propTypes = {
  match: PropTypes.shape({}).isRequired,
};
