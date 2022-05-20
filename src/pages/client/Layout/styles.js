import styled from 'styled-components';

export const Container = styled.main`
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: 1120px;
    margin: auto;
    margin-top: 80px;
    min-height: calc((100vh - 80px) - 20px);

    @media only screen and (max-width: 420px){
        margin-top: 120px;
    }
`;
