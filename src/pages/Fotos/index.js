/* eslint-disable no-unused-vars */
import React from 'react';
import { get } from 'lodash';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';

import * as actions from '../../store/modules/auth/actions';
import { Container } from '../../styles/GlobalStyles';
import Loading from '../../components/Loading/index';
import * as S from './styles';
import axios from '../../services/axios';
import history from '../../services/history';

export default function Fotos({ match }) {
  const id = get(match, 'params.id', '');
  const [isLoading, setIsloading] = React.useState(false);
  const [foto, setFoto] = React.useState('');
  const dispatch = useDispatch();

  React.useEffect(() => {
    try {
      setIsloading(true);
      const getData = async () => {
        const { data } = await axios.get(`/alunos/${id}`);
        setFoto(get(data, 'Images[0].url', ''));
      };
      getData();
      setIsloading(false);
    } catch (error) {
      setIsloading(false);
      toast.error('erro ao carregar imagem');
      history.push('/');
    }
  }, [id]);

  const handleChange = async (e) => {
    e.preventDefault();

    const image = e.target.files[0];
    const fotoUrl = URL.createObjectURL(image);
    setFoto(fotoUrl);

    const formData = new FormData();
    formData.append('aluno_id', id);
    formData.append('image', image);

    try {
      setIsloading(true);
      await axios.post('/images/', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      toast.success('foto enviada com sucesso ');
      setIsloading(false);
    } catch (err) {
      setIsloading(false);
      const status = get(err, 'response.status', 0);
      if (status === 401) dispatch(actions.loginFailure());
    }
  };
  return (
    <Container>
      <Loading isLoading={isLoading} />
      <S.Title>Fotos</S.Title>
      <S.Form>
        <label htmlFor='foto'>
          {foto ? <img src={foto} alt='Foto' /> : 'selecionar'}
          <input type='file' id='foto' onChange={handleChange} />
        </label>
      </S.Form>
    </Container>
  );
}

Fotos.propTypes = {
  match: PropTypes.shape({}).isRequired,
};
