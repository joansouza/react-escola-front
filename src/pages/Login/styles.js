import styled from 'styled-components';

export const Title = styled.div`
  color: ${(props) => (props.isRed ? 'red' : 'blue')};
`;
