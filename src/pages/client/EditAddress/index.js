import { useParams } from 'react-router-dom';
import EnderecoForm from '../components/EnderecoForm';
import { Container, Content } from './styles';

export default function EditAddress() {
  const { id } = useParams();
  return (
    <Container>
      <Content>
        <EnderecoForm
          id={id || null}
          buttonLabel="Salvar alterações"
        />
      </Content>
    </Container>
  );
}
