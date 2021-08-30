import React, { useEffect, useState } from 'react';
import { get } from 'lodash';
import { Link } from 'react-router-dom';
import { FaUserCircle, FaEdit, FaWindowClose } from 'react-icons/fa';
import { Container } from '../../styles/GlobalStyles';
import * as S from './styles';
import axios from '../../services/axios';

export default function Alunos() {
  const [alunos, setAlunos] = useState([]);
  useEffect(() => {
    async function getData() {
      const response = await axios.get('/alunos');
      // eslint-disable-next-line no-console
      setAlunos(response.data);
    }
    getData();
  }, []);
  return (
    <Container>
      <h1>Alunos</h1>
      <S.AlunoContainer>
        {alunos.map((aluno) => (
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
            <Link to={`/aluno/${aluno.id}/edit`}>
              <FaEdit size={16} />
            </Link>
            <Link to={`/aluno/${aluno.id}/delete`}>
              <FaWindowClose size={16} />
            </Link>
          </div>
        ))}
      </S.AlunoContainer>
    </Container>
  );
}
