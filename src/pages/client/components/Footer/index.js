import { Container } from './styles';

export default function Footer() {
  return (
    <Container>
      <p>
        Desenvolvido por
        {' '}
        <small>Fabrício</small>
        {' '}
        e
        {' '}
        <small>Felipe</small>
      </p>
      <p>Copyright © 2022</p>
    </Container>
  );
}
