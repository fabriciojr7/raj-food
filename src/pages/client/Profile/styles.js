import styled from 'styled-components';

export const SearchProduct = styled.div`
  margin: 24px;
  text-align: center;
  input{
    width: 100%;
    max-width: 700px;
    background: ${({ theme }) => theme.colors.gray[100]};

    &::placeholder{
        color: ${({ theme }) => theme.colors.gray[900]};
    }
  }
`;

export const AreaProd = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  width: 100%;

  @media only screen and (max-width: 500px){
    margin: 0;
  }
`;

export const Category = styled.div`
  padding-bottom: 20px;
  width: 100%;
  max-width: 1120px;

  h2{
    font-size: 32px;
    color: ${({ theme }) => theme.colors.gray[900]};
    text-transform: uppercase;
    margin-left: 8px;
  }
`;

export const Box = styled.div`
    margin-bottom: 24px;
`;

export const Text = styled.span`
  font-size: 16px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.gray[500]};
  margin-left: 8px;
  margin-bottom: 20px;
`;
