import { useContext } from 'react';
import { FaShoppingCart, FaPlus, FaMinus } from 'react-icons/fa';

import { useNavigate } from 'react-router-dom';

import Button from '../../../components/Button';
import { CartContext } from '../../../context/cart';

import {
  Container, TitleCart, TotaisCart, TypeTotal, FooterCart,
  HeaderItems, Item, ItemProd, Photo, PrecoItem, Quantidade,
  Decrease, Increase, SubTotal,
} from './styles';

import pizza from '../../../assets/images/frango-com-cream-cheese.jpg';

export default function MyCart() {
  const { productsCart, addProductCart, removeProductCart } = useContext(CartContext);

  const navigate = useNavigate();

  const totalPedido = () => {
    const inicial = 0;
    const total = productsCart.reduce((soma, valor) => soma + valor.subtotal, inicial);
    return total;
  };

  return (
    <Container>
      <TitleCart>
        <FaShoppingCart />
        <h1>Carrinho de compras</h1>
      </TitleCart>

      <ul>
        <HeaderItems>
          <span className="item">Item</span>
          <span className="un">Preco un.</span>
          <span className="qtd">Quantidade</span>
          <span className="sub">SubTotal item</span>
        </HeaderItems>

        {
          productsCart.map((product) => (
            <Item key={product.id}>
              <ItemProd>
                <Photo>
                  <img src={pizza} alt="Imagem produto" />
                </Photo>
                {product.nome}
              </ItemProd>

              <PrecoItem>
                R$
                {' '}
                {product.preco}
              </PrecoItem>

              <Quantidade>
                <Decrease>
                  <FaMinus onClick={() => removeProductCart(product)} />
                </Decrease>
                {product.qtd}
                <Increase>
                  <FaPlus onClick={() => addProductCart(product)} />
                </Increase>
              </Quantidade>

              <SubTotal>
                R$
                {' '}
                {product.subtotal}
              </SubTotal>
            </Item>
          ))
        }

      </ul>

      <TotaisCart>
        {/* <TypeTotal>
          <h4>Subtotal</h4>
          <span>R$ 35,00</span>
        </TypeTotal> */}

        {/* <TypeTotal>
          <h4>Taxa de entrega</h4>
          <span>R$ 5,00</span>
        </TypeTotal> */}

        <TypeTotal>
          <h4>Total</h4>
          <span>
            R$
            {' '}
            {totalPedido()}
          </span>
        </TypeTotal>
      </TotaisCart>

      <FooterCart>
        <Button onClick={() => navigate('/')}>Adicionar mais itens</Button>
        <Button onClick={() => navigate('/finalizar')}>Finalizar pedido</Button>
      </FooterCart>
    </Container>
  );
}
