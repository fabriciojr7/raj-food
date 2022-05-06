import { Outlet } from 'react-router-dom';

import {
  Container, Menu, Content, ContentContainer,
} from './styles';

import NavBar from '../../../components/NavBar';

export default function LayoutAdm() {
  return (
    <Container>
      <Menu>
        <NavBar />
      </Menu>

      <Content>
        <ContentContainer>
          <Outlet />
        </ContentContainer>
      </Content>
    </Container>
  );
}
