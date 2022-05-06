import styled from 'styled-components';

export const Container = styled.div`
  height: 300px;
  background: ${({ theme }) => theme.colors.primary.lighter};
  border-radius: 10px;

  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 48px;
  cursor: pointer;

  img{
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  p{
    width: calc(100% - 60px);
    height: calc(100% - 60px);
    border-radius: 10px;
    border: 1px dashed ${({ theme }) => theme.colors.primary.light};

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: #333;

    svg{
      color: ${({ theme }) => theme.colors.primary.light};
      width: 24px;
      height: 24px;
      margin-bottom: 8px;
    }
  }
`;
