import { Link } from 'react-router-dom';
import { Container } from './styles';

export default function Footer() {
  return (
    <Container>
      <p>
        <Link to="/adm/login">
          Desenvolvido por
          {' '}
          <small>Fabrício</small>
          {' '}
          e
          {' '}
          <small>Felipe</small>
        </Link>


      </p>
      <p>Copyright © 2022</p>
    </Container>
  );
}
