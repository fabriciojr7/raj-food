import { useParams } from 'react-router-dom';
import TypeProductsForm from '../../../components/TypeProductsForm';
import HeaderForm from '../../../components/HeaderForm';
import { Container } from './styles';

export default function EditTypeProducts() {
  const { id } = useParams();
  return (
    <Container>
      <HeaderForm title="Edição" to="/adm/typeProducts" />
      <TypeProductsForm
        id={id || null}
        buttonLabel="Salvar alterações"
      />
    </Container>
  );
}
