import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  max-width: 1000px;
  margin: 20px auto;
`;

export const TitleCart = styled.div`
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.colors.primary.main};
  padding-bottom: 8px;
  border-bottom: 2px solid  ${({ theme }) => theme.colors.gray[200]};;

  h1{
    font-size: 20px;
  }
  svg{
    font-size: 24px;
    margin-right: 16px;
    color: ${({ theme }) => theme.colors.red.main};
  }
`;

export const TotaisCart = styled.div`
  display: flex;
  align-items: flex-end;
  flex-direction: column;
  margin-top: 20px;
`;

export const TypeTotal = styled.div`
  display: flex;
  width: 300px;
  justify-content: space-between;

  h4{
    margin-right: 16px;
    color: ${({ theme }) => theme.colors.primary.light};
    font-weight: 500;
    font-size: 18px;
  }
  span{
    color: ${({ theme }) => theme.colors.red.light};
    font-weight: 600;
    font-size: 20px;
  }
`;

export const FooterCart = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 20px 0;

  button{
    width: 100%;
    max-width: 250px;
    &:last-child{
      background: #00c853;
    }
  }
`;

export const HeaderItems = styled.div`
  margin-top: 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  .item{
    flex: 3;
  }
  .un{
    flex: 1;
    text-align: center;
  }
  .qtd{
    flex: 1;
    text-align: center;
  }
  .sub{
    flex: 1;
    text-align: center;
  }
`;

export const Item = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 20px 0;
  background: ${({ theme }) => theme.colors.gray[100]};
  padding: 8px;
  border-radius: 4px;
`;

export const ItemProd = styled.div`
  flex: 3;
  display: flex;
  align-items: center;

  img{
    width: inherit;
    height: inherit;
  }
`;

export const Photo = styled.div`
  width: 100px;
  height: 100px;
  margin-right: 8px;
  background: green;
`;

export const PrecoItem = styled.div`
  flex: 1;
  text-align: center;
`;

export const Quantidade = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Decrease = styled.div`
  margin-right: 16px;
  cursor: pointer;
`;

export const Increase = styled.div`
  margin-left: 16px;
  cursor: pointer;
`;

export const SubTotal = styled.div`
  flex: 1;
  text-align: center;
`;
