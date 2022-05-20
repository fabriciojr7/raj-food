import styled from 'styled-components';

export const Container = styled.div`
  height: 100%;
  background: ${({ theme }) => theme.colors.primary.main};
`;

export const Logo = styled.div`
  width: 100%;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: auto;
  border-bottom: 2px solid ${({ theme }) => theme.colors.primary.dark};
  a{
    margin: 32px;
    img {
      width: 100%;
    }
  }
`;

export const Menu = styled.ul`
  list-style: none;
  >a li{
    display: flex;
    align-items: center;
    color: #FFF;
    padding: 10px 0;
    font-size: 20px;

    .ico{
      margin: 0 16px 0 8px;
      font-size: 24px;
    }
  }
  >a li:hover{
    background: ${({ theme }) => theme.colors.primary.light};
  }
`;
