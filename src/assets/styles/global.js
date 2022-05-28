import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
    *{
      margin: 0;
      padding: 0;
      outline: 0;
      box-sizing: border-box;
      font-family: 'Poppins', sans-serif;
    }
    body{
      font-size: 16px;
      overflow-x: hidden;
      background: ${({ theme }) => theme.colors.background};
    }
    a{
       text-decoration: none;
    }
    button{
      cursor: pointer;
    }

    li{
      list-style: none;
    }

`;
