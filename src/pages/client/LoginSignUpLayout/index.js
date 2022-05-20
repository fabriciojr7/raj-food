import { Outlet } from 'react-router-dom';
import {
  Container, BgLogin, Content,
} from './styles';

import logo from '../../../assets/images/rajfood.png';

export default function LoginSignUpLayout() {
  return (
    <Container>
      <BgLogin />
      <Content>
        <img src={logo} alt="Logo Raj-food" />
        <Outlet />
      </Content>
    </Container>
  );
}
