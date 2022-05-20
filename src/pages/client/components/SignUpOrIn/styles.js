import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  text-align: center;
  border-top: 1px solid #CCC;
  padding-top: 16px;
  a{
    color: ${({ theme }) => theme.colors.primary.dark};
    transition: .2s ease-in color;
    &:hover{
      color: ${({ theme }) => theme.colors.red.main};
    }
  }
`;
