import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;

  background: ${({ theme }) => theme.colors.primary.main};
`;

export const Content = styled.div`
  max-width: 500px;
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  p{
    font-size: 20px;
    color: ${({ theme }) => theme.colors.red.main};
  }

  img{
    width: 400px;
  }
`;
