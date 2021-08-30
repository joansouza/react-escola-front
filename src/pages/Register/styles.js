import styled from 'styled-components';
import * as color from '../../config/colors';

export const Title = styled.div``;
export const Form = styled.form`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  label {
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;
  }
  input {
    height: 35px;
    font-size: 18px;
    border: 1px solid #ddd;
    border-radius: 5px;
    margin-top: 5px;
    &:focus {
      border: 1px solid ${color.primaryColor};
    }
  }
`;
