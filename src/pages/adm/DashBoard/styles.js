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
