import { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { Form, ButtonContainer } from './styles';

import UserService from '../../../../services/UserService';
// import formatPhone from '../../../../utils/formatPhone';
import FormGrouping from '../../../../components/FormGrouping';
import Input from '../../../../components/Input';
import Button from '../../../../components/Button';
import Loader from '../../../../components/Loader';
import { sucessAlert, errorAlert } from '../../../../utils/showAlert';

const schema = yup.object({
  nome: yup.string().required('O nome é obrigatório.').min(3, 'O nome requer pelo menos 3 caracteres.'),
  sobrenome: yup.string().required('O sobrenome é obrigatório.'),
  fone: yup.string().required('O telefone é obrigatório.'),
  email: yup.string().email().required('O telefone é obrigatório.'),
  senha: yup.string(),
  confirmaSenha: yup.string().oneOf([yup.ref('senha')], 'As senhas devem ser iguais.'),
}).required();

export default function UsersForm({ id, buttonLabel }) {
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const {
    register, handleSubmit, formState: { errors }, setValue,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const getDataProduct = useCallback(async () => {
    try {
      setIsLoading(true);
      const { data } = await UserService.getUser(id);
      setValue('nome', data.nome);
      setValue('sobrenome', data.sobrenome);
      setValue('fone', data.fone);
      setValue('email', data.email);
    } catch (err) {
      // console.log(err);
    } finally {
      setIsLoading(false);
    }
  }, [id]);

  useEffect(() => {
    if (id) {
      getDataProduct();
    }
  }, []);

  const onSubmit = async (data) => {
    try {
      let dataUser = {
        nome: data.nome,
        sobrenome: data.sobrenome,
        fone: data.fone,
        email: data.email,
      };
      if (data.senha !== '') {
        dataUser = {
          ...dataUser,
          password: data.senha,
        };
      }
      if (id) {
        const { message } = await UserService.updateUser(id, dataUser);
        sucessAlert({ msg: message });
      } else {
        const { message } = await UserService.createUser(dataUser);
        sucessAlert({ msg: message });
      }
      navigate('/adm/users');
    } catch (err) {
      errorAlert({ msg: err });
    }
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      {isLoading && <Loader />}

      <FormGrouping error={errors.nome?.message}>
        <Input
          error={errors.nome?.message}
          placeholder="Nome *"
          {...register('nome')}
        />
      </FormGrouping>

      <FormGrouping error={errors.sobrenome?.message}>
        <Input
          error={errors.sobrenome?.message}
          placeholder="Sobrenome"
          {...register('sobrenome')}
        />
      </FormGrouping>

      <FormGrouping error={errors.fone?.message}>
        <Input
          error={errors.fone?.message}
          placeholder="Telefone *"
          {...register('fone')}
        />
      </FormGrouping>

      <FormGrouping error={errors.email?.message}>
        <Input
          error={errors.email?.message}
          placeholder="E-mail *"
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

      <FormGrouping error={errors.confirmaSenha?.message}>
        <Input
          error={errors.confirmaSenha?.message}
          type="password"
          placeholder="Confirmar senha"
          {...register('confirmaSenha')}
        />
      </FormGrouping>

      <ButtonContainer>
        <Button type="submit">{buttonLabel}</Button>
      </ButtonContainer>
    </Form>
  );
}
