import { Link } from 'react-router-dom';
import { Container } from './styles';

export default function SignUpOrIn({ text, link }) {
  return (
    <Container>
      <Link to={link}>
        {text}
      </Link>
    </Container>
  );
}
