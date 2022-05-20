import styled from 'styled-components';

export const Menu = styled.nav`
  button{
    border: none;
    outline: none;
    background: transparent;
    font-weight: bold;
    color: ${({ theme }) => theme.colors.red.main};
    padding-bottom: 8px;
  }

  ul{
    display: none;
    list-style: none;
    background: #FFF;
    border: 2px solid #bdbdbd;
    padding-top: 10px;
    padding-bottom: 10px;
    border-radius: 8px;
    position: absolute;

    li{
      display: flex;
      align-items: center;
      color: #222;
      padding: 4px 10px;
      cursor: pointer;

      &:hover{
        color: #ea1d2c;
      }
       & .ico{
        margin-right: 10px;
       }
    }
  }

  &:hover{
    ul{
      display: block;
    }
  }

  &.active ul{
    display: block;
  }

  &.active button{
    font-weight: bold;
    color: #ea1d2c;
  }
`;
