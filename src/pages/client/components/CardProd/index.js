import { Container, AreaPhoto, AreaInformation } from './styles';

// import imgLanche from '../../../../assets/images/xtudo.jpg';

function CardProd({
  func, nome, descricao, preco, imagem,
}) {
  return (
    <Container onClick={func}>
      <AreaInformation>
        <h1>{nome}</h1>
        <p>
          {descricao}
        </p>
        <span>
          R$
          {' '}
          {preco}
          ,00
        </span>
      </AreaInformation>

      <AreaPhoto>
        <img src={imagem} alt="Imagem Produto" />
      </AreaPhoto>
    </Container>
  );
}

export default CardProd;
