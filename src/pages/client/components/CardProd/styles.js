import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 544px;
  height: 220px;
  box-shadow: 0px 1px 5px #333;
  margin: 8px;
  transition: .2s ease-in transform;
  padding: 8px;

  cursor: pointer;
  &:hover{
    transform: scale(1.02);
  }

  @media only screen and (max-width: 600px){
    width: 100%;
    max-width: 100%;
    margin: 0;
    padding: 0 8px;
    box-shadow: none;
    flex-direction: column-reverse;
    height: 320px;

    &:nth-child(2n+1){
      background: ${({ theme }) => theme.colors.gray[100]};
    }
  }

  @media only screen and (min-width: 601px) and (max-width: 780px){
    flex-direction: column-reverse;
    width: 45%;
    height: 350px;

  }

  @media only screen and (min-width: 781px) and (max-width: 1120px){
    width: 48%;
  }
`;

export const AreaPhoto = styled.div`
  flex: 1;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 12px;
  >img{
    width: 160px;
    height: 140px;
  }
`;

export const AreaInformation = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  text-align: center;
  margin-top: 16px;
  span{
    font-size: 16px;
    color: ${({ theme }) => theme.colors.gray[900]};
    font-weight: 600;
    margin-bottom: 8px
  }
  h1{
    color: ${({ theme }) => theme.colors.gray[900]};
    font-size : 18px;
    margin-bottom: 8px
  }
  p{
    font-size: 14px;
    color: #616161;
    padding-bottom: 10px;
  }
`;
