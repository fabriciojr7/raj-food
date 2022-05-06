import styled from 'styled-components';

export const Container = styled.div`
    & + &{
        margin-top: 16px;
    }
    p{
      font-size: 14px;
      font-weight: 500;
    }
    small{
        color: #F00;
        font-size: 12px;
        display: block;
        margin-top: 8px;
    }
`;
