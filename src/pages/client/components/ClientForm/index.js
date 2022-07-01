import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import {
  Form, ButtonContainer,
} from './styles';

import ClientService from '../../../../services/ClientService';
import Input from '../../../../components/Input';
import FormGrouping from '../../../../components/FormGrouping';
import Button from '../../../../components/Button';
import Loader from '../../../../components/Loader';
import { errorAlert, sucessAlert } from '../../../../utils/showAlert';

const schema = yup.object({
  nome: yup.string().required('O nome é obrigatório.').min(3, 'O nome requer pelo menos 3 caracteres.'),
  sobrenome: yup.string().required('O sobrenome é obrigatório.'),
  fone: yup.string().required('O telefone é obrigatório.'),
  email: yup.string().email().required('O telefone é obrigatório.'),
  senha: yup.string(),
  confirmaSenha: yup.string().oneOf([yup.ref('senha')], 'As senhas devem ser iguais.'),
}).required();

export default function ClientForm({ id }) {
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const {
    register, handleSubmit, formState: { errors }, setValue,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const loadClient = async () => {
    try {
      setIsLoading(true);
      const { data } = await ClientService.getClient(id);
      // setHasError(false);
      setValue('nome', data.nome);
      setValue('sobrenome', data.sobrenome);
      setValue('fone', data.fone);
      setValue('email', data.email);
    } catch {
      // setHasError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      loadClient();
    }
  }, []);

  const onSubmit = async (data) => {
    try {
      const dataCli = {
        nome: data.nome,
        sobrenome: data.sobrenome,
        fone: data.fone,
        email: data.email,
        password: data.senha,
      };

      if (id) {
        await ClientService.updateClient(id, dataCli);
        sucessAlert({ msg: 'Cadastro alterado com sucesso' });
      } else {
        await ClientService.createClient(dataCli);
        sucessAlert({ msg: 'Cadastro efetuado com sucesso' });
        navigate('/login');
      }
    } catch (err) {
      errorAlert({ msg: `Erro inesperado ${err}` });
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
          placeholder="Telefone"
          {...register('fone')}
        />
      </FormGrouping>

      <FormGrouping error={errors.email?.message}>
        <Input
          error={errors.email?.message}
          placeholder="E-mail"
          {...register('email')}
        />
      </FormGrouping>

      <FormGrouping>
        <Input
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
        <Button type="submit">Salvar dados</Button>
      </ButtonContainer>

    </Form>
  );
}
