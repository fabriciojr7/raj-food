import { useNavigate } from 'react-router-dom';
import {
  Form, ButtonContainer,
} from './styles';

import Input from '../../../components/Input';
import FormGrouping from '../../../components/FormGrouping';
import Button from '../../../components/Button';
import SignUpOrIn from '../components/SignUpOrIn';

export default function Login() {
  const navigate = useNavigate();
  return (
    <>
      <h2>Login</h2>
      <Form>
        <FormGrouping>
          <Input placeholder="Nome ou email" />
        </FormGrouping>
        <FormGrouping>
          <Input type="password" placeholder="Senha" />
        </FormGrouping>
        <ButtonContainer>
          <Button onClick={() => { navigate('/'); }}>Acessar</Button>
        </ButtonContainer>
        <SignUpOrIn text="Não tem conta? Inscreva-se!" link="/login/signUp" />
      </Form>
    </>
  );
}
