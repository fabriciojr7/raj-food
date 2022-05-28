import styled from 'styled-components';

import bg from '../../../assets/images/bgHome.png';

export const BgHome = styled.div`
  margin-top: 20px;
  width: 100%;
  height: 200px;
  border-radius: 16px;

  background-image: url(${bg});
  background-size: cover;
  background-position: center;
  position: relative;
  z-index: 1;
  &::after{
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    width: 100%;
    background: #000;
    opacity: .8;
    z-index: -1;
  }

  @media (max-width: 600px){
    margin-top: 0;
  }
`;

export const Bg = styled.div`
  width: 100%;
  height: 100%;
  text-align: center;
  color: ${({ theme }) => theme.colors.red.main};
  font-size: 20px;
  font-weight: 600;

  @media (max-width: 600px){
    margin-top: 12px;
    font-size: 14px;
  }
`;

export const Status = styled.div`
  margin-top: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  color: ${({ theme, status }) => (status ? '#00c853' : theme.colors.red.main)};
  svg{
    font-size: 32px;
    margin-right: 8px;
  }
`;

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
