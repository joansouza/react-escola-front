import React, { useEffect, useState } from 'react';
import { get } from 'lodash';
import { Link } from 'react-router-dom';
import {
  FaUserCircle,
  FaEdit,
  FaWindowClose,
  FaExclamation,
} from 'react-icons/fa';
import { toast } from 'react-toastify';
import { Container } from '../../styles/GlobalStyles';
import * as S from './styles';
import axios from '../../services/axios';
import Loading from '../../components/Loading';

export default function Alunos() {
  const [alunos, setAlunos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    async function getData() {
      setIsLoading(true);
      const response = await axios.get('/alunos');
      // eslint-disable-next-line no-console
      setAlunos(response.data);
      setIsLoading(false);
    }
    getData();
  }, []);

  const handleDeleteAsk = (e) => {
    e.preventDefault();
    const exclamation = e.currentTarget.nextSibling;
    exclamation.setAttribute('display', 'block');
    e.currentTarget.remove();
  };
  const handleDelete = async (e, id, index) => {
    e.persist();
    try {
      setIsLoading(true);
      await axios.delete(`/alunos/${id}`);
      const newAlunos = [...alunos];
      newAlunos.splice(index, 1);
      setAlunos(newAlunos);
      setIsLoading(false);
    } catch (err) {
      const status = get(err, 'response.status', 0);
      if (status === 401) {
        toast.error('você prescisa estar logado');
      } else {
        toast.error('ouve um erro ao excluir o aluno');
      }
      setIsLoading(false);
    }
  };
  return (
    <Container>
      <Loading isLoading={isLoading} />
      <h1>Alunos</h1>
      <S.NewAluno to='/aluno/'>Novo Aluno</S.NewAluno>
      <S.AlunoContainer>
        {alunos.map((aluno, index) => (
          <div key={String(aluno.id)}>
            <S.ProfilePicture>
              {get(aluno, 'Images[0].url', false) ? (
                <img src={aluno.Images[0].url} alt='' />
              ) : (
                <FaUserCircle size={35} />
              )}
            </S.ProfilePicture>
            <span> {aluno.nome}</span>
            <span> {aluno.email}</span>
            <S.LinkStyle>
              <Link to={`/aluno/${aluno.id}/edit`}>
                <FaEdit size={16} />
              </Link>
              <Link onClick={handleDeleteAsk} to={`/aluno/${aluno.id}/delete`}>
                <FaWindowClose size={16} />
              </Link>
              <FaExclamation
                size={16}
                display='none'
                color='red'
                cursor='pointer'
                onClick={(e) => handleDelete(e, aluno.id, index)}
              />
            </S.LinkStyle>
          </div>
        ))}
      </S.AlunoContainer>
    </Container>
  );
}
