import HeaderForm from '../components/HeaderForm';
import ProductsForm from '../components/ProductsForm';
import { Container } from './styles';

export default function NewProducts() {
  return (
    <Container>
      <HeaderForm title="Cadastro" to="/adm/products" />
      <ProductsForm
        buttonLabel="Cadastrar produto"
      />
    </Container>
  );
}
