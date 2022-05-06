import styled from 'styled-components';

export const Header = styled.header`
    display: flex;
    align-items: center;
    justify-content: ${({ hasError }) => ((hasError) ? 'flex-end' : 'space-between')};
    border-bottom: 2px solid ${({ theme }) => theme.colors.gray[100]};
    padding-bottom: 16px;
    strong{
        color: #222;
        font-size: 22px;
    }
    a{
        color: ${({ theme }) => theme.colors.primary.main};
        text-decoration: none;
        font-weight: bold;
        border: 2px solid ${({ theme }) => theme.colors.primary.main};
        padding: 8px 16px;
        border-radius: 4px;
        transition: all 0.2s ease-in;

        &:hover{
            background: ${({ theme }) => theme.colors.primary.main};
            color: #FFF;
        }
        .ico{
            display: none;
        }
    }
`;
