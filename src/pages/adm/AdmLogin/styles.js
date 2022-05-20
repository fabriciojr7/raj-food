import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  height: 100vh;
  background: ${({ theme }) => theme.colors.background};
`;

export const Content = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  max-width: 500px;
  margin: auto;
  padding-top: 30px;

  h2{
    font-size: 24px;
    color: ${({ theme }) => theme.colors.red.main};
  }
  img{
    width: 400px;
  }

  @media only screen and (max-width: 480px){
    img{
      width: 300px;
    }
  }
`;

export const Form = styled.form`
  margin-top: 16px;
  width: 100%;
  padding: 0 12px;
`;

export const ButtonContainer = styled.div`
  margin: 24px 0;
  button{
    width: 100%;
    }
`;
