import HeaderForm from '../../../components/HeaderForm';
import TypeProductsForm from '../../../components/TypeProductsForm';

import { Container } from './styles';

export default function NewTypeProducts() {
  return (
    <Container>
      <HeaderForm title="Cadastro" to="/adm/typeProducts" />
      <TypeProductsForm
        buttonLabel="Cadastrar tipo"
      />
    </Container>
  );
}
