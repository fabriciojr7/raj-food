import { Link } from 'react-router-dom';
import { FaSignInAlt /* FaSignOutAlt */ } from 'react-icons/fa';
import {
  HeaderContainer, Container, Logo, UserOperations,
  UserIdentification, BotaoOperation,
} from './styles';

import rajFood from '../../../../assets/images/rajfood.png';
// import MenuItems from '../MenuItems';

export default function Header() {
  return (
    <HeaderContainer>
      <Container>
        <Logo>
          <Link to="/adm/login">
            <img src={rajFood} alt="Logo Raj-Food" />
          </Link>
        </Logo>

        <UserOperations>
          <UserIdentification>
            {/* <MenuItems /> */}
            {/* Acesse sua conta */}
          </UserIdentification>

          <BotaoOperation>
            <Link to="/login">
              <FaSignInAlt size={32} />
            </Link>
          </BotaoOperation>
        </UserOperations>
      </Container>
    </HeaderContainer>
  );
}
