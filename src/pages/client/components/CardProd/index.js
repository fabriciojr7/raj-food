import { useContext } from 'react';
import {
  Container, AreaPhoto, AreaInformation, AddCart,
} from './styles';

import { CartContext } from '../../../../context/cart';
import { AuthContext } from '../../../../context/auth';

function CardProd({ product, restauranteIsOpened }) {
  const { addProductCart } = useContext(CartContext);
  const { clientAuthenticated } = useContext(AuthContext);

  const imgPadrao = 'https://images-ext-2.discordapp.net/external/vTUrHTFHZKTde-oPSsPaHkjCP_a0DRL2HhXa0LUOWk4/https/res.cloudinary.com/rajfood/image/upload/v1653433375/TKQZGZF_nmrmha.jpg';
  return (
    <Container>
      <AreaInformation>
        <h1>{product.nome}</h1>
        <p>
          {product.descricao}
        </p>
        <span>
          R$
          {' '}
          {product.preco}
          ,00
        </span>

        {
          restauranteIsOpened && clientAuthenticated ? (
            <AddCart onClick={() => addProductCart(product)}>
              Adicionar no carrinho
            </AddCart>
          ) : null
}

      </AreaInformation>

      <AreaPhoto>
        {product.image === null
          ? <img src={imgPadrao} alt="Imagem Produtos" />
          : <img src={product.image} alt="Imagem Produto" />}
      </AreaPhoto>
    </Container>
  );
}

export default CardProd;
