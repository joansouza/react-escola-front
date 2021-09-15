import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const AlunoContainer = styled.div`
  margin-top: 20px;

  div {
    padding: 5px 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  div + div {
    border-top: 1px solid#eee;
  }
  link {
  }
`;

export const ProfilePicture = styled.div`
  img {
    width: 36px;
    height: 36px;
    border-radius: 50%;
  }
`;

export const LinkStyle = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
`;

export const NewAluno = styled(Link)`
  display: block;
  padding: 20px 0 10px 0;
`;
