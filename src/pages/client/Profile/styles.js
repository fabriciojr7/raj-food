import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Content = styled.div`
  margin: 32px 0;
  width: 100%;
`;

export const Line = styled.div`
  width: 100%;
  height: 2px;
  max-width: 600px;
  margin: auto;
  background: ${({ theme }) => theme.colors.gray[100]};
`;

export const ListAdresses = styled.div`
  max-width: 500px;
  margin: 0 auto;
`;

export const TitleAdresses = styled.div`
  margin: 24px 0;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;

  h2{
    font-size: 20px;
    color: ${({ theme }) => theme.colors.gray[900]};
    font-weight: 500;
  }
  a{
    color: ${({ theme }) => theme.colors.primary.main};
    padding: 8px;
    transition: color 0.2s ease-in;
    &:hover{
      color: ${({ theme }) => theme.colors.red.light};
    }
    &:active{
      color: ${({ theme }) => theme.colors.red.dark};
    }
  }
`;

export const CartAddress = styled.li`
  width: 100%;
  height: 40px;
  padding: 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: ${({ theme }) => theme.colors.gray[100]};
  margin-bottom: 8px;

  h4{
    font-size: 18px;
    font-weight: 500;
  }
`


export const  Actions = styled.div`
  display: flex;
  align-items: center;
`

export const  Removed = styled.div`
  margin-left: 6px;
  color: ${({ theme }) => theme.colors.red.main};
  cursor: pointer;
`

export const  Edit = styled.div`
  margin-right: 6px;
  cursor: pointer;
  a{
    color: ${({ theme }) => theme.colors.primary.main};
  }  
`