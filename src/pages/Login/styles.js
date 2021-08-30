import styled from 'styled-components';
import * as colors from '../../config/colors';

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
    height: 30px;
    font-size: 15px;
    margin-top: 10px;
    padding: 3px;
    border-radius: 4px;
    &:focus {
      border: 1px solid ${colors.primaryColor};
    }
  }
  button {
    margin-top: 20px;
  }
  button:hover {
    filter: brightness(85%);
  }
`;
