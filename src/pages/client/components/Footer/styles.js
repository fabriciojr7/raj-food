import styled from 'styled-components';

export const Container = styled.footer`
    display: flex;
    flex-direction: column;
    text-align: center;
    height: 100%;
    background: ${({ theme }) => theme.colors.primary.dark};
    p{
        font-size: 14px;
        color: ${({ theme }) => theme.colors.gray[200]};
    }
    small{
        font-size: 16px;
        color: ${({ theme }) => theme.colors.red.main};
    }

`;
