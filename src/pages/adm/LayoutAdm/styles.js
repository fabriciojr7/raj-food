import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;

  @media all and (max-width: 800px){
    flex-direction: column;
  }
`;

export const Menu = styled.nav`
  width: 320px;
  min-height: 100vh;
  border-right: 2px solid ${({ theme }) => theme.colors.red.main};
  @media all and (max-width: 800px){
    display: none;
  }
`;

export const Content = styled.main`
  width     : 100%;
  min-height: 100vh;
  overflow-y: auto;
  padding: 0 16px;
  background: ${({ theme }) => theme.colors.background};
`;

export const ContentContainer = styled.div`
  width: 100%;
  max-width: 1000px;
  margin: 0 auto;
`;
