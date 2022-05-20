import HeaderForm from '../components/HeaderForm';
import CategoriesForm from '../components/CategoriesForm';

import { Container } from './styles';

export default function NewCategories() {
  return (
    <Container>
      <HeaderForm title="Cadastro" to="/adm/categories" />
      <CategoriesForm
        buttonLabel="Cadastrar tipo"
      />
    </Container>
  );
}
