import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { AuthContext } from '../../../context/auth';

import {
  Form, ButtonContainer,
} from './styles';

import Input from '../../../components/Input';
import FormGrouping from '../../../components/FormGrouping';
import Button from '../../../components/Button';
import SignUpOrIn from '../components/SignUpOrIn';

const schema = yup.object({
  email: yup.string().email().required('O telefone é obrigatório.'),
  senha: yup.string(),
}).required();

export default function Login() {
  const { loginClient } = useContext(AuthContext);

  const {
    register, handleSubmit, formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    loginClient(data.email, data.senha);
  };

  return (
    <>
      <h2>Login</h2>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormGrouping error={errors.email?.message}>
          <Input
            error={errors.email?.message}
            placeholder="E-mail"
            {...register('email')}
          />
        </FormGrouping>

        <FormGrouping error={errors.senha?.message}>
          <Input
            error={errors.senha?.message}
            type="password"
            placeholder="Senha"
            {...register('senha')}
          />
        </FormGrouping>
        <ButtonContainer>
          <Button type="submit">Acessar</Button>
        </ButtonContainer>
        <SignUpOrIn text="Não tem conta? Inscreva-se!" link="/login/signUp" />
      </Form>
    </>
  );
}
