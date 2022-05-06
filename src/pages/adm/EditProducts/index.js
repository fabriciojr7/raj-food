import { useParams } from 'react-router-dom';
import ProductsForm from '../../../components/ProductsForm';
import HeaderForm from '../../../components/HeaderForm';
import { Container } from './styles';

export default function EditProducts() {
  const { id } = useParams();
  return (
    <Container>
      <HeaderForm title="Edição" to="/adm/products" />
      <ProductsForm
        id={id || null}
        buttonLabel="Salvar alterações"
      />
    </Container>
  );
}
