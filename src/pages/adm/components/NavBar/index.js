import { useContext } from 'react';
import { Link } from 'react-router-dom';

import { FaSignOutAlt } from 'react-icons/fa';
import {
  MdViewQuilt, MdFastfood, MdRestaurantMenu, MdSupervisedUserCircle, MdSettings,
} from 'react-icons/md';
import { AuthContext } from '../../../../context/auth';

import {
  Container, Logo, Menu, Logout,
} from './styles';

import logo from '../../../../assets/images/rajfood.png';

export default function NavBar() {
  const { logoutAdm } = useContext(AuthContext);

  const handleLogout = () => {
    logoutAdm();
  };

  return (
    <Container>
      <Logo>
        <Link to="/">
          <img src={logo} alt="" />
        </Link>
      </Logo>
      <Menu>
        <Link to="/adm/">
          <li>
            <MdViewQuilt className="ico" />
            Dashboard
          </li>
        </Link>
        <Link to="/adm/products">
          <li>
            <MdFastfood className="ico" />
            Produtos
          </li>
        </Link>
        <Link to="/adm/categories">
          <li>
            <MdRestaurantMenu className="ico" />
            Categorias
          </li>
        </Link>
        <Link to="/adm/users">
          <li>
            <MdSupervisedUserCircle className="ico" />
            Usuários
          </li>
        </Link>

        <Link to="/adm/settings">
          <li>
            <MdSettings className="ico" />
            Restaurante
          </li>
        </Link>
        <Logout onClick={handleLogout}>
          <FaSignOutAlt className="ico" />
          Sair
        </Logout>

      </Menu>
    </Container>
  );
}
