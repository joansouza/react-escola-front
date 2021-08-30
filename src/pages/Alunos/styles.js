import styled from 'styled-components';

export const AlunoContainer = styled.div`
  margin-top: 20px;

  div {
    padding: 5px 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  div + div {
    border-top: 1px solid#eeee;
  }
`;

export const ProfilePicture = styled.div`
  img {
    width: 36px;
    height: 36px;
    border-radius: 50%;
  }
`;
