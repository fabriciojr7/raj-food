import SignUpOrIn from '../components/SignUpOrIn';
import ClientForm from '../components/ClientForm';

import { Container } from './styles';

export default function SignUp() {
  return (
    <Container>
      <h2>Cadastro</h2>
      <ClientForm
        buttonLabel="Confirmar cadastro"
      />

      <SignUpOrIn text="Já possuo uma conta." link="/login" />
    </Container>
  );
}
