import { useParams } from 'react-router-dom';
import UsersForm from '../components/UsersForm';
import HeaderForm from '../components/HeaderForm';
import { Container } from './styles';

export default function EditUser() {
  const { id } = useParams();
  return (
    <Container>
      <HeaderForm title="Edição" to="/adm/users" />
      <UsersForm
        id={id || null}
        buttonLabel="Salvar alterações"
      />
    </Container>
  );
}
