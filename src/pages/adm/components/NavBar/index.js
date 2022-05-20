import { Link } from 'react-router-dom';

import {
  MdViewQuilt, MdFastfood, MdRestaurantMenu, MdSupervisedUserCircle,
} from 'react-icons/md';

import { Container, Logo, Menu } from './styles';

import logo from '../../../../assets/images/rajfood.png';

export default function NavBar(/* { closeMenu } */) {
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
      </Menu>
    </Container>
  );
}
