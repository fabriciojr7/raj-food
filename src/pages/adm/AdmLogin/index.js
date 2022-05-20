import { useNavigate } from 'react-router-dom';
import {
  Container, Content, Form, ButtonContainer,
} from './styles';
import logo from '../../../assets/images/rajfood.png';
import Input from '../../../components/Input';
import FormGrouping from '../../../components/FormGrouping';
import Button from '../../../components/Button';

export default function AdmLogin() {
  const navigate = useNavigate();
  return (
    <Container>
      <Content>
        <img src={logo} alt="Logo Raj-food" />
        <h2>Login</h2>
        <Form>
          <FormGrouping>
            <Input placeholder="Nome ou email" />
          </FormGrouping>
          <FormGrouping>
            <Input type="password" placeholder="Senha" />
          </FormGrouping>
          <ButtonContainer>
            <Button onClick={() => { navigate('/adm'); }}>Acessar</Button>
          </ButtonContainer>
        </Form>
      </Content>
    </Container>
  );
}
