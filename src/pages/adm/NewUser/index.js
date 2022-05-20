import HeaderForm from '../components/HeaderForm';
import UsersForm from '../components/UsersForm';
import { Container } from './styles';

export default function NewUSer() {
  return (
    <Container>
      <HeaderForm title="Cadastro" to="/adm/users" />
      <UsersForm
        buttonLabel="Cadastrar usuário"
      />
    </Container>
  );
}
