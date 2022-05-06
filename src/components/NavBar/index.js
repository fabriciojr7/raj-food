import { Link } from 'react-router-dom';

import {
  MdViewQuilt, MdFastfood, MdRestaurantMenu,
} from 'react-icons/md';

import { Container, Logo, Menu } from './styles';

import logo from '../../assets/images/rajfood.png';

export default function NavBar(/* { closeMenu } */) {
  return (
    <Container>
      <Logo>
        <img src={logo} alt="" />
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
        <Link to="/adm/typeProducts">
          <li>
            <MdRestaurantMenu className="ico" />
            Tipos de Produtos
          </li>
        </Link>
      </Menu>
    </Container>
  );
}
