import { useContext } from 'react';
import { Link } from 'react-router-dom';

import { FaSignInAlt, FaSignOutAlt, FaShoppingCart } from 'react-icons/fa';
import { AuthContext } from '../../../../context/auth';
import { CartContext } from '../../../../context/cart';

import {
  HeaderContainer, Container, Logo, UserOperations,
  UserIdentification, BotaoOperation, BotaoCart,
} from './styles';

import rajFood from '../../../../assets/images/rajfood.png';
import MenuItems from '../MenuItems';

export default function Header() {
  const { clientAuthenticated, logoutClient } = useContext(AuthContext);
  const { productsCart } = useContext(CartContext);
  const handleLogout = () => {
    logoutClient();
  };

  return (
    <HeaderContainer>
      <Container>
        <Logo>
          <Link to="/">
            <img src={rajFood} alt="Logo Raj-Food" />
          </Link>
        </Logo>

        {
          clientAuthenticated ? (
            <UserOperations>
              <UserIdentification>
                <MenuItems />
              </UserIdentification>
              <BotaoOperation>
                <abbr title="Sair da conta">
                  <FaSignOutAlt onClick={handleLogout} size={32} />
                </abbr>
              </BotaoOperation>

              <BotaoCart>
                {
                  productsCart.length > 0 ? `(${productsCart.length})` : null
                }
                <Link to="/cart">
                  <abbr title="Meu carrinho">
                    <FaShoppingCart size={32} />
                  </abbr>
                </Link>

              </BotaoCart>
            </UserOperations>
          ) : (
            <UserOperations>
              <BotaoOperation>
                <Link to="/login">
                  <abbr title="Fazer Login">
                    <FaSignInAlt size={32} />
                  </abbr>
                </Link>
              </BotaoOperation>
            </UserOperations>
          )
        }

      </Container>
    </HeaderContainer>
  );
}
