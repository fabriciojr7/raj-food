import EnderecoForm from '../components/EnderecoForm';
import {
  Container, Content,
} from './styles';

export default function Address() {
  return (
    <Container>
      <Content>
        <EnderecoForm
          buttonLabel="Cadastrar endereço"
        />
      </Content>
    </Container>
  );
}
