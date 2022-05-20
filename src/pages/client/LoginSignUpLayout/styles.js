import styled from 'styled-components';
import bg from '../../../assets/images/bgLogin.png';

export const Container = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
  background: ${({ theme }) => theme.colors.background};
`;

export const BgLogin = styled.div`
  flex: 2;
  background-image: url(${bg});
  background-size: cover;
  background-position: center;
  position: relative;

  @media only screen and (max-width: 680px){
    display: none;
  }
`;

export const Content = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  flex: 1;
  max-width: 600px;
  min-height: 100vh;
  overflow-y: auto;
  padding: 30px 0;

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
  padding: 0 30px;
`;

export const ButtonContainer = styled.div`
  margin: 24px 0;
  button{
    width: 100%;
    }
`;

export const OrSignUp = styled.div`
  width: 100%;
  text-align: center;
  border-top: 1px solid #CCC;
  padding-top: 16px;
  a{
    color: ${({ theme }) => theme.colors.primary.dark};
    transition: .2s ease-in color;
    &:hover{
      color: ${({ theme }) => theme.colors.red.main};
    }
  }
`;
