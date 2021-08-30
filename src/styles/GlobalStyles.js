import stlyled, { createGlobalStyle } from 'styled-components';
import * as S from '../config/colors';
import 'react-toastify/dist/ReactToastify.css';

export default createGlobalStyle`
*{
  margin: 0;
padding: 0;
outline: none;
box-sizing: border-box;
}

body{
  font-family:sans-serif;
  background: ${S.primaryDarkColor};
}

html , body , #root{
  height: 100%;
}
button{
  cursor: pointer;
  background-color: ${S.primaryColor};
  border: none;
  color: #D6F9FF;
  padding: 10px 20px;
  border-radius: 4px;
}
button:hover{
  filter: brightness(85%);
}

a{
  text-decoration: none;
  color: ${S.primaryColor};
}

ul{
  list-style: none;
}
body .Toastify .Toastify__toast-container .Toastify__toast--success{
background:${S.successColor};
color: #D6F9FF;
}
body .Toastify .Toastify__toast-container .Toastify__toast--error{
background:${S.errorColor};
color: #D6F9FF;
}
body .Toastify .Toastify__toast-container .Toastify__toast--warning{
background:${S.warningColor};
color: #D6F9FF;
}
`;

export const Container = stlyled.section`
max-width:480px;
background:#fff;
margin: 30px auto;
padding:30px;
box-shadow:0 0 10px rgba(0,0,0,0.1);
`;
