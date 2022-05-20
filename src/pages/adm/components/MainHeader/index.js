import {
  Container,
} from './styles';

export default function MainHeader({ title }) {
  return (
    <Container>
      <h1>{title}</h1>
    </Container>
  );
}
