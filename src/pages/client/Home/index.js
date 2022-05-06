import { Link } from 'react-router-dom';
import { Container, Content } from './styles';

import logo from '../../../assets/images/rajfood.png';

export default function Home() {
  return (
    <Container>
      <Content>
        <p>Novidades em breve!!!</p>
        <Link to="/adm/">
          <img src={logo} alt="" />
        </Link>

      </Content>

    </Container>
  );
}
