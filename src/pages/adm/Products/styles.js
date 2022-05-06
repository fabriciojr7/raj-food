import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Content = styled.div`
    margin-top: 32px;
    width: 100%;
`;

export const Search = styled.div`
  margin-top: 40px;
  width: 100%;
  max-width: 600px;
`;

export const Table = styled.table`
  margin-top: 24px;
  width: 100%;

  tr, td{
    padding: 10px;
  }
  thead th{
    background: ${({ theme }) => theme.colors.primary.main};
    color: #FFF;
    padding: 10px;
    font-size: 18px;
    text-align: left;
    font-weight: 600;
  }
  tbody tr{
    border: none;
    display: table-row;
  }
  tbody tr td{
    display: table-cell;
    font-weight: 400;
    text-align: left;
    position: relative;
  }
  tbody tr:nth-child(2n){
    background: #ccc;
  }
  tbody tr td:nth-child(1){width:30%}
  tbody tr td:nth-child(2){width:50%}
  tbody tr td:nth-child(3){width:10%}
  tbody tr td:nth-child(4){
    width:10%;
    text-align: center;
  }

  .edit{
    cursor: pointer;
    color: ${({ theme }) => theme.colors.primary.main};
    margin-right: 8px;
    font-size: 20px;
    &:hover{
      color: ${({ theme }) => theme.colors.primary.light};
    }
    &:active{
      color: ${({ theme }) => theme.colors.primary.dark};
    }
  }
  .remove{
    cursor: pointer;
    color: ${({ theme }) => theme.colors.red.main};
    margin-left: 8px;
    font-size: 20px;
    &:hover{
      color: ${({ theme }) => theme.colors.red.light};
    }
    &:active{
      color: ${({ theme }) => theme.colors.red.dark};
    }
  }

  @media all and (max-width: 800px){
    border: none;
    tbody tr td{
      display: block;
      text-align: right;
    }
    tbody tr td:before{
      content: attr(data-title);
      position: absolute;
      left: 0;
      display: block;
      font-weight: 600;
    }
    .desc:before{
      top: -10px;
    }

    thead{
      display: none;
    }

    tbody tr{
      margin-bottom: 10px;
      display: block;
      border: 1px solid #dad6eb;
    }
    tbody tr td:nth-child(1){width:100%}
    tbody tr td:nth-child(2){
      width:100%;
    }
    tbody tr td:nth-child(3){width:100%}
    tbody tr td:nth-child(4){
      width: 100%;
      display: flex;
      justify-content: center;
      font-size: 18px;
    }



    .edit{
      margin-right: 16px;
    }
    .remove{
      margin-left: 16px;
    }
  }
`;
