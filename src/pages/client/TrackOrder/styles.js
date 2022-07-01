import styled from 'styled-components';

export const Container = styled.div`
  margin: 20px 0;
  width: 100%;
`;

export const Title = styled.div`
  width: 100%;
  height: 10%;
  font-size: 28px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 16px;
`;

export const Content = styled.div`
  height: 85%;
  display: flex;
  align-items: center;
  flex-direction: column;
  color: #FFF;
`;

export const StatusBar = styled.ul`
  display: flex;
  >li{
    list-style: none;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  >li .top-bar{
    margin: 0 80px;
  }
  >li .text{
    font-size: 14px;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.primary.main};
  }
`;

export const Progress = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.primary.main};
  color: #222;
  margin-bottom: 14px;
  display: grid;
  place-items: center;
  position: relative;
  cursor: pointer;

  &::after{
    content: '';
    position: absolute;
    width: 110px;
    height: 5px;
    background: ${({ theme }) => theme.colors.primary.light};
    right: 50px;
    z-index: -1;
  }
  &.one::after{
    width: 0;
    height: 0;
  }
  >span{
    color: ${({ theme }) => theme.colors.red.main};
    font-size: 24px;
    font-weight: bold;
  }
  .uil {
    display: none;
  }

  &.active{
    background: #00c853;
    >span{
      display: none;
    }
    .uil {
      font-size: 20px;
      color: #FFF;
      display: block;
    }
  }
  &.active::after{
    background: #00c853;
  }
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
