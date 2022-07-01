import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const HeaderRestaurante = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-around;
  color: #222;
  margin-top: 8px;
  span{
    font-size: 32px;
    font-weight: bold;
    color: ${({ theme }) => theme.colors.red.main};
  }
  padding-bottom: 20px;
  border-bottom: 2px solid ${({ theme }) => theme.colors.gray[200]};
`;

export const ToggleStatus = styled.div`
  width: 50px;
  height: 50px;
  background: ${({ theme, status }) => (status ? theme.colors.red.main : '#00c853')};
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  cursor: pointer;
  svg{
    font-size: 40px;
    color: #FFF;
  }
`;

export const ListPedidos = styled.ul`
  width: 100%;
  max-width: 500px;

`;

export const Pedido = styled.li`
  width: 100%;
  margin: 8px 0;
`;

export const CabPedido = styled.div`
  padding: 16px;
  background: ${({ theme }) => theme.colors.gray[200]};
`;

export const CabLine = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  span{
    font-weight: bold;
    color: ${({ theme }) => theme.colors.primary.main};
  }
`;

export const Content = styled.div`
  width: 100%;
  padding: 0 16px;
  background: ${({ theme }) => theme.colors.gray[100]};
`;

export const TitleArea = styled.div`
  text-align: center;
  font-size: 16px;
  padding: 8px 0;
  border-bottom: 2px solid ${({ theme }) => theme.colors.gray[200]};
`;

export const BodyEnd = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  padding-top: 8px;
  span{
    width: 100%;
    display: flex;
    justify-content: space-between;
  }
`;

export const BodyProd = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  padding: 8px 0;

  li{
    width: 100%;

    display: flex;
    align-items: center;
    justify-content: space-between;

    &.header{
      color: ${({ theme }) => theme.colors.primary.main};
      margin-bottom: 8px;
    }
  }
`;

export const FooterPedido = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px 0;
  button{
    margin: 0 4px;
    width: 180px;
  }
  background: ${({ theme }) => theme.colors.gray[200]};
`;
