import styled from 'styled-components';

export const HeaderContainer = styled.header`
    position: fixed;
    z-index: 10;
    left: 0;
    top: 0;
    width: 100%;
    min-height: 80px;
    background: #FFF;
    border-bottom: 1px solid ${({ theme }) => theme.colors.red.main};
    display: flex;
    justify-content: center;
    background: ${({ theme }) => theme.colors.primary.dark};

    @media only screen and (max-width: 500px){
      position: absolute;
    }
`;

export const Container = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;

    width: 100%;
    max-width: 800px;
    margin: auto;

    @media only screen and (max-width: 420px){
        flex-direction: column;
    }
`;

export const Logo = styled.div`
    display: flex;
    align-items: center;

    >a img{
        width: 200px;
    }
`;

export const UserOperations = styled.div`
    display: flex;
    align-items: center;
`;

export const UserIdentification = styled.div`
    margin-right: 16px;
`;

export const BotaoOperation = styled.div`
  cursor: pointer;
  svg{
    color: ${({ theme }) => theme.colors.red.main};
  }
  &:hover{
    svg{
      color: ${({ theme }) => theme.colors.red.light};
    }
  }
  &:active{
    svg{
      color: ${({ theme }) => theme.colors.red.dark};
    }
  }
`;

export const BotaoCart = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  margin-left: 16px;
  color: ${({ theme }) => theme.colors.red.main};
  svg{
    color: ${({ theme }) => theme.colors.red.main};
  }
  &:hover{
    svg{
      color: ${({ theme }) => theme.colors.red.light};
    }
  }
  &:active{
    svg{
      color: ${({ theme }) => theme.colors.red.dark};
    }
  }
`;
