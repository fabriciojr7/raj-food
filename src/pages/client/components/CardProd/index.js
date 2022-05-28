import { Container, AreaPhoto, AreaInformation } from './styles';

function CardProd({
  func, nome, descricao, preco, imagem,
}) {
  const imgPadrao = 'https://images-ext-2.discordapp.net/external/vTUrHTFHZKTde-oPSsPaHkjCP_a0DRL2HhXa0LUOWk4/https/res.cloudinary.com/rajfood/image/upload/v1653433375/TKQZGZF_nmrmha.jpg';
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
        {imagem === null
          ? <img src={imgPadrao} alt="Imagem Produto" />
          : <img src={imagem} alt="Imagem Produto" />}

      </AreaPhoto>
    </Container>
  );
}

export default CardProd;
