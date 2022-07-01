import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    margin: 20px;
`;

export const ListArea = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

export const Description = styled.div`
  text-align: center;
  margin-bottom: 16px;
  font-size: 20px;
  font-weight: bold;
`;

export const InfosPedido = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  padding-bottom: 8px;
  border-bottom: 2px solid #fff;
  margin-bottom: 16px;

  p{
    font-size: 18px;
    span{
      font-weight: bold;
      color: ${({ theme }) => theme.colors.primary.main};
    }
  }
`;

export const ItensOrder = styled.div`
  width: 100%;
  margin-bottom: 24px;

  ul li{
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 4px 0;
    p{
      ${({ theme }) => theme.colors.gray[500]};

      span{
        font-weight: bold;
        color: ${({ theme }) => theme.colors.primary.main};
      }
    }
  }

  .titleItens{
    text-align: center;
    font-size: 20px;
    margin-bottom: 8px;
  }
`;

export const CardPedido = styled.div`
  width: 100%;
  max-width: 800px;
  margin-bottom: 8px;
  padding: 16px 8px;
  color: ${({ theme }) => theme.colors.gray[900]};
  background: ${({ theme }) => theme.colors.gray[100]};
  z-index: -100;
`;
