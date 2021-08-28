import React from 'react';
import { Container } from '../../styles/GlobalStyles';
import { WarnMessage } from './styles';

export default function Page404() {
  return (
    <Container>
      <WarnMessage>
        <h1>Error 404</h1>
        <p>Page Not Found !</p>
      </WarnMessage>
    </Container>
  );
}
