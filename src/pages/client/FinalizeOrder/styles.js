import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  max-width: 800px;
  margin: auto;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Content = styled.div`
  margin: 32px 0;
  width: 100%;
`;

export const Title = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 24px;
  padding-bottom: 8px;
  border-bottom: 2px solid ${({ theme }) => theme.colors.gray[200]};

  h1{
    font-size: 32px;
    color: ${({ theme }) => theme.colors.primary.main};
    font-weight: bold;
  }
`;

export const AddressInfo = styled.div`
  width: 100%;
  margin-bottom: 20px;
`;

export const ResumoOrder = styled.div`
  padding: 16px;
  background: ${({ theme }) => theme.colors.gray[100]};
`;

export const TitleSection = styled.div`
  font-size: 20px;
  color: ${({ theme }) => theme.colors.primary.main};
  margin-bottom: 8px;
`;

export const HeaderResume = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 2px solid ${({ theme }) => theme.colors.gray[200]};
`;

export const NomeItem = styled.div`
  flex: 3;
`;

export const QtdItem = styled.div`
  flex: 1;
  text-align: center;
`;

export const SubTotItem = styled.div`
  flex: 1;
  text-align: center;
`;

export const ItemPedido = styled.li`
  margin-top: 8px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const FooterFinalizacao = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 20px 0;

  button{
    width: 200px;
    &:last-child{
      background: #00c853;
    }
  }
`;

export const Finalizacao = styled.div`
  width: 100%;
  max-width: 400px;
  margin-top: 20px;
`;

export const TotalPedido = styled.div`
  margin-top: 16px;
  font-size: 16px;
  color: ${({ theme }) => theme.colors.primary.main};
  span{
    color: ${({ theme }) => theme.colors.red.main};
  }
`;
