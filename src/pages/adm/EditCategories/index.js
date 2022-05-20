import { useParams } from 'react-router-dom';
import CategoriesForm from '../components/CategoriesForm';
import HeaderForm from '../components/HeaderForm';
import { Container } from './styles';

export default function EditCategories() {
  const { id } = useParams();
  return (
    <Container>
      <HeaderForm title="Edição" to="/adm/categories" />
      <CategoriesForm
        id={id || null}
        buttonLabel="Salvar alterações"
      />
    </Container>
  );
}
